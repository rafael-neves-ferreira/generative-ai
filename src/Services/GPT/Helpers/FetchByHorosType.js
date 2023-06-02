import React from 'react'

export default function FetchByHorosType(horo, response, day, signName, languageCode, data) {

    switch (horo.id) {
        case 1:
            const regex = languageCode === 'EN' ? /R(?:0\d+|10) (.*?)(?=R(?:0\d+|10)|$)/gs : /R(?:0\d+|10) (.*?)(?=R(?:0\d+|10)|$)/gs;
            const matches = languageCode === 'EN' ? response?.data?.message?.replace('\n', '').matchAll(regex) : response?.data?.message?.replace('\n', '').matchAll(regex);

            var compat = null
            for (const match of matches) {
                const value = match[1].trim();
                const noteMatch = value.match(/N\d{2,3}: ([\d/]+)/);
                const note = noteMatch ? noteMatch[1] : null;
                const rubric = value.replace(/N\d{2,3}: ([\d/]+)/, '');
                const updatedRubric = languageCode == 'EN' ? rubric.split(":")[1].trim() : rubric

                if (match[0].startsWith('R06') || match[0].startsWith('R05')) {
                    compat ? compat += ` ,${updatedRubric}` : compat = updatedRubric

                    if (compat.split(' ,').length == 2) {
                        data[day][signName][languageCode].push({ value: compat, note })
                    }
                } else {
                    data[day][signName][languageCode].push({ value: updatedRubric, note });
                }
            }

            if (data[day][signName][languageCode].length === 0) {
                const regex = /R0\d+:(.*?)(?=R0\d+:|$)/gs;
                const matches = response?.data?.message?.matchAll(regex);
                var compat = null

                for (const match of matches) {
                    const value = match[1].trim();
                    const noteMatch = value.match(/N\d{2,3}: ([\d/]+)/);
                    const note = noteMatch ? noteMatch[1] : null;
                    const rubric = value.replace(/N\d{2,3}: ([\d/]+)/, '');
                    const updatedRubric = rubric

                    if (match[0].startsWith('R06') || match[0].startsWith('R05')) {
                        compat ? compat += ` ,${updatedRubric}` : compat = updatedRubric

                        if (compat.split(' ,').length == 2) {
                            data[day][signName][languageCode].push({ value: compat, note })
                        }
                    } else {
                        data[day][signName][languageCode].push({ value: updatedRubric, note });
                    }
                }
            }
            console.log(data[day][signName][languageCode]);

            return {
                [day]: {
                    [signName]: { [languageCode]: { rubrics: data[day][signName][languageCode] } },
                },
            };
        default:
            break;
    }
}
