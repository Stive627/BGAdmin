"use client"
import AddProduct from "@/Components/AddProduct/AddProduct";
import Login from "@/Components/login/Login";
import React, { useState } from "react";
export default function Home() {
  const [authenticated, setAuthenticated] =  useState({user:undefined, status:false})

  function getAuthenticated(user){
    setTimeout(() => {
      setAuthenticated({...authenticated, status:true, user:user})
    }, 3000);
  }

  if(authenticated.status) return <AddProduct/>
  return <Login getAuthenticated={getAuthenticated}/>

}
