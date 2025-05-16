import React, { useEffect, useRef } from 'react'
import './login.css'

function RecoverUI({condition, handleClose}) {
    const recoverRef = useRef()

    useEffect(()=>{
        if(recoverRef.current){
            setTimeout(() => {
                recoverRef.current.style.height = '200px'
            }, 1);
            
        }
    },[condition])
    function localClose(){
        recoverRef.current.style.height = '0px'
        setTimeout(() => {
            handleClose()
        }, 500);
    }

    if(condition){ 
        return (
            <div style={{backgroundColor:'rgba(217, 217, 217, 0.3)'}} className=' absolute top-0 z-10 bg-black w-screen h-screen overflow-hidden'>
                <div className='w-full h-full' onClick={localClose}>
                    <div ref={recoverRef} onClick={(e)=>e.stopPropagation()} className='fixed recover bottom-0 bg-white  w-full rounded-t-2xl shadow-2xl'>
                        <p className=' text-center font-bold text-[21px] py-3'>Recover Password</p>
                        <hr style={{color:'rgba(207, 207, 207, 1)'}} className=' mb-4'/>
                        <p className=' text-center text-[18px]'>For password recovery, kindly contact the administrator</p>
                        <p className=' text-center mt-3' style={{color:'rgba(194, 16, 18, 1)', fontSize:19}}>admin@bgadmin.com</p>
                        <div className=' float-right p-2'><button style={{color:'rgba(0, 0, 0, 0.71)'}} className=' cursor-pointer' type='button' onClick={localClose}>Close</button></div>
                    </div>
                </div>
                </div>
        )}
}

export default RecoverUI
