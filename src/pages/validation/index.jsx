import Header from '@/components/Layout/Header'
import { Poppins } from 'next/font/google';
import React from 'react'
import { BsArrowLeftShort } from 'react-icons/bs'
const poppins = Poppins({ subsets: ['latin'], weight: '400', });

export default function index() {
    return (
        <>
            <Header title='Validation' />
            <section className={poppins.className + ' flex flex-col items-center justify-start py-14 px-20'} >
                <div className='flex justify-start  mb-14 px-10 w-full items-center text-center'>
                    <div className='w-0.5/5'>
                        <BsArrowLeftShort className='w-12 h-12' onClick={() => {

                        }} />
                    </div>
                    <div className=' w-full'>
                        <h2 className=' text-4xl text-center'> Horoscope Quotidien 23 Août 2023 Bélier</h2>
                    </div>
                </div>
                <p className=' text-3xl'>Validation des Rubriques</p>
                <div className=' w-full mt-20'>
                    <div className=' bg-[#D9D9D9] rounded-md flex flex-col px-20 justify-center p-4 w-full h-80'>
                        <div className=' mb-3 mt-3 flex justify-between font-semibold pr-3'>
                            <p className='text-xl'>Actu astro</p>
                            <p>Note: 6/10</p>
                            <p>250 caracteres</p>
                        </div>
                        <textarea disabled className=' bg-white w-full h-full mb-6 px-4 py-4' rows="10">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                            electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                            electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                        </textarea>
                    </div>
                </div>
                <div className=' w-full'>
                    <div className='flex flex-col  mt-10 space-y-8 px-20 justify-center w-full h-40'>
                        <div className=' flex text-xl justify-between font-semibold  pr-3'>
                            <p>compatibilité amoureuse</p>
                        </div>
                        <div className=' flex space-x-10 font-semibold'>
                            <div className=' space-x-10'>
                                <label>Compact +</label>
                                <input type="text" readOnly value='Cancer' className=' border border-black text-center py-3 bg-[#D9D9D9]' />
                            </div>
                            <div className=' space-x-10'>
                                <label>Compact -</label>
                                <input type="text" readOnly value='Scorpion' className=' border border-black text-center py-3 bg-[#D9D9D9]' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className=' w-full mt-20'>
                    <div className=' bg-[#D9D9D9] flex rounded-md flex-col px-20 justify-center p-4 w-full h-80'>
                        <div className=' mb-3 mt-3 flex justify-between font-semibold pr-3'>
                            <p className='text-xl'>Actu astro</p>
                            <p>Note: 6/10</p>
                            <p>250 caracteres</p>
                        </div>
                        <textarea disabled className=' bg-white w-full h-full mb-6 px-4 py-4' rows="10">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                            electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                            electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                        </textarea>
                    </div>
                </div>
                <div className=' w-full mt-20'>
                    <div className=' bg-[#D9D9D9] rounded-md flex flex-col px-20 justify-center p-4 w-full h-80'>
                        <div className=' mb-3 mt-3 flex justify-between font-semibold pr-3'>
                            <p className='text-xl'>Actu astro</p>
                            <p>Note: 6/10</p>
                            <p>250 caracteres</p>
                        </div>
                        <textarea disabled className=' bg-white w-full h-full mb-6 px-4 py-4' rows="10">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                            electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                            electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                        </textarea>
                    </div>
                </div>
                <div className=' flex space-x-10 mt-8 '>
                    <button className=' py-2 px-20 bg-[#D9D9D9]'>Prev</button>
                    <button className=' py-2 px-20 bg-[#64BD64]'>Next</button>
                </div>
            </section>
        </>
    )
}
