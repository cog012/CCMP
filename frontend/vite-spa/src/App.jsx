// import ObjectList from './components/ObjectList'
// import ObjectUpload from './components/ObjectUpload'
// import ObjectDelete from './components/ObjectDelete'
// import Test from './components/Test'

import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Login from './components/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import Videos from './pages/Videos/Videos'
import Audios from './pages/Audios/Audios'
import Images from './pages/Images/Images'
import Files from './pages/Files/Files'
import Admin from './pages/Admin/Admin'
import Test from './pages/Test/Test'
import Profile from './pages/Profile/Profile'
import NoPage from './pages/NoPage/NoPage'
import Sidebar from './components/Sidebar/Sidebar'
import useUser from './hooks/useUser'




function App() {
  const { user, setUser } = useUser()

  if (!user) {
    return (
      <div className='wrapper'>
        <Login index setUser={setUser} />
      </div>
    )
  }

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Sidebar user={user} />
        <Routes>
          <Route path="/dashboard" element={<Dashboard user={user} category={"all"} />} />
          <Route path="/videos" element={<Videos user={user} category={"videos"} />} />
          <Route path="/audios" element={<Audios user={user} category={"audios"} />} />
          <Route path="/images" element={<Images user={user} category={"images"} />} />
          <Route path="/files" element={<Files user={user} category={"files"} />} />
          <Route path="/admin" element={<Admin user={user} category={"all"} />} />
          <Route path="/test" element={<Test user={user} category={"all"} />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
