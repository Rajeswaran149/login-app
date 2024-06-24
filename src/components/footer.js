import React from 'react'
import './footer.css'

function Footer() {
  return (
        <footer className='footer'>
            <div className='footer-content'>
                <p> &copy; 2024 your company. All right reserved.</p>
                <div className='footer-links'>
                   <a href="/privacy">Privacy Policy</a>
                   <a href="/terms">Terms of service</a>
                </div>
            </div>
        </footer>
    
  )
}

export default Footer