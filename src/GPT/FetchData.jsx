import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.0.29:3000', // Substitua com a URL da sua API
});

export async function fetchData() {
    try {
        const response = await api.post('gateway/init', {
            requestIdentifier: '64663e7667df3151fa23c74a',
            followUpPrompt: 'Quel est là fleur la plus rouge du monde',
        }); // Substitua com a rota correta da sua API
        console.log(response);
        return response;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}