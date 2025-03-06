import React, { useState } from "react"
import "./DynamicNav.css"

export default function DynamicNav() {
    const [isActive, setIsActive] = useState(false)
    function handleToggle(event) {
        event.preventDefault()
        setIsActive(!isActive)
        document.body.classList.toggle("no-scroll", isActive)
    }
    return (
        <div className="dynamic-navbar">
            <button onClick={handleToggle}>Toggle Navigation</button>
            {isActive && (
                <div className="nav-links">
                    <h3>links here</h3>
                </div>
            )}
        </div>
    )
}
