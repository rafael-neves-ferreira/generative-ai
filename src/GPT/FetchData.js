import axios from 'axios';
import getDaysDiff, { generateRandomId } from './Helpers';

const api = axios.create({
    baseURL: 'http://192.168.0.56:3000', // Substitua com a URL da sua API
});

export async function fetchData(zodiac, Generationlang, date, initialPrompt) {
    const formattedDays = getDaysDiff(date);

    const languages = Generationlang.split(', ');
    var success = false;
    var data = [];
    const datas = [];

    const randomId = generateRandomId();

    for (const day of formattedDays) {
        data[day] = [];
        for (const sign of zodiac) {
            data[day][sign.name] = [];
            var signName = sign.name;
            const string = zodiac.map(obj => obj.name).join(', ');
            const prompt = initialPrompt.replace(zodiac ? string : 'tous les Signes', `le signe ${signName}`);
            for (var lang of languages) {
                success = false;
                data[day][sign.name][lang.match(/\(([A-Z]+)\)$/)[1]] = [];
                const promptLang = prompt.replace(Generationlang, lang);
                console.log(lang, signName, promptLang);
                while (!success) {
                    try {
                        var response = await api.post('gateway/follow-up', {
                            requestIdentifier: '646ce847c97b49942c018288',
                            followUpPrompt: promptLang,
                        });

                        success = true;
                    } catch (error) {
                        console.error('An error occurred:', error);
                        success = false;
                    }
                }

                console.log(response.data.message);
                const regex = /R0\d+:(.*?)(?=R0\d+:|$)/gs;
                const matches = response?.data?.message?.matchAll(regex);

                for (const match of matches) {
                    const value = match[1].trim();

                    const noteMatch = value.match(/N\d{2}: ([\d/]+)/);
                    console.log(noteMatch);
                    const note = noteMatch ? noteMatch[1] : null;
                    const updatedRubric = value.replace(/N\d{2}: ([\d/]+)/, '');

                    data[day][sign.name][lang.match(/\(([A-Z]+)\)$/)[1]].push({ value: updatedRubric, note });
                }

                datas.push({
                    [day]: {
                        [sign.name]: { [lang.match(/\(([A-Z]+)\)$/)[1]]: { rubrics: data[day][sign.name][lang.match(/\(([A-Z]+)\)$/)[1]] } },
                    },
                });
            }
        }
    }

    const existingArray = JSON.parse(localStorage.getItem('horoscope-quotidien')) || [];
    if (existingArray.length > 0) {
        const newArray = { [randomId]: datas };
        existingArray.push(newArray);
        localStorage.setItem('horoscope-quotidien', JSON.stringify(existingArray));
    } else {
        localStorage.setItem('horoscope-quotidien', JSON.stringify([{ [randomId]: datas }]));
    }
}