import Header from '@/components/Layout/Header'
import { Poppins } from 'next/font/google';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import RubricValidationType from './components/RubricValidationType';
import Load from '@/components/Load';
import validLangs from '@/config/validLanguages';
const poppins = Poppins({ subsets: ['latin'], weight: '400', });

export default function index() {
    const router = useRouter();
    const id = router.query.id
    const [lang, setLang] = useState('FR')
    const [indiceAtual, setIndiceAtual] = useState(0);
    const [data, setdata] = useState(0);

    function scrollToTop() {
        const scrollOptions = {
            top: 0,
            behavior: 'smooth' // Define o comportamento como "smooth" para um scroll suave
        };

        window.scrollTo(scrollOptions);
    }
    const proximoValor = () => {
        // console.log((indiceAtual + 1) % data.value.rubrics.length, data);
        setIndiceAtual((indiceAtual + 1) % data.value.rubrics.length);
        scrollToTop()
    };

    const prevValor = () => {
        setIndiceAtual((indiceAtual - 1) % data.value.rubrics.length);
        scrollToTop()
    };

    useEffect(() => {
        // Função para recuperar os dados do LocalStorage com base no ID
        const localStorageData = JSON.parse(localStorage.getItem('horoscope-quotidien'));

        if (localStorageData && id) {
            const dataForId = localStorageData.find(item => Object.keys(item)[0] === id);
            const valorAtual = dataForId[id][indiceAtual];
            if (valorAtual) {
                const date = Object.keys(valorAtual)[0];
                const signo = Object.keys(valorAtual[date])[0];

                setdata({ value: valorAtual[date][signo][lang], sign: signo, date: date });
            }
        }

    }, [id, indiceAtual]);

    const changeLang = (lang) => {
        console.log(lang);
    }


    if (data === 0) {
        <Load />
    } else {
        return (
            <>
                <Header title='Validation' />
                <section className={poppins.className + ' flex flex-col items-center justify-start py-14 2xl:px-60 px-10'} >
                    <div className='flex justify-start mb-14 px-10 w-full items-center text-center'>
                        <div className=' w-full'>
                            <h2 className=' text-4xl text-center'> Horoscope Quotidien {data.date} <br /> {data.sign}</h2>
                        </div>
                    </div>
                    <p className=' text-3xl'>Validation des Rubriques</p>
                    <select name="" className='mt-4' onChange={(e) => changeLang(e.target.value)}>
                        {validLangs.map(lang => <option key={lang.id} value={lang.short}>{lang.name}</option>)}
                    </select>
                    {data.value.rubrics.map((value, index) => {
                        return (
                            <>
                                <div key={index + 1} className=' 2xl:w-5/6 w-full flex flex-col justify-center'>
                                    <RubricValidationType rubric={{ key: index + 1, value }} />
                                </div>
                            </>
                        )
                    })}
                    <div className=' flex space-x-10 mt-20 '>
                        <button className=' py-4 px-20 bg-[#D9D9D9]' onClick={prevValor}>Prev</button>
                        <button className=' py-4 px-20 bg-[#64BD64]' onClick={proximoValor}>Next</button>
                    </div>
                </section >
            </>
        )
    }
}
