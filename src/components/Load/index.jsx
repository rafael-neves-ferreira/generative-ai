import React from 'react';
import { useSelector } from 'react-redux';
import { Poppins } from 'next/font/google';
import { TfiReload } from 'react-icons/tfi';
import { format, parse } from 'date-fns';
import { fr } from 'date-fns/locale';

import Header from '../Layout/Header';
import Rubrics from '@/pages/rubrics/[id]';
import { useRouter } from 'next/router';

const poppins = Poppins({ subsets: ['latin'], weight: '400', });

export default function Load({ normal }) {
    const horoGenerated = useSelector(state => state.horoGenerated);
    const router = useRouter();

    if (normal === false) {
        return (
            <>
                <Header title='Génération' />
                <section className={poppins.className + ' px-80 flex flex-col space-y-4 pb-10 justify-center items-center pt-40'} style={{ height: '93vh' }}>
                    <div className='flex flex-col space-y-28 h-96 w-full items-center text-center'>
                        <h2 className=' text-4xl text-center'> {horoGenerated.horoscope} {horoGenerated.date ? format(parse(horoGenerated.date, 'dd/MM/yyyy', new Date()), 'dd MMMM yyyy', { locale: fr }) : null} <br /> {horoGenerated.signe}</h2>
                        <div className=' text-xl space-y-2'>
                            <p >Votre contenu est en cours de génération:</p>
                            <p> -signe : {horoGenerated.signe} </p>
                            <p> -date: {horoGenerated.date} </p>
                            <p>{horoGenerated.lang} </p>

                        </div>
                    </div>
                    <div className=' flex flex-col items-center justify-center w-full h-10 '>
                        {horoGenerated.error ? (<>
                            <div className='alert-message mt-4 bg-red-300 py-6 w-3/6 text-center mx-10'>
                                <p>Une erreur est survenue lors de la génération.</p>
                            </div>
                            <button className=' bg-[#64BD64] px-20 py-3 mt-4 rounded-md text-white' onClick={() => router.reload()}>Régénérer</button>
                        </>) : <TfiReload className=' rotate w-8 h-5' />}

                    </div>
                </section>
            </>
        )
    } else {
        return (
            <>
                <Header title='Chargement' />
                <section className={poppins.className + ' px-80 flex flex-col space-y-4 pb-10 justify-center items-center pt-40'} style={{ height: '93vh' }}>
                    <div className=' flex items-center justify-center w-full h-10 '>
                        <TfiReload className=' rotate' size={60} />
                    </div>
                </section>
            </>
        )
    }
}
