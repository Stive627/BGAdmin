import React, { useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useScreen } from '@/hooks/useScreen';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { fetchLink } from '@/functions/fetchLink';
import CheckIcon from '@mui/icons-material/Check';
import './addProduct.css'
import Image from 'next/image';

function AddProduct() {
    const category = ['Fruits', 'Vegetable', 'Spices', 'Proteins', 'Dairy', 'Beverages']
    const SubCategories = ['Leafy Green', 'Seasonal', 'Root', 'Fruiting', 'Leguminous', 'Newly Added', 'Discounted']
    const Weights = ['100g', '250g', '500g', '1kg', '2kg']
    const width = useScreen()
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState({category:'',subCategory:'', quantity:'', name:'', price:'', weight:'', description:'', mainImage:'', descriptionImage:'' })
    const [show, setShow]=useState({category:false, subproduct:false, quantity:false, weight:false})
    const [success, setSuccess] = useState(false)
    const validProduct =  product.category && product.subCategory && product.quantity && product.name && product.price && product.weight && product.description && product.mainImage &&  product.descriptionImage
    const handleOnclickContainer = () => {
        if(show.category || show.subproduct || show.quantity || show.weight){
            setShow({...show, category:false, subproduct:false, quantity:false, weight:false})
        }
    }
    const handleCancel = () => setProduct({category:'',subCategory:'', quantity:'', name:'', price:'', weight:'', description:'', mainImage:'', descriptionImage:'' })
    
    const  handleAnim = () =>{
        setSuccess(true)
        setTimeout(() => {
            setSuccess(false)
        }, 4000);
    }

    function handleDeletePicture(){
        setProduct({...product, mainImage:''})
    }
    function handleDeleteDescription(indx){
        const descriptionImages = [...product.descriptionImage]
        const finalDescriptionImages = descriptionImages.filter((elt, idx) => idx !== indx)
        setProduct({...product, descriptionImage:finalDescriptionImages})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData()
        formData.append('name', product.name)
        formData.append('newPrice', product.price)
        formData.append('unit', product.weight)
        formData.append('img', product.mainImage[0])
        formData.append('category', product.category)
        formData.append('subCategory', product.subCategory)
        formData.append('quantity', product.quantity)
        formData.append('description', product.description)
        // axios({url:fetchLink('products/add'), data:formData, method:'POST'})
        // .then((value) => {console.log(value.data); handleAnim()})
        // .catch((err) => {console.log(err.response.data)})
        // .finally(()=> setLoading(false))
        handleAnim()
    }
  return (
    <div className='w-screen h-screen text-black' style={{backgroundColor:'rgba(217, 217, 217, 1)'}}>
        {success && <div className=' absolute right-4 success'>
                        <div className=' bg-white p-2  gap-3 flex flex-row items-center border rounded-md'>
                            <CheckIcon className=' rounded-full' sx={{backgroundColor:'red', color:'white'}}/>
                            <p >The product is successfully added</p>
                        </div>
                    </div>}
        <div className=' w-full  flex justify-center'>
            <form onSubmit={handleSubmit} onClick={()=>handleOnclickContainer()} className=' bg-white  p-2 rounded-lg text-[14px]' style={{width:'500px'}}>
                <p onClick={handleAnim} className='font-semibold text-[21px]'>Add a new product</p>
                <div className=' flex flex-col gap-2'>
                    <div className=' flex flex-row w-full gap-3'>
                        <div className=' flex-1/2'>
                            <p>Category</p>
                            <div onClick={(e)=>{e.stopPropagation(); setShow({...show, category:!show.category})}} style={{borderColor:show.category?'rgba(194, 16, 18, 1)':'rgba(207, 207, 207, 1)'}} className=' h-8 border rounded-sm relative'>
                                <p className=' pl-1 pt-1'>{product.category}</p>
                                <button type='button' className=' absolute right-0 top-0.5'><KeyboardArrowDownIcon/></button>
                                {show.category &&   <div  style={{borderColor:'rgba(207, 207, 207, 1)'}} className=' absolute flex flex-col  bg-white w-full border top-8 px-1 rounded-md'>
                                                        {category.map((elt, indx) => <button type='button' onClick={()=>{setProduct({...product, category:elt})}} key={indx}>{elt}</button>)}
                                                    </div>}
                            </div>
                        </div>
                        <div className=' flex-1/4'>
                            <p>{width > 400?'Sub-Category':'S.Category'}</p>
                            <div onClick={(e)=>{e.stopPropagation(); setShow({...show, subproduct:!show.subproduct})}} style={{borderColor:show.subproduct?'rgba(194, 16, 18, 1)':'rgba(207, 207, 207, 1)'}} className='h-8 border rounded-sm relative'>
                                <p className=' pl-1 pt-1'>{product.subCategory}</p>
                                <button type='button' className=' absolute right-0 top-0.5'><KeyboardArrowDownIcon/></button>
                                {show.subproduct &&   <div  style={{borderColor:'rgba(207, 207, 207, 1)'}} className=' absolute flex flex-col z-20  bg-white w-full border top-8 px-1 rounded-md'>
                                                        {SubCategories.map((elt, indx) => <button type='button' onClick={()=>{setProduct({...product, subCategory:elt})}} key={indx}>{elt}</button>)}
                                                    </div>}
                            </div>
                        </div>
                        <div className=' flex-1/4'>
                            <p>Quantity</p>

                            <input className=' w-full border rounded-md h-8  ' type={width > 650? 'text':'number'} style={{borderColor:'rgba(207, 207, 207, 1)', outlineColor:'rgba(194, 16, 18, 1)'}} value={product.quantity} onChange={(e) => setProduct({...product, quantity:e.target.value})}/>
                        </div>
                    </div>
                    <div className=' flex flex-row w-full gap-3'>
                        <div className=' flex-1/2'>
                            <p>Name</p>
                           <input type='text'  value={product.name} onChange={(e)=>setProduct({...product, name:e.target.value})} style={{borderColor:'rgba(207, 207, 207, 1)', outlineColor:'rgba(194, 16, 18, 1)'}} className=' border w-full h-8 rounded-md pl-1'/>
                        </div>
                        <div className=' flex-1/4'>
                            <p>Price</p>
                            <input type={width > 650? 'text':'number'} value={product.price} onChange={(e)=>setProduct({...product, price:e.target.value})} style={{borderColor:'rgba(207, 207, 207, 1)',  outlineColor:'rgba(194, 16, 18, 1)'}} className=' border w-full h-8 rounded-md  pl-1'/>
                        </div>
                        <div className=' flex-1/4'>
                            <p>Weight</p>
                            <div onClick={(e)=>{e.stopPropagation(); setShow({...show, weight:!show.weight})}} style={{borderColor:show.weight?'rgba(194, 16, 18, 1)':'rgba(207, 207, 207, 1)'}} className=' h-8 border rounded-sm relative'>
                            <p className=' pl-1 pt-1'>{product.weight}</p>
                            <button type='button' className=' absolute right-0 top-0.5'><KeyboardArrowDownIcon/></button>
                            {show.weight &&   <div  style={{borderColor:'rgba(207, 207, 207, 1)'}} className=' absolute flex flex-col  bg-white w-full border top-8 px-1 rounded-md'>
                                                        {Weights.map((elt, indx) => <button type='button' onClick={()=>{setProduct({...product, weight:elt})}} key={indx}>{elt}</button>)}
                                                </div>}
                            </div>
                        </div>
                    </div>
                    <div>
                        <p>Description</p>
                        <textarea rows={3} style={{borderColor:'rgba(207, 207, 207, 1)', resize:'none',  outlineColor:'rgba(194, 16, 18, 1)'}} className=' border  pl-1 w-full rounded-md pt-1 outline-red-600' value={product.description} onChange={(e)=>setProduct({...product, description:e.target.value})}></textarea>
                    </div>
                    <div>
                        <p>Main Image</p>
                        {product.mainImage ?
                            <div style={{borderColor:'rgba(207, 207, 207, 1)'}} className=' w-full h-30 border border-dashed rounded-md flex justify-center items-center'>
                                <div className=' relative'>
                                    <Image  width={100} height={100} alt='main' src={URL.createObjectURL(product.mainImage[0])}/>
                                    <button type='button' onClick={handleDeletePicture} className=' absolute w-6 h-6 border rounded-full top-0 right-0 border-gray-500 bg-white flex items-center justify-center cursor-pointer'><CloseIcon sx={{fontSize:18, color:'##6a7282'}}/></button>
                                </div>
                            </div>
                            :
                            <div>
                                <input  type='file' id='mainImage' className='hidden' value={product.mainImage} onChange={(e) => setProduct({...product, mainImage:e.target.files})}/>
                                <label htmlFor='mainImage' style={{borderColor:'rgba(207, 207, 207, 1)'}} className=' w-full h-20 border border-dashed rounded-md flex justify-center items-center cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#C21012"><path d="M360-400h400L622-580l-92 120-62-80-108 140Zm-40 160q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z"/></svg></label>
                            </div>}
                    </div>
                    <div>
                        <p>Description images</p>
                        {product?.descriptionImage.length > 0 ?
                            <div style={{borderColor:'rgba(207, 207, 207, 1)'}} className=' w-full  p-3 border border-dashed rounded-md grid grid-cols-3 items-center gap-2'>
                                {product.descriptionImage.map((elt, indx) =>
                                                                <div key={indx} className='relative'>
                                                                    <Image  width={90} height={90} alt={`description no${indx}`} src={URL.createObjectURL(elt)}/>
                                                                    <button type='button' onClick={()=>handleDeleteDescription(indx)} className=' absolute w-6 h-6 border rounded-full top-0 right-0 border-gray-500 bg-white flex items-center justify-center cursor-pointer'><CloseIcon sx={{fontSize:18, color:'##6a7282'}}/></button>
                                                                </div>)}
                            </div>
                            :
                            <div>
                                <input multiple type='file' id='descriptionImage' className='hidden' onChange={e=> {setProduct({...product, descriptionImage:Object.values(e.target.files)}); console.log(e.target.files)}}/>
                                <label htmlFor='descriptionImage' style={{borderColor:'rgba(207, 207, 207, 1)'}} className=' w-full h-20 border border-dashed rounded-md flex justify-center items-center cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#C21012"><path d="M360-400h400L622-580l-92 120-62-80-108 140Zm-40 160q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z"/></svg></label>
                            </div>}
                    </div>

                        <div className=' flex flex-row gap-3 justify-end'>
                            <button type='button' onClick={handleCancel} style={{borderColor:'rgba(194, 16, 18, 1)', color:'rgba(194, 16, 18, 1)'}} className=' border w-17  py-1 rounded-md'>Cancel</button>
                            <button type='submit' disabled={!validProduct} style={{borderColor:validProduct?'rgba(194, 16, 18, 1)':'rgba(194, 16, 18, 0.4)', backgroundColor:validProduct? (loading?'rgba(194, 16, 18, 0.1)':'rgba(194, 16, 18, 1)'):'rgba(194, 16, 18, 0.1)'}} className=' border w-17 py-1 rounded-md text-white'>Add</button>
                        </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddProduct
