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
                    <li><Link to="/dashboard">仪表盘</Link></li>
                    <li><Link to="/videos">视频</Link></li>
                    <li><Link to="/audios">音频</Link></li>
                    <li><Link to="/images">图片</Link></li>
                    <li><Link to="/files">文档</Link></li>
                    <li><Link to="/premium">VIP</Link></li>
                    <li><Link to="/admin">管理员</Link></li>
                    <li><Link to="/library">内容库</Link></li>
                    <li><Link to="/account">当前登录:{email}</Link></li>
                </ul>
            </nav>
        </div>
    )
}