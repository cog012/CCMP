import React, { useState } from "react"
import "./SideNav.css"

export default function SideNav() {
    const [isActive, setIsActive] = useState(false)

    function handleToggle(event) {
        event.preventDefault()
        setIsActive(!isActive)
    }
    return (
        <div>
            <button onClick={handleToggle}>Toggle</button>
            <div className={`side-navbar ${isActive && "active"}`}>
                <h3>links here</h3>
            </div>
        </div>
    )
}