import axios from 'axios';
import store from '@/store/store';

import getDaysDiff, { generateRandomId } from './Helpers';
import { getSkyPlus } from '../APF';
import Skyprompt from './config/skyPlusPrompt';

const api = axios.create({
    baseURL: 'http://localhost:3000',
});

export async function fetchData(zodiac, Generationlang, date, initialPrompt) {
    const formattedDays = getDaysDiff(date);
    const languages = Generationlang.split(', ');
    var success = false;
    var data = [];
    const datas = [];

    const setLoadData = (payload) => {
        store.dispatch({ type: 'mySlice/setLoadData', payload });
    };

    const randomId = generateRandomId();

    for (const day of formattedDays) {
        // const skyPlus = getSkyPlus(day)
        // skyPlus.then(result => {
        //     SkyPlusPrompt(result, day, dayTheme)
        // })
        data[day] = [];
        for (const sign of zodiac) {
            data[day][sign.name] = [];
            var signName = sign.name;
            const string = zodiac.map(obj => obj.name).join(', ');
            const prompt = initialPrompt.replace(zodiac ? string : 'tous les Signes', `le signe ${signName}`);
            for (var lang of languages) {
                setLoadData({ signe: signName, lang: lang, date: day }); // To be Presented in the Load Page
                success = false;
                const languageCode = lang.match(/\(([A-Z]+)\)$/)[1] // Extrat FR from string "Rediger en Francais (FR)"
                data[day][sign.name][languageCode] = [];
                const promptLang = prompt.replace(Generationlang, lang);
                console.log(lang, signName, promptLang);
                while (!success) {
                    try {
                        var response = await api.post('gateway/follow-up', {
                            requestIdentifier: '6471d1748c34d91bb4dcf687',
                            followUpPrompt: promptLang,
                        });

                        success = true;
                    } catch (error) {
                        console.error('An error occurred:', error);
                        success = false;
                    }
                }

                const regex = languageCode == 'EN' ? /R0\d+ (.*?)(?=R0\d+|$)/gs : /R0\d+:(.*?)(?=R0\d+:|$)/gs;
                const matches = response?.data?.message?.matchAll(regex);

                for (const match of matches) {
                    const value = match[1].trim();

                    const noteMatch = value.match(/N\d{2}: ([\d/]+)/);
                    console.log(noteMatch);
                    const note = noteMatch ? noteMatch[1] : null;
                    const rubric = value.replace(/N\d{2}: ([\d/]+)/, '');
                    const updatedRubric = languageCode == 'EN' ? rubric.split(":")[1].trim() : rubric

                    data[day][sign.name][languageCode].push({ value: updatedRubric, note });
                }

                datas.push({
                    [day]: {
                        [sign.name]: { [languageCode]: { rubrics: data[day][sign.name][languageCode] } },
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

    return randomId
}


// export async function SkyPlusPrompt(skyPlusData, date, dayTheme) {
//     const prompt = Skyprompt.prompt.replace('[date]', date)
//         .replace('[themeDuJour]', dayTheme)
//         .replace('[skyPlusData]', skyPlusData)

//     // const response = await api.post(process.env.GPT_OPEN_IA_INTERCONNECTION_GATEWAY, {
//     //     requestIdentifier: process.env.GPT_OPEN_IA_INTERCONNECTION_IDENTIFIERZ,
//     //     followUpPrompt: prompt,
//     // });
// }