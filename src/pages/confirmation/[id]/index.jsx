import Header from '@/components/Layout/Header'
import React from 'react'
import { Poppins } from 'next/font/google'
import { useRouter } from 'next/router';
import gerarCSV from '@/Helpers/horo-to-csv';
const poppins = Poppins({ subsets: ['latin'], weight: '400', });

export default function index() {
    const router = useRouter();
    const id = router.query.id

    return (
        <>
            <Header title={'Confirmation'} />
            <section className={poppins.className + ' flex flex-col items-center justify-between '} style={{ height: '90vh' }}>
                <div className='flex justify-start mt-14 px-10 w-full items-center text-center'>
                    <div className=' w-full'>
                        <h2 className=' text-4xl text-center'>Horoscope Validé</h2>
                        <br />
                    </div>
                </div>
                <p className=' text-2xl w-1/4 text-center'>La rédaction de l'horoscope quotidien est terminée</p>
                <div className=' flex space-x-10  mb-10'>
                    <button className=' py-4 px-20 bg-[#D9D9D9]' onClick={() => { gerarCSV(id) }}>Télécharger csv</button>
                    <button className=' py-4 px-20 bg-[#64BD64]' onClick={() => router.push('/home')} >Nouveau Horo.</button>
                </div>
            </section >
        </>
    )
}
