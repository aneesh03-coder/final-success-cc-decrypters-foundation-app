import React from 'react'
import NavBar from './NavBar';
import Footer from "./Footer"

function LayOut({children}) {
  return (
    <div className="flex flex-col">
    <NavBar/>
    {children}
    <Footer/>
    </div>
  )
}

export default LayOut
