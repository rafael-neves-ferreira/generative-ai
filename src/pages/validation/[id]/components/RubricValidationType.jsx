import HorosConfig from '@/config/horosConfig';
import React from 'react'
import { BsCheckCircle } from 'react-icons/bs';
import { TfiReload } from 'react-icons/tfi';


const Icons = () => {
    return (
        <div className='flex space-x-3'>
            <TfiReload size={20} className='hover:cursor-pointer' color='#' />
            <BsCheckCircle className='hover:cursor-pointer' size={20} color='#64BD64' />
        </div>
    )
}
export default function RubricValidationType({ rubric }) {
    const horos = HorosConfig.filter(item => item.id == 1)[0]
    const rubrics = horos?.rubrics.filter(item => item.id == rubric.key);

    switch (rubrics[0]?.type) {
        case 1:
            return (
                <div className=' w-full mt-20'>
                    <div className=' bg-[#D9D9D9] rounded-md flex flex-col px-20 justify-center p-4 w-full h-80'>
                        <div className=' mb-3 mt-3 flex justify-between font-semibold pr-3'>
                            <div className=' flex  space-x-4 items-center'>
                                <p className='text-xl'>{rubrics[0]?.name}</p>
                                <Icons />
                            </div>
                            <p>Note: {rubric.value.note}</p>
                            <p>{rubric.value.value.length} caracteres</p>
                        </div>
                        <textarea disabled className=' bg-white w-full mb-6 px-4 py-4' value={rubric.value.value} rows="10">

                        </textarea>
                    </div>
                </div>
            )
        case 2:
            return (
                <div className=' w-full mt-20'>
                    <div className=' bg-[#D9D9D9] rounded-md flex flex-col px-20 justify-center p-4 w-full h-80'>
                        <div className=' mb-3 mt-3 flex justify-between font-semibold pr-3'>
                            <div className=' flex  space-x-4 items-center'>
                                <p className='text-xl'>{rubrics[0]?.name}</p>
                                <Icons />
                            </div>
                            <p>Note: {rubric.value.note}</p>
                            <p>{rubric.value.value.length} caracteres</p>
                        </div>
                        <textarea disabled className=' bg-white w-full mb-6 px-4 py-4' value={rubric.value.value} rows="10">

                        </textarea>
                    </div>
                </div>
            )
        case 3:
            return (
                <div className=' w-full'>
                    <div className='flex flex-col  mt-10 space-y-8 px-20 justify-center w-full h-40'>
                        <div className=' flex text-xl justify-between font-semibold  pr-3'>
                            <p>{rubrics[0]?.name}</p>
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
            )
        default:
            break;
    }
}
