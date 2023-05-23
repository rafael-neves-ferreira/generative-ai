import axios from 'axios';
import Zodiac from '@/config/zodiac';
const api = axios.create({
    baseURL: 'http://localhost:3000', // Substitua com a URL da sua API
});

export async function fetchData(zodiac, initialPrompt) {
    try {

        const signs = zodiac ? zodiac.split(', ') : Zodiac
        console.log(signs);
        for (const sign of signs) {
            console.log(sign.name);
            var signName = sign.name ? sign.name : sign
            const prompt = initialPrompt.replace(zodiac ? zodiac : 'tous les Signes', signName)
            const response = await api.post('gateway/follow-up', {
                requestIdentifier: '646c88f0cda8fb580a4bc285',
                followUpPrompt: prompt,
            }); // Substitua com a rota correta da sua API

            localStorage.setItem(signName, JSON.stringify(response.data.message));
        }
    } catch (error) {
        const signs = zodiac ? zodiac.split(', ') : Zodiac
        console.log(signs);
        for (const sign of signs) {
            console.log(sign.name);
            var signName = sign.name ? sign.name : sign
            const prompt = initialPrompt.replace(zodiac ? zodiac : 'tous les Signes', signName)
            const response = await api.post('gateway/follow-up', {
                requestIdentifier: '646c88f0cda8fb580a4bc285',
                followUpPrompt: prompt,
            }); // Substitua com a rota correta da sua API

            localStorage.setItem(signName, JSON.stringify(response.data.message));
        }

        console.error('Error:', error);
        throw error;
    }
}