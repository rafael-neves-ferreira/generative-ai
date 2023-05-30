import HorosConfig from '@/config/horosConfig';
import { saveAs } from 'file-saver';

const generateCSV = async (id) => {
    const data = [];
    const horos = HorosConfig.find(item => item.id === 1);
    const localStorageData = JSON.parse(localStorage.getItem('horoscope-quotidien'));

    if (localStorageData && id) {
        const dataForId = localStorageData.find(item => Object.keys(item)[0] === id);

        for (let index = 0; index < dataForId[id].length; index++) {
            const day = Object.keys(dataForId[id][index])[0];
            const sign = Object.keys(dataForId[id][index][day])[0];
            const lang = Object.keys(dataForId[id][index][day][sign])[0];
            const rubrics = dataForId[id][index][day][sign][lang]['rubrics'];

            rubrics.forEach((rubric, key) => {
                const rub = horos?.rubrics.find(item => item.id === key + 1);
                if (rub) {
                    data.push({
                        day,
                        sign,
                        lang,
                        rubric: rub?.name,
                        value: rubric.value.replace('\n', ' '),
                        note: rubric.note,
                    });
                }
            });
        }
    }

    const csvContent = `Date;Sign;Lang;Rubric;Result;Characters;Rating\n${data
        .map(item => `${item.day};${item.sign};${item.lang};${item.rubric};${item.value};${item.value.length};${item.note}`)
        .join('\n')}`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `horo-${id}.csv`);
};

export default generateCSV;