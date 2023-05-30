import axios from 'axios';
import store from '@/store/store';

import getDaysDiff, { generateRandomId } from './Helpers';
import { getSkyPlus } from '../APF';
import Skyprompt from './config/skyPlusPrompt';
import Zodiac from '@/config/zodiac';

const api = axios.create({
    baseURL: 'http://192.168.0.56:3000',
});

export async function fetchData(zodiacSign, Generationlang, date, initialPrompt, horoscope) {
    console.log(horoscope);
    const slug = horoscope.toLowerCase().replace(/\s+/g, '-');
    const formattedDays = getDaysDiff(date);
    const languages = Generationlang.split(', ');
    var data = [];
    const datas = [];
    const zodiac = zodiacSign ? zodiacSign : Zodiac

    const setLoadData = (payload) => {
        store.dispatch({ type: 'mySlice/setLoadData', payload });
    };
    console.log(languages, Generationlang);
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
                console.log(zodiac, day, lang);

                setLoadData({ signe: signName, lang: lang, date: day, horoscope }); // To be Presented in the Load Page
                const languageCode = lang.match(/\(([A-Z]+)\)$/)[1] // Extrat FR from string "Rediger en Francais (FR)"
                data[day][sign.name][languageCode] = [];
                const promptLang = prompt.replace(Generationlang, lang);
                console.log(lang, signName, promptLang);

                const maxAttempts = 3;
                let success = false;

                for (let attempt = 1; attempt <= maxAttempts; attempt++) {
                    try {
                        var response = await api.post('gateway/follow-up', {
                            requestIdentifier: '6475b21685d9ac195fa8a59e',
                            followUpPrompt: promptLang,
                        });

                        success = true;
                        break; // Sai do loop se a operação for bem-sucedida
                    } catch (error) {
                        console.error('An error occurred:', error);
                        success = false;
                    }
                }

                if (success) {
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
                } else {
                    setLoadData({ error: true }); // To be Presented in the Load Page
                    return null
                }
            }
        }
    }

    const existingArray = JSON.parse(localStorage.getItem(slug)) || [];
    if (existingArray.length > 0) {
        const newArray = { [randomId]: datas };
        existingArray.push(newArray);
        localStorage.setItem(slug, JSON.stringify(existingArray));
    } else {
        localStorage.setItem(slug, JSON.stringify([{ [randomId]: datas }]));
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