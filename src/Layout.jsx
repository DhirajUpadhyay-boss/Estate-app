import React from 'react'


import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'



const Layout = () => {
  return (
    <>
     
     <div className="flex flex-col min-h-screen">
      <Header/>
      <main className="flex-grow">
        <Outlet /> 
        {/* Just to fix Header and footer and nesting */}
      </main>
      <Footer />
    </div>

    </>// fragements.
  )
}

export default Layout
