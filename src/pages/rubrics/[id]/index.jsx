import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { Poppins } from 'next/font/google'
import Header from '@/components/Layout/Header';
import Zodiac from '../../../config/zodiac';
import validLangs from '@/config/validLanguages';
import HorosConfig from '@/config/horosConfig';
import { BsArrowLeftShort } from 'react-icons/bs';
import RubricType from '../components/RubricType';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'
import format from 'date-fns/format'
import { fetchData } from '@/GPT/FetchData';
import Load from '@/components/Load';
const poppins = Poppins({ subsets: ['latin'], weight: '400', });

export default function Rubrics() {
    const router = useRouter();
    const horos = HorosConfig.filter(item => item.id == router.query.id)[0]
    const rubrics = horos?.rubrics;
    var [initialPrompt, setinitialPrompt] = useState()
    var [rubricsPrompt, setrubricsPrompt] = useState()
    var [changerubricsPrompt, setchangerubricsPrompt] = useState(false)
    const [signe, setSigne] = useState()
    const [langs, setLangs] = useState()
    const [showDateRange, setshowDateRange] = useState(false)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const prom = rubrics?.map(rubric => `\n ${rubric.name} (${rubric.defaultValue} caractères)`)
        setinitialPrompt(horos?.initialPrompt + prom)
        setrubricsPrompt(rubricsPrompt)
        console.log('here', rubricsPrompt, prom);
    }, [rubrics, changerubricsPrompt])

    const changeRubricDefaultValue = (value, id) => {
        setrubricsPrompt(rubrics.find(rub => {
            if (rub.id == id) {
                rub.defaultValue = value
            }
        }))
        setchangerubricsPrompt(!changerubricsPrompt)
        console.log(value, id, rubrics);
    }

    const changeLang = (lang) => {
        var oldValue = langs
        setLangs(lang)
        if (!oldValue) {
            setinitialPrompt(initial => initial.replace('Rédiger en français(FR), anglais(EN), espagnol(ES), allemand(DE)', lang))
        } else {
            setinitialPrompt(initial => initial.replace(oldValue, lang))
        }
    }

    const changeSign = (zodiac) => {
        var oldValue = signe
        setSigne(zodiac)
        if (!oldValue) {
            setinitialPrompt(initial => initial.replace('Touts les Signes', `le ${zodiac}`))
        } else if (zodiac === 'Touts les Signes') {
            setinitialPrompt(initial => initial.replace(`le ${oldValue}`, zodiac))
        } else if (oldValue === 'Touts les Signes') {
            setinitialPrompt(initial => initial.replace(oldValue, `le ${zodiac}`))
        } else {
            setinitialPrompt(initial => initial.replace(`le ${oldValue}`, `le ${zodiac}`))
        }
    }

    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const apiCall = async () => {
        setLoading(true);
        try {
            const data = await fetchData();
            console.log('Datas Received:', data);
        } catch (error) {
            console.error('Erro when calling the API:', error);
        }
    }

    useEffect(() => {
        if (state[0].startDate !== state[0].endDate) {
            setshowDateRange(false)
        }
    }, [state])

    if (loading) {
        return <Load />
    }
    return (
        <>
            <Header title={'Rubriques'} />
            <section className={poppins.className + ' flex flex-col items-center justify-start py-14'} >
                <div className='flex justify-start  mb-14 px-10 w-full items-center text-center'>
                    <div className='w-2/6'>
                        <BsArrowLeftShort className='w-12 h-12' onClick={() => {
                            router.back()
                        }} />
                    </div>
                    <div className=' w-2/6'>
                        <h2 className=' text-4xl text-center'> Critères de personnalisation</h2>
                    </div>
                </div>
                <div className=' grid grid-cols-3 gap-x-20 gap-y-10'>
                    <select className=' h-10 w-80 bg-[#D9D9D9] text-start pl-4' onChange={(e) => changeSign(e.target.value)} id="" >
                        <option value={'Touts les Signes'}>Touts les Signes</option>
                        {Zodiac.map((zodiac) => {
                            return <option key={zodiac.id} value={zodiac.name}>{zodiac.name}</option>
                        })}
                    </select>
                    <select className=' h-10 w-80 bg-[#D9D9D9] text-start pl-4' onChange={(e) => changeLang(e.target.value)} >
                        <option value={'Rédiger en français(FR), anglais(EN), espagnol(ES), allemand(DE)'}>Touts les Langues</option>
                        {validLangs.map((lang) => {
                            return <option key={lang.id} value={lang.prompt}>{lang.name}</option>
                        })}
                    </select>
                    <div className='flex flex-col '>
                        <input className='border h-10 w-80 text-center pl-4 bg-[#D9D9D9]' onClick={() => setshowDateRange(true)} value={format(state[0].startDate, 'dd/MM/yyyy') + ' - ' + format(state[0]?.endDate, 'dd/MM/yyyy')} />
                        <div className={`mt-10 ${showDateRange ? 'absolute' : 'hidden'}`}>
                            <DateRange
                                editableDateInputs={true}
                                onChange={item => setState([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={state}
                            />
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-3 gap-x-20 mt-10'>
                    <div className='flex flex-col space-y-2'>
                        <label htmlFor="" className='font-medium text-base'>Thème du jour</label>
                        <input type="text" placeholder='Thème du jour' className='border placeholder-black h-10 w-80 text-start pl-4 bg-[#D9D9D9]' id="" />
                    </div>
                    <div className='flex space-x-4 col-span-2 items-start'>
                        <label htmlFor="" className='text-xl'>Prompt:</label>
                        <textarea className='border bg-[#D9D9D9] pl-6 w-full h-32' value={initialPrompt} onChange={e => { setinitialPrompt(e.target.value) }}></textarea>
                    </div>
                </div>
                <div className=' flex flex-col mt-32  space-y-10 w-2/5'>
                    <h2 className=' text-3xl  text-center font-medium'>Rubriques Horoscope Quotidien</h2>
                    <div>
                        <ul className=' flex flex-col space-y-10'>
                            {
                                rubrics?.map(rubric => (
                                    <RubricType rubric={rubric} changeRubricDefaultValue={changeRubricDefaultValue} key={rubric.id} />
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <button className=' bg-[#64BD64] px-20 py-3 mt-20 rounded-md text-white' onClick={() => apiCall()}>Generer</button>
            </section>
        </>

    )

}



