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
  const [status, setStatus] = useState({success:false, faillure:false})
  const {width, height} = useScreen()
  const validForm = admin.email && admin.password
  function handleSubmit(e){
    setPending(true)
    e.preventDefault()
    const formData = new FormData()
    formData.append('email', admin.email.trim())
    formData.append('password', admin.password.trim())
    axios({url:fetchLink('auth/admin/login'), method:'POST', data:formData, headers:{"Content-Type":"application/json"}})
    .then(val => {console.log(val.data); getAuthenticated(val.data); setStatus({...status, success:true})})
    .catch(err => {console.log(err.response.data); setStatus({...status, faillure:true})})
    .finally(()=>setPending(false))
  }
  return (
    <div className='relative w-screen h-screen flex  justify-center'>
      <div className={`w-5/6 lg:w-1/5 mt-20`}>
        <div className=' flex justify-center'>
          <div className='flex flex-row items-center gap-4 '>
            <Image width={40} height={40} alt='logo' src={'https://blackgold-bucket.s3.ap-south-1.amazonaws.com/logoAnim.png'}/>
            <p className='font-bold text-[23px]'>Black Gold Admin</p>
          </div>
        </div>
        <p className=' text-center text-[20px] font-bold my-9'>Login to continue</p>
        {status.faillure && <p className=' text-center mb-2' style={{color:'rgba(214, 15, 18, 1)'}}>Email or password are incorrects.</p>}
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input onFocus={()=>setStatus({...status, faillure:false})} style={{borderColor:'rgba(0, 0, 0, 0.58)', outlineColor:'rgba(214, 15, 18, 1)'}} className='border w-full py-2 px-1 rounded-md'  value={admin.email} onChange={e => setAdmin({...admin, email:e.target.value})} placeholder='Username or email'/>
          <input onFocus={()=>setStatus({...status, faillure:false})} style={{borderColor:'rgba(0, 0, 0, 0.58)', outlineColor:'rgba(214, 15, 18, 1)'}} className='border w-full py-2 px-1 rounded-md'  value={admin.password} onChange={e => setAdmin({...admin, password:e.target.value})} placeholder='Password'/>
          <div className=' flex justify-center'><button disabled={!validForm} style={{backgroundColor:validForm?(pending?'rgba(214, 15, 18, 0.4)':'rgba(214, 15, 18, 1)'):'rgba(214, 15, 18, 0.4)'}} type='submit' className=' text-white w-1/3 rounded-md py-1 px-2'>Login</button></div>
        </form>
        <p className=' text-center mt-7'>Forgot password? <span><button style={{color:'rgba(214, 15, 18, 1)'}} className=' underline'>Recover</button></span></p>
      </div>
      {status.success && <Confetti width={width} height={height}/>}
      <div className=' absolute bottom-0 w-screen'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#d60f12" fillOpacity="1" d="M0,128L60,133.3C120,139,240,149,360,133.3C480,117,600,75,720,96C840,117,960,203,1080,229.3C1200,256,1320,224,1380,208L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
      </div>
    </div>

  )
}

export default Login
