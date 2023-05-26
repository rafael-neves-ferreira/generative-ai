import React from 'react'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import Header from '@/components/Layout/Header'
import { BiRightArrowCircle } from 'react-icons/bi'
import { Poppins } from 'next/font/google'
import HorosConfig from '../../config/horosConfig'
import { useRouter } from 'next/router'

const poppins = Poppins({ subsets: ['latin'], weight: '400', });

export default function index() {
  const router = useRouter();

  const createHoroscope = (id) => {
    return router.push(`/rubrics/${id}`);
  }

  return (
    <>
      <Header title='Selection du typer d’horoscope' />
      <section className={poppins.className + ' flex flex-col space-y-10 w-screen items-center justify-center'} style={{ height: '93vh' }}>
        <h2 className=' text-4xl mb-20'> Sélectionez le type d’horoscope</h2>
        <div className='grid grid-cols-3 gap-6 text-black'>
          {HorosConfig.map((horo) => {
            return (
              <div className=' shadow-xl border h-36 px-20 hover:cursor-pointer text-center items-center justify-center space-y-4 flex flex-col' key={horo.id} onClick={() => createHoroscope(horo.id)}>
                <p>{horo.name}</p>
                <BiRightArrowCircle className='w-7 h-7' color='#64BD64' />
              </div>)
          })}
        </div>
      </section>
    </>
  )
}

// export const getServerSideProps = withPageAuthRequired()