import React from 'react'
import CheckIcon from '@mui/icons-material/Check';
import '../App.css'

function Toast({condition, message}) {
    if(condition){
        return(
            <div className=' absolute right-4 success'>
                <div className=' bg-white p-2  gap-3 flex flex-row items-center border rounded-md'>
                    <CheckIcon className=' rounded-full' sx={{backgroundColor:'red', color:'white'}}/>
                    <p >{message}</p>
                </div>
            </div>
        )
    }
}

export default Toast
