import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { format, parse } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Poppins } from 'next/font/google';

import Header from '@/components/Layout/Header';
import RubricValidationType from './components/RubricValidationType';
import validLangs from '@/config/validLanguages';
import scrollToTop from '@/Helpers/validation';

const poppins = Poppins({ subsets: ['latin'], weight: '400' });

export default function index() {
    const router = useRouter();
    const id = router.query.id

    const [currentIndex, setCurrentIndex] = useState(0);
    const [horoscopeData, setHoroscopeData] = useState(0);
    const [hasError, setHasError] = useState(false);
    const [validatedRubric, setValidatedRubric] = useState(false)

    const goToNextValue = () => {
        const validateIcons = document.querySelectorAll('.validate-icon');

        if (validateIcons.length > 0) {
            setHasError(true);
        } else {
            setHasError(false)
            setCurrentIndex(currentIndex + 1);
            scrollToTop()
        }
    };

    const goToPrevValue = () => {
        setCurrentIndex((currentIndex - 1));
        scrollToTop()
    };

    useEffect(() => {
        const localStorageData = JSON.parse(localStorage.getItem('horoscope-quotidien'));

        if (localStorageData && id) {
            const dataForId = localStorageData.find(item => Object.keys(item)[0] === id);
            const currentValue = dataForId[id][currentIndex];
            console.log(currentIndex);
            if (currentValue) {
                const date = Object.keys(currentValue)[0];
                const sign = Object.keys(currentValue[date])[0];
                const selectedLanguage = validLangs.find(lang => currentValue[date][sign][lang.short]);

                if (selectedLanguage) {
                    const horoscopeValue = currentValue[date][sign][selectedLanguage.short];
                    setHoroscopeData({ value: horoscopeValue, sign, date });
                } else {
                    router.push(`/confirmation/${id}`);
                }
            } else {
                router.push(`/confirmation/${id}`);
            }
        }
    }, [id, currentIndex, validatedRubric]);


    const validateRubric = (rubricId) => {
        function updateLocalStorageData(localStorageData, id, rubricId) {
            return localStorageData.map(item => {
                if (Object.keys(item)[0] === id) {
                    const data = item[id][currentIndex];
                    const date = Object.keys(data)[0];
                    const sign = Object.keys(data[date])[0];
                    const selectedLanguage = validLangs.find(lang => data[date][sign][lang.short]);

                    if (selectedLanguage) {
                        const rubrics = data[date][sign][selectedLanguage.short].rubrics;
                        rubrics[rubricId - 1].validated = true;
                    }
                }
                return item;
            });
        }

        const localStorageData = JSON.parse(localStorage.getItem('horoscope-quotidien')) || [];
        const updatedLocalStorageData = updateLocalStorageData(localStorageData, id, rubricId);
        localStorage.setItem('horoscope-quotidien', JSON.stringify(updatedLocalStorageData));
        setValidatedRubric(!validatedRubric);
    }


    if (horoscopeData) {
        return (
            <>
                <Header title='Validation' />
                <section className={poppins.className + ' flex flex-col items-center justify-start py-14 2xl:px-60 px-10'} >
                    <div className='flex justify-start mb-14 px-10 w-full items-center text-center'>
                        <div className=' w-full'>
                            <h2 className=' text-4xl text-center'>Horoscope Quotidien {format(parse(horoscopeData.date, 'dd/MM/yyyy', new Date()), 'dd MMMM yyyy', { locale: fr })} <br /> {horoscopeData.sign}</h2>
                        </div>
                    </div>
                    <p className=' text-3xl'>Validation des Rubriques</p>
                    {horoscopeData.value.rubrics.map((value, index) => {
                        return (
                            <>
                                <div key={index + 1} className=' 2xl:w-5/6 w-full flex flex-col justify-center'>
                                    <RubricValidationType validateRubric={validateRubric} key={index} rubric={{ key: index + 1, value }} />
                                </div>
                            </>
                        )
                    })}
                    {hasError ? (<div className='alert-message mt-4 bg-red-300 py-4 w-5/6 text-center mx-10'>
                        <p>Veuillez valider toutes les rubriques avant de continuer</p>
                    </div>) : null}

                    <div className=' flex space-x-10 mt-20 '>
                        {currentIndex != 0 ? <button className=' py-4 px-20 bg-[#D9D9D9]' onClick={goToPrevValue}>Précédent</button> : null}
                        <button className=' py-4 px-20 bg-[#64BD64]' onClick={goToNextValue}>Suivant </button>
                    </div>
                </section >
            </>
        )
    } else {
        // Manage the case where no Data finded
    }
}
