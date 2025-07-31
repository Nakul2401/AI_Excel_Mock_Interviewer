"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabaseClient'

function Login() {

  /**
   * Used to sign in with google
   */
  const signInWithGoogle = async()=>{
    const {error} = await supabase.auth.signInWithOAuth({
      provider:'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    })

    if (error){
      console.error('Error:', error.message)
    }
  }

  return (
      <div className='flex flex-col items-center justify-center h-screen'>
          <div className='flex flex-col items-center border-2 border-[#ff7400] rounded-2xl p-16'>
              <Image src={'/cninja.svg'} alt='logo'
                width={400}
                height={100}
                className='w-[280px]'/>

              <div className='flex flex-col items-center mt-2'>
                <Image src={'/login.png'} alt='login'
                width={600}
                height={400}
                className= 'w-[350px] h-auto'/>

                <h2 className='text-2xl font-bold text-center -mt-20'>AI Excel Interviewer Platform</h2>
                <p className='text-gray-500 text-center'>Sign In With Google Authentication</p>

                <Button 
                className='mt-6 bg-[#ff7400] w-full'
                onClick={signInWithGoogle}
                > 
                Login with Google </Button>

              </div>
          </div>
      </div>
  )
}

export default Login