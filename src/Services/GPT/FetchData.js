import axios from 'axios';
import store from '@/store/store';

import getDaysDiff, { generateRandomId } from './Helpers';
import { getSkyPlus } from '../APF';
import Skyprompt from './config/skyPlusPrompt';
import Zodiac from '@/config/zodiac';
import validLangs from '@/config/validLanguages';
import FetchByHorosType from './Helpers/FetchByHorosType';

const api = axios.create({
    baseURL: 'http://192.168.0.56:3000',
});

export async function fetchData(zodiacSign, Generationlang, date, initialPrompt, horoscope, dayTheme) {
    const slug = horoscope.name.toLowerCase().replace(/\s+/g, '-');
    const formattedDays = getDaysDiff(date);
    const languages = Generationlang ? Generationlang.split(', ') : validLangs;
    var data = [];
    const datas = [];
    const zodiac = zodiacSign ? zodiacSign : Zodiac
    const setLoadData = (payload) => {
        store.dispatch({ type: 'mySlice/setLoadData', payload });
    };

    const randomId = generateRandomId();

    for (const day of formattedDays) {
        const skyPlus = await getSkyPlus(day)
        var skyPlusData = Skyprompt.prompt.replace('[date]', day)
            .replace('[themeDuJour]', dayTheme ? dayTheme : 'Saint Valaintin')
            .replace('[skyPlusData]', skyPlus)

        data[day] = [];
        for (const sign of zodiac) {
            data[day][sign.name] = [];
            var signName = sign.name;

            const string = zodiac.map(obj => obj.name).join(', ');
            if (initialPrompt.includes("tous les Signes")) {
                var prompt = initialPrompt.replace('tous les Signes', `le signe ${signName}`);
            } else {
                var prompt = initialPrompt.replace(string, `le signe ${signName}`);
            }

            for (var lang of languages) {
                const langName = lang.prompt ? lang.prompt : lang

                const languageCode = langName.match(/\(([A-Z]+)\)$/)[1] // Extrat FR from string "Rediger en Francais (FR)"
                data[day][signName][languageCode] = [];
                const promptLang = prompt.replace(Generationlang ? Generationlang : 'Rédiger en français(FR), Rédiger en anglais(EN), Rédiger en espagnol(ES), Rédiger en allemand(DE)', langName);
                setLoadData({ signe: signName, lang: langName, date: day, horoscope: horoscope.name }); // To be Presented in the Load Page

                const maxAttempts = 6;
                let success = false;

                console.log(skyPlusData + promptLang);
                for (let attempt = 1; attempt <= maxAttempts; attempt++) {
                    try {
                        var response = await api.post('gateway/follow-up', {
                            requestIdentifier: '6478c33d6a244910de6f55b0',
                            followUpPrompt: skyPlusData + promptLang,
                        });

                        success = true;
                        break; // Sai do loop se a operação for bem-sucedida
                    } catch (error) {
                        console.error('An error occurred:', error);
                        success = false;
                    }
                }

                console.log(response.data.message);
                if (success) {
                    datas.push(FetchByHorosType(horoscope, response, day, signName, languageCode, data))
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