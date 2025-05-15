import { useEffect, useState } from "react"

export function useScreen(){    
    const [dim, setDim] = useState({width:0, height:0})
    useEffect(()=>{
        setDim({...dim, width:window.innerWidth, height:window.innerHeight})
        function handleWidth(){
            setDim({...dim, width:window.innerWidth, height:window.innerHeight})
        }
        window.addEventListener('resize', handleWidth)
        return () => window.removeEventListener('resize', handleWidth)
    },[])
    return dim 
}