import React from 'react'
import Header from './header'
import Sidebar from './sidebar'
import Mainbody from './mainbody'
import './home.css'
import Footer from './footer'

export default function Home() {
  return (
    <div className='home'>
        <Header />
        

            <Mainbody />

        <Footer />
    </div>
  )
}
