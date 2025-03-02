import { createRoot } from "react-dom/client"
import App from "./app";

const root = document.getElementById("root")

createRoot(root).render(
  <App />
)


// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router";
// import App from "./app";

// const root = document.getElementById("root");

// ReactDOM.createRoot(root).render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// );


// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import { BrowserRouter, Routes, Route } from 'react-router'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <BrowserRouter>
//       <Routes>
//         {/* <Route path="login" element={<Login />} />
//         <Route path="register" element={<Register />} />
//         <Route path="dashboard" element={<Dashboard />} />
//         <Route path="video" element={<Video />} />
//         <Route path="audio" element={<Audio />} />
//         <Route path="file" element={<File />} />
//         <Route path="spotify" element={<Spotify />} />
//         <Route path="profile" element={<Profile />} /> */}
//         <Route path="/" element={<App />} />
//       </Routes>
//     </BrowserRouter>
//   </StrictMode>,
// )
