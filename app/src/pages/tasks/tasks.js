import React, { useState } from "react";
import {
    Flex,
    Table,
    TableContainer,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Spinner,
    Badge,
    IconButton,
    Tooltip,
    Text,
    Divider,
    Box,
} from "@chakra-ui/react";
import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";

const TasksTable = ({ tasks }) => {

    const useTaskMutation = (method, endpoint) => {
        const queryClient = useQueryClient();
        const [loadingTask, setLoadingTask] = useState(null);

        const mutation = useMutation({
            mutationFn: async (task_id) => {
                setLoadingTask(task_id);
                const response = await api[method](endpoint + task_id);
                return response;
            },
            onSuccess: () => {
                queryClient.invalidateQueries(["tasks"]);
            },
            onSettled: () => {
                setLoadingTask(null);
            },
        });

        return { mutate: mutation.mutate, loadingTask };
    }

    const { mutate: finishTask, loadingTask: loadingFinishTask } = useTaskMutation("patch", "/task/finish/");
    const { mutate: deleteTask, loadingTask: loadingDeleteTask } = useTaskMutation("delete", "/task/");

    return (
        <TableContainer w="full" borderRadius={8} overflow="hidden" boxShadow="md" bg="gray.700">
            <Table variant="simple" color="gray.100">
                <Thead bg="gray.900">
                    <Tr>
                        <Th color="teal.300">Task</Th>
                        <Th color="teal.300">Status</Th>
                        <Th color="teal.300">Criado em</Th>
                        <Th color="teal.300">Atualizado em</Th>
                        <Th color="teal.300">Ações</Th>
                        <Th color="teal.300">Excluir</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {tasks.map((task) => (
                        <Tr key={task.id} _hover={{ bg: "gray.600" }}>
                            <Td>{task.title}</Td>
                            <Td>
                                {task.task_status ? (
                                    <Badge colorScheme="green">Concluído</Badge>
                                ) : (
                                    <Badge colorScheme="purple">Em aberto</Badge>
                                )}
                            </Td>
                            <Td>{task.created_at}</Td>
                            <Td>{task.updated_at}</Td>
                            <Td>
                                <Tooltip label="Finalizar tarefa">
                                    <IconButton
                                        onClick={() => finishTask(task.id)}
                                        disabled={task.task_status || loadingFinishTask === task.id}
                                        icon={loadingFinishTask === task.id ? <Spinner /> : <CheckIcon />}
                                        bg="teal.600"
                                        color="white"
                                        _hover={{ bg: "teal.500" }}
                                    />
                                </Tooltip>
                            </Td>
                            <Td>
                                <Tooltip label="Excluir tarefa">
                                    <IconButton 
                                        onClick={() => deleteTask(task.id)}
                                        icon={loadingDeleteTask === task.id ? <Spinner /> : <DeleteIcon />}
                                        bg="teal.600"
                                        color="white"
                                        _hover={{ bg: "teal.500" }}
                                    />
                                </Tooltip>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};

const Tasks = () => {
    const fetchTasks = async () => {
        try {
            const response = await api.get("/task");
            return response;
        } catch (error) {
            console.error(error);
        }
    };

    const { data, isLoading } = useQuery({
        queryKey: ["tasks"],
        queryFn: fetchTasks,
    });

    return (
        <Flex
            w={{ base: "100%", sm: "50%", md: "80%", lg: "80%", xl: "100%" }}
            h="100%"
            flexDir="column"
            alignItems="center"
            borderRadius={10}
            p={8}
            gap={6}
        >
            <Text fontSize="2xl" fontWeight="bold" color="teal.300">
                Lista de Tarefas
            </Text>
            <Divider color="teal.600" />
            {isLoading ? (
                <Spinner color="teal.300" size="xl" />
            ) : (
                <Box w="full">{data && <TasksTable tasks={data} />}</Box>
            )}
        </Flex>
    );
};

export default Tasks;