import React from 'react'
import Layout from '../Layout'
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';

export default function Login() {
  const { user } = useUser();
  const router = useRouter();

  if (user) {
    // if user loged redirect him to Home Page
    console.log(user);
    router.push('home');
  } else {
    return (
      <Layout title='Authentification'>
        <div className='flex flex-col h-screen justify-center items-center'>
          <a href="/api/auth/login" className=' bg-[#64BD64] px-20 py-3 rounded-md'>Login</a>
        </div>
      </Layout>
    )
  }

}
