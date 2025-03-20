class API{
    constructor(){
        this.url = 'http://localhost:8080';
    }

    async request(endpoint, { method = 'GET', body = {}, headers = null } = null) {
        const config = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            body: body ? JSON.stringify(body) : null,
            credentials: 'include',
        };

        try {
            const response = await fetch(`${this.url}/api${endpoint}`, config);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return await response.json();
            
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    };

    get(endpoint, headers = null) {
        return this.request(endpoint, { method: 'GET', headers });
    };

    post(endpoint, body, headers = null) {
        return this.request(endpoint, { method: 'POST', body, headers });
    };

    put(endpoint, body, headers = null) {
        return this.request(endpoint, { method: 'PUT', body, headers });
    };

    delete(endpoint, headers = null) {
        return this.request(endpoint, { method: 'DELETE', headers });
    };

    patch(endpoint, body, headers = null) {
        return this.request(endpoint, { method: 'PATCH', body, headers });
    };
};

const api = new API();
export default api;
