import React from 'react'
import "./Header.css"

function Header() {
  return (
    <div className="header-container">
          <img src="./Logo.png" alt="Logo" className="header-image" />
          <div className="header-text">
            <h1>Thai ID OCR App</h1>
          </div>
        </div>

  )
}

export default Header
