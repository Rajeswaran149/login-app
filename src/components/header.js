import React from 'react'
import "./header.css"

export default function Header() {
  return (
    <header className='header'>
        <div className='logo'>Your Logo</div>
        <nav className='nav'>
            <a href='/home'>Home</a>
            <a href='/about'>About</a>
            <a href='/contact'>Contact</a>
        </nav>
    </header>
  )
}
