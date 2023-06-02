import axios from 'axios';
import { parse, format } from 'date-fns';
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
});

export async function getSkyPlus(date) {
    const parsedDate = parse(date, 'dd/MM/yyyy', new Date());
    const formattedDate = format(parsedDate, 'yyyy-MM-dd');
    var skyPlus = ''

    const existingArray = JSON.parse(localStorage.getItem('skyPlus')) || [];
    if (existingArray?.some(item => Object.keys(item)[0] === formattedDate)) {
        skyPlus = Object.values(existingArray)[0][formattedDate]
    } else {
        var response = await api.get('/', {
            params: {
                birthDate: formattedDate,
                birthTime: '00:00',
                birthCityId: '2988507', // The default Birth City is Paris(FR)
                asked: 'skyPlus',
                textFormat: 1, // Get respose in text Format, because it's gonna be sended to GPT as String
            }
        });
        skyPlus = response.data.skyPlus[0]
        localStorage.setItem('skyPlus', JSON.stringify([{ [formattedDate]: skyPlus }]));
    }

    return skyPlus;
}