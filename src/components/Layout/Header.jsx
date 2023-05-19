import React from 'react'
import { Poppins } from 'next/font/google'

const poppins = Poppins({ subsets: ['latin'], weight: '400', });

export default function Header(props) {
  return (
    <nav className={poppins.className + ' bg-[#333334] text-center items-center justify-center flex w-ful h-16 text-white font-semibold text-xl'}>
      <p>{props.title}</p>
    </nav>
  )
}
