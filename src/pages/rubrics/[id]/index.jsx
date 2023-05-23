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
import Multiselect from 'multiselect-react-dropdown';
const poppins = Poppins({ subsets: ['latin'], weight: '400', });

export default function Rubrics() {
    const router = useRouter();
    const horos = HorosConfig.filter(item => item.id == router.query.id)[0]
    const rubrics = horos?.rubrics;
    var [initialPrompt, setinitialPrompt] = useState()
    var [changerubricsPrompt, setchangerubricsPrompt] = useState(false)
    const [signe, setSigne] = useState()
    const [langs, setLangs] = useState()
    const [showDateRange, setshowDateRange] = useState(false)
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    useEffect(() => {
        const prom = rubrics?.map(rubric => { return parseInt(rubric.defaultValue) === 0 ? '' : `\n ${rubric.name} (${rubric.defaultValue} caractères)` })
        setinitialPrompt(horos?.initialPrompt + prom)
    }, [rubrics, changerubricsPrompt])

    const changeRubricDefaultValue = (value, id) => {
        rubrics.find(rub => {
            if (rub.id == id && value <= 1000) {
                rub.defaultValue = value
            }
        })
        setchangerubricsPrompt(!changerubricsPrompt)
    }

    const addSign = (zodiac) => {
        const str = zodiac.map(obj => obj.name).join(',');
        if (zodiac.length === 1) {
            setinitialPrompt(initial => initial.replace('tous les Signes', str))
        } else if (zodiac.length === 12) {
            setinitialPrompt(initial => initial.replace(signe, 'tous les Signes'))
        } else {
            const str = zodiac.reverse().map(obj => obj.name).join(', ');
            const [, ...old] = zodiac
            old.reverse();
            setSigne(str)
            setinitialPrompt(initial => initial.replace(old.map(obj => obj.name).join(', '), str))
        }
    }

    const removeSign = (zodiac) => {
        const str = zodiac.map(obj => obj.name).join(', ');
        if (zodiac.length === 0) {
            setinitialPrompt(initial => initial.replace(signe, 'tous les Signes'))
        } else if (zodiac.length === 11) {
            setinitialPrompt(initial => initial.replace('tous les Signes', signe))
        } else {
            setinitialPrompt(initial => initial.replace(signe, str))
        }
        setSigne(str)
    }

    const addLang = (lang) => {
        const str = lang.map(obj => obj.prompt).join(',');
        console.log(lang);
        if (lang.length === 1) {
            setLangs(str)
            setinitialPrompt(initial => initial.replace('Rédiger en français(FR), anglais(EN), espagnol(ES), allemand(DE)', str))
        } else {
            const str = lang.reverse().map(obj => obj.prompt).join(', ');
            const [, ...old] = lang
            old.reverse();
            setLangs(str)
            setinitialPrompt(initial => initial.replace(old.map(obj => obj.prompt).join(', '), str))
        }
    }

    const removeLang = (lang) => {
        const str = lang.map(obj => obj.prompt).join(', ');
        if (lang.length === 0) {
            setinitialPrompt(initial => initial.replace(langs, 'Rédiger en français(FR), anglais(EN), espagnol(ES), allemand(DE)'))
        } else {
            setinitialPrompt(initial => initial.replace(langs, str))
        }
        setLangs(str)
    }

    const apiCall = async () => {
        setLoading(true);
        try {
            const data = await fetchData(signe, initialPrompt);
            console.log('Datas Received:', data);
        } catch (error) {
            console.error('Erro when calling the API:', error);
        }
    }

    useEffect(() => {
        if (date[0].startDate !== date[0].endDate) {
            setshowDateRange(false)
        }
    }, [date])

    if (loading) {
        return <Load />
    }
    return (
        <>
            <Header title={'Rubriques'} />
            <section className={poppins.className + ' flex flex-col items-center px-20 lg:px-0 justify-start py-14'} >
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
                    <Multiselect
                        className='max-w-xs bg-[#D9D9D9] text-start'
                        options={Zodiac} // Options to display in the dropdown
                        selectedValues={Zodiac.selectedValue} // Preselected value to persist in dropdown
                        displayValue="name" // Property name to display in the dropdown options
                        onSelect={(zodiac) => addSign(zodiac)}
                        onRemove={(zodiac) => removeSign(zodiac)}
                    />
                    <Multiselect
                        className='max-w-xs bg-[#D9D9D9] text-start'
                        options={validLangs} // Options to display in the dropdown
                        selectedValues={Zodiac.selectedValue} // Preselected value to persist in dropdown
                        displayValue="name" // Property name to display in the dropdown options
                        onSelect={(lang) => addLang(lang)}
                        onRemove={(lang) => removeLang(lang)}
                    />
                    <div className='flex flex-col '>
                        <input type='text' className='border h-10 w-80 text-center pl-4 bg-[#D9D9D9]' onClick={() => setshowDateRange(true)} value={format(date[0].startDate, 'dd/MM/yyyy') + ' - ' + format(date[0]?.endDate, 'dd/MM/yyyy')} onChange={() => { }} />
                        <div className={`mt-10 ${showDateRange ? 'absolute' : 'hidden'}`}>
                            <DateRange
                                editableDateInputs={true}
                                onChange={item => setDate([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={date}
                            />
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-3 gap-x-20 mt-10'>
                    <div className='flex flex-col space-y-2'>
                        <label className='font-medium text-base'>Thème du jour</label>
                        <input type="text" placeholder='Thème du jour' className='border placeholder-black h-10 w-80 text-start pl-4 bg-[#D9D9D9]' id="" />
                    </div>
                    <div className='flex space-x-4 col-span-2 items-start'>
                        <label className='text-xl'>Prompt:</label>
                        <textarea readOnly className='border bg-[#D9D9D9] pl-6 w-full h-32' value={initialPrompt ? initialPrompt : ''} onChange={e => { setinitialPrompt(e.target.value) }}></textarea>
                    </div>
                </div>
                <div className=' flex flex-col mt-32 space-y-10 lg:w-2/5'>
                    <h2 className=' text-3xl  text-center font-medium'>Rubriques Horoscope Quotidien {langs}</h2>
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



