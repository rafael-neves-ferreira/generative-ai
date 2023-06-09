import HorosConfig from '@/config/horosConfig';
import { useRouter } from 'next/router';
import React from 'react'
import { BsCheckCircle } from 'react-icons/bs';
import { TfiReload } from 'react-icons/tfi';


const Icons = ({ validated, validateRubric, id }) => {
    const router = useRouter();
    const validateAllParam = router.query.validateAll;
    console.log(validateAllParam);
    return (
        <div className={'flex space-x-3 container-icon' + id} >
            <TfiReload size={20} className='hover:cursor-pointer' color='#' />
            {validated || validateAllParam ? null : <BsCheckCircle className='hover:cursor-pointer validate-icon' size={20} color='#64BD64' id={'validate' + id} onClick={() => validateRubric(id)} />}
        </div>
    )
}

export default function RubricValidationType({ rubric, validateRubric }) {

    const horos = HorosConfig.filter(item => item.id == 1)[0]
    const rubrics = horos?.rubrics.filter(item => item.id == rubric?.key);

    switch (rubrics[0]?.type) {
        case 1:
            return (
                <div className=' w-full mt-20'>
                    <div className=' bg-[#D9D9D9] rounded-md flex flex-col px-20 justify-center p-4 w-full h-80'>
                        <div className=' mb-3 mt-3 flex justify-between font-semibold pr-3'>
                            <div className=' flex  space-x-4 items-center'>
                                <p className='text-xl'>{rubrics[0]?.name}</p>
                                <Icons validated={rubric.value.validated} validateRubric={validateRubric} id={rubrics[0]?.id} />
                            </div>
                            <p>Note: {rubric.value.note}</p>
                            <p>{rubric.value.value.length}/{rubrics[0]?.defaultValue} caracteres</p>
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
                                <Icons validated={rubric.value.validated} validateRubric={validateRubric} id={rubrics[0]?.id} />
                            </div>
                            <p>Note: {rubric.value.note}</p>
                            <p>{rubric.value.value.length}/{rubrics[0]?.defaultValue} caracteres</p>
                        </div>
                        <textarea disabled className=' bg-white w-full mb-6 px-4 py-4' value={rubric.value.value} rows="10">

                        </textarea>
                    </div>
                </div>
            )
        case 3:
            const sign = rubric.value.value.split(' ,')
            return (
                <div className=' w-full'>
                    <div className='flex flex-col  mt-10 space-y-8 px-20 justify-center w-full h-40'>
                        <div className=' flex text-xl space-x-6 items-center font-semibold  pr-3'>
                            <p>{rubrics[0]?.name}</p>
                            <Icons validated={rubric.value.validated} validateRubric={validateRubric} id={rubrics[0]?.id} />
                        </div>
                        <div className=' flex space-x-10 font-semibold'>
                            <div className=' space-x-10'>
                                <label>Compat +</label>
                                <input type="text" readOnly value={sign[0]} className=' border border-black text-center py-3 bg-[#D9D9D9]' />
                            </div>
                            <div className=' space-x-10'>
                                <label>Compat -</label>
                                <input type="text" readOnly value={sign[1]} className=' border border-black text-center py-3 bg-[#D9D9D9]' />
                            </div>
                        </div>
                    </div>
                </div>
            )
        default:
            break;
    }
}
