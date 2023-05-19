import React from 'react'
import Header from '../Layout/Header'
import { Poppins } from 'next/font/google'
import { TfiReload } from 'react-icons/tfi'

const poppins = Poppins({ subsets: ['latin'], weight: '400', });
export default function Load() {
    return (
        <>
            <Header title='Génération' />
            <section className={poppins.className + ' px-80 flex flex-col space-y-10 justify-center items-center pt-40'} style={{ height: '93vh' }}>
                <div className='flex flex-col mb-14 space-y-28 h-96 w-full items-center text-center'>
                    <h2 className=' text-4xl text-center'> Critères de personnalisation</h2>
                    <div className=' text-xl space-y-2'>
                        <p >Votre contenu est en cours de génération:</p>
                        <p> -signe : Bélier </p>
                        <p> -Période: journée </p>
                        <p> -date: 17/05/2023 </p>
                        <p> -Langue: toutes </p>

                    </div>
                </div>
                <div className=' flex items-center  border border-black w-full h-10 bg-[#D9D9D9]'>
                    <div className=' bg-white w-3/5 h-9 flex justify-center items-center'>
                        <div className='flex space-x-1 justify-center items-center '>
                            <TfiReload className=' rotate w-8 h-5' />
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}
