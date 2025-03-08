import React, { useState } from 'react'
import { Link } from 'react-router'
import './Sidebar.css'

export default function Sidebar({ user }) {
    const [active, setActive] = useState(false)
    function toggleActive(event) {
        event.preventDefault()
        setActive(!active)
    }
    const email = user.email
    return (
        <div>
            <nav className={active ? "sidebar active" : "sidebar"}>
                <button className="menu" onClick={toggleActive}></button>
                <ul onClick={toggleActive}>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/videos">Videos</Link></li>
                    <li><Link to="/audios">Audios</Link></li>
                    <li><Link to="/images">Images</Link></li>
                    <li><Link to="/files">Files</Link></li>
                    <li><Link to="/admin">Admin</Link></li>
                    <li><Link to="/test">Test</Link></li>
                    <li><Link to="/profile">{email}</Link></li>
                </ul>
            </nav>
        </div>
    )
}