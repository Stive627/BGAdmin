import React, { useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useScreen } from '@/hooks/useScreen';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';

function AddProduct() {
    const category = ['Fruits', 'Vegetable', 'Spices', 'Proteins', 'Dairy', 'Beverages']
    const SubCategories = ['Leafy Green', 'Seasonal', 'Root', 'Fruiting', 'Leguminous', 'Newly Added', 'Discounted']
    const Weights = ['100g', '250g', '500g', '1kg', '2kg']
    const width = useScreen()
    const [product, setProduct] = useState({category:'',subCategory:'', quantity:'', name:'', price:'', weight:'', description:'', imgfile:'' })
    const [show, setShow]=useState({category:false, subproduct:false, quantity:false, weight:false})
    const handleOnclickContainer = () => {
        if(show.category || show.subproduct || show.quantity || show.weight){
            setShow({...show, category:false, subproduct:false, quantity:false, weight:false})
        }
    }
  return (
    <div className=' absolute top-0 bottom-0  left-0 right-0 w-screen h-screen' style={{backgroundColor:'rgba(217, 217, 217, 1)'}}>
        <div className=' w-full  flex justify-center'>
            <div onClick={()=>handleOnclickContainer()} className=' bg-white  p-2 rounded-lg text-[14px]' style={{width:'500px'}}>
                <p className='font-semibold text-[21px]'>Add a new product</p>
                <div className=' flex flex-col gap-2'>
                    <div className=' flex flex-row w-full gap-3'>
                        <div className=' flex-1/2'>
                            <p>Category</p>
                            <div onClick={(e)=>{e.stopPropagation(); setShow({...show, category:!show.category})}} style={{borderColor:'rgba(207, 207, 207, 1)'}} className=' h-8 border rounded-sm relative'>
                                <p className=' pl-1 pt-1'>{product.category}</p>
                                <button className=' absolute right-0 top-0.5'><KeyboardArrowDownIcon/></button>
                                {show.category &&   <div  style={{borderColor:'rgba(207, 207, 207, 1)'}} className=' absolute flex flex-col  bg-white w-full border top-8 px-1 rounded-md'>
                                                        {category.map((elt, indx) => <button onClick={()=>{setProduct({...product, category:elt})}} key={indx}>{elt}</button>)}
                                                    </div>}
                            </div>
                        </div>
                        <div className=' flex-1/4'>
                            <p>{width > 400?'Sub-Category':'S.Category'}</p>
                            <div onClick={(e)=>{e.stopPropagation(); setShow({...show, subproduct:!show.subproduct})}} style={{borderColor:'rgba(207, 207, 207, 1)'}} className='h-8 border rounded-sm relative'>
                                <p className=' pl-1 pt-1'>{product.subCategory}</p>
                                <button className=' absolute right-0 top-0.5'><KeyboardArrowDownIcon/></button>
                                {show.subproduct &&   <div  style={{borderColor:'rgba(207, 207, 207, 1)'}} className=' absolute flex flex-col z-20  bg-white w-full border top-8 px-1 rounded-md'>
                                                        {SubCategories.map((elt, indx) => <button onClick={()=>{setProduct({...product, subCategory:elt})}} key={indx}>{elt}</button>)}
                                                    </div>}
                            </div>
                        </div>
                        <div className=' flex-1/4'>
                            <p>Quantity</p>

                            <input className=' w-full border rounded-md h-8 outline-none px-1' type={width > 650? 'text':'number'} style={{borderColor:'rgba(207, 207, 207, 1)'}} value={product.quantity} onChange={(e) => setProduct({...product, quantity:e.target.value})}/>
                        </div>
                    </div>
                    <div className=' flex flex-row w-full gap-3'>
                        <div className=' flex-1/2'>
                            <p>Name</p>
                           <input type={width > 650? 'text':'number'} value={product.name} onChange={(e)=>setProduct({...product, name:e.target.value})} style={{borderColor:'rgba(207, 207, 207, 1)'}} className=' border w-full h-8 rounded-md outline-none pl-1'/>
                        </div>
                        <div className=' flex-1/4'>
                            <p>Price</p>
                            <input value={product.price} onChange={(e)=>setProduct({...product, price:e.target.value})} style={{borderColor:'rgba(207, 207, 207, 1)'}} className=' border w-full h-8 rounded-md outline-none pl-1'/>
                        </div>
                        <div className=' flex-1/4'>
                            <p>Weight</p>
                            <div onClick={(e)=>{e.stopPropagation(); setShow({...show, weight:!show.weight})}} style={{borderColor:'rgba(207, 207, 207, 1)'}} className=' h-8 border rounded-sm relative'>
                            <p className=' pl-1 pt-1'>{product.weight}</p>
                            <button className=' absolute right-0 top-0.5'><KeyboardArrowDownIcon/></button>
                            {show.weight &&   <div  style={{borderColor:'rgba(207, 207, 207, 1)'}} className=' absolute flex flex-col  bg-white w-full border top-8 px-1 rounded-md'>
                                                        {Weights.map((elt, indx) => <button onClick={()=>{setProduct({...product, weight:elt})}} key={indx}>{elt}</button>)}
                                                    </div>}
                            </div>
                        </div>
                    </div>
                    <div>
                        <p>Description</p>
                        <textarea rows={5} style={{borderColor:'rgba(207, 207, 207, 1)', resize:'none'}} className=' border outline-none pl-1 w-full rounded-md pt-1' value={product.description} onChange={(e)=>setProduct({...product, description:e.target.value})}></textarea>
                    </div>
                    {product.imgfile && <div className=' border py-1 rounded-lg relative'style={{borderColor:'rgba(207, 207, 207, 1)'}}>
                        <button onClick={()=>setProduct({...product, imgfile:''})} className=' absolute right-0 cursor-pointer'><CloseIcon sx={{color:'rgba(194, 16, 18, 1)'}}/></button>
                        <div className=' flex justify-center'> <Image alt='Image of product' width={300} height={300} src={URL.createObjectURL(product.imgfile[0])} /></div>
                    </div>}
                    <div className=' flex flex-row justify-between items-center'>
                        <div><label htmlFor='productImg' ><AttachFileIcon className=' rotate-90' sx={{fontSize:30, color:'rgba(194, 16, 18, 1)'}}/></label><input type='file'  onChange={(e) => setProduct({...product, imgfile:e.target.files})} className=' hidden' id='productImg'/></div>
                        <div className=' flex flex-row gap-3'>
                            <button style={{borderColor:'rgba(194, 16, 18, 1)', color:'rgba(194, 16, 18, 1)'}} className=' border w-17  py-1 rounded-md'>Cancel</button>
                            <button style={{borderColor:'rgba(194, 16, 18, 1)', backgroundColor:'rgba(194, 16, 18, 1)'}} className=' border w-17 py-1 rounded-md text-white'>Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddProduct
