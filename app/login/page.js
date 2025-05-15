import Login from '@/Components/login/Login'
import React, { Suspense } from 'react'

function Home() {
  return (
    <Suspense>
        <Login/>
    </Suspense>
  )
}

export default Home
