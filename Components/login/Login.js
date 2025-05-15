"use client"
import { fetchLink } from '@/functions/fetchLink'
import { useScreen } from '@/hooks/useScreen'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import Confetti from 'react-confetti'

function Login({getAuthenticated}) {
  const [admin, setAdmin] = useState({email:'', password:''})
  const [pending, setPending] = useState(false)
  const [show, setShow] = useState(false)
  const {width, height} = useScreen()
  const large = width > 800
  const validForm = admin.email && admin.password
  function handleSubmit(e){
    setPending(true)
    e.preventDefault()
    const formData = new FormData()
    formData.append('email', admin.email)
    formData.append('password', admin.password)
    axios({url:fetchLink('auth/admin/login'), method:'POST', data:formData, headers:{"Content-Type":"application/json"}})
    .then(val => {console.log(val.data); getAuthenticated(val.data); setShow(true)})
    .catch(err => console.log(err.response.data))
    .finally(()=>setPending(false))
  }
  return (
    <>
      <div className=' w-screen h-screen flex  justify-center'>
        <div className={`${large? 'w-1/5':'w-5/6'}  mt-20`}>
          <div className=' flex justify-center'>
            <div className='flex flex-row items-center gap-4 '>
              <Image width={40} height={40} alt='logo' src={'https://blackgold-bucket.s3.ap-south-1.amazonaws.com/logoAnim.png'}/>
              <p className='font-bold text-[20px]'>Black Gold Admin</p>
            </div>
          </div>
          <p className=' text-center text-[20px] font-bold my-9'>Login to continue</p>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input style={{borderColor:'rgba(0, 0, 0, 0.58)', outlineColor:'rgba(214, 15, 18, 1)'}} className='border w-full py-2 px-1 rounded-md'  value={admin.email} onChange={e => setAdmin({...admin, email:e.target.value})} placeholder='Username or email'/>
            <input style={{borderColor:'rgba(0, 0, 0, 0.58)', outlineColor:'rgba(214, 15, 18, 1)'}} className='border w-full py-2 px-1 rounded-md'  value={admin.password} onChange={e => setAdmin({...admin, password:e.target.value})} placeholder='Password'/>
            <div className=' flex justify-center'><button disabled={!validForm} style={{backgroundColor:validForm?(pending?'rgba(214, 15, 18, 0.4)':'rgba(214, 15, 18, 1)'):'rgba(214, 15, 18, 0.4)'}} type='submit' className=' text-white w-1/3 rounded-md py-1 px-2'>Login</button></div>
          </form>
          <p className=' text-center mt-7'>Forgot password? <span><button style={{color:'rgba(214, 15, 18, 1)'}} className=' underline'>Recover</button></span></p>
        </div>
      </div>
      {show && <Confetti width={width} height={height}/>}
  
    </>
  )
}

export default Login
