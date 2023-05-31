import axios from 'axios';
import store from '@/store/store';

import getDaysDiff, { generateRandomId } from './Helpers';
import { getSkyPlus } from '../APF';
import Skyprompt from './config/skyPlusPrompt';
import Zodiac from '@/config/zodiac';

const api = axios.create({
    baseURL: 'http://192.168.0.56:3000',
});

export async function fetchData(zodiacSign, Generationlang, date, initialPrompt, horoscope, dayTheme) {
    const slug = horoscope.toLowerCase().replace(/\s+/g, '-');
    const formattedDays = getDaysDiff(date);
    const languages = Generationlang.split(', ');
    var data = [];
    const datas = [];
    const zodiac = zodiacSign ? zodiacSign.split(', ') : Zodiac

    const setLoadData = (payload) => {
        store.dispatch({ type: 'mySlice/setLoadData', payload });
    };

    const randomId = generateRandomId();

    for (const day of formattedDays) {
        // const skyPlus = await getSkyPlus(day)
        // var skyPlusData = Skyprompt.prompt.replace('[date]', day)
        //     .replace('[themeDuJour]', dayTheme ? dayTheme : 'Saint Valentin')
        //     .replace('[skyPlusData]', skyPlus)

        data[day] = [];
        for (const sign of zodiac) {
            var signName = sign.name ? sign.name : sign;
            data[day][signName] = [];
            const string = zodiac.map(obj => obj.name).join(', ');
            const prompt = initialPrompt.replace(zodiac ? string : 'tous les Signes', `le signe ${signName}`);
            for (var lang of languages) {
                setLoadData({ signe: signName, lang: lang, date: day, horoscope }); // To be Presented in the Load Page
                const languageCode = lang.match(/\(([A-Z]+)\)$/)[1] // Extrat FR from string "Rediger en Francais (FR)"
                data[day][signName][languageCode] = [];
                const promptLang = prompt.replace(Generationlang, lang);
                console.log(Generationlang, lang, promptLang);

                const maxAttempts = 3;
                let success = false;

                for (let attempt = 1; attempt <= maxAttempts; attempt++) {
                    try {
                        var response = await api.post('gateway/follow-up', {
                            requestIdentifier: '6475b21685d9ac195fa8a59e',
                            followUpPrompt: promptLang,
                        });

                        success = true;
                        break;
                    } catch (error) {
                        console.error('An error occurred:', error);
                        success = false;
                    }
                }

                if (success) {
                    const regex = languageCode == 'EN' ? /R0\d+ (.*?)(?=R0\d+|$)/gs : /R0\d+:(.*?)(?=R0\d+:|$)/gs;

                    const matches = languageCode == 'EN' ? response?.data?.message?.replace('\n', '').matchAll(regex) : response?.data?.message?.matchAll(regex);

                    console.log(response?.data?.message);
                    for (const match of matches) {
                        const value = match[1].trim();

                        const noteMatch = value.match(/N\d{2}: ([\d/]+)/);
                        const note = noteMatch ? noteMatch[1] : null;
                        const rubric = value.replace(/N\d{2}: ([\d/]+)/, '');
                        const updatedRubric = languageCode == 'EN' ? rubric.split(":")[1].trim() : rubric

                        data[day][signName][languageCode].push({ value: updatedRubric, note });
                    }

                    datas.push({
                        [day]: {
                            [signName]: { [languageCode]: { rubrics: data[day][signName][languageCode] } },
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