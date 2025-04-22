import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import Videos from './pages/Videos/Videos'
import Audios from './pages/Audios/Audios'
import Images from './pages/Images/Images'
import Files from './pages/Files/Files'
import Premium from './pages/Premium/Premium'
import Admin from './pages/Admin/Admin'
import Library from './pages/Library/Library'
import Account from './pages/Account/Account'
import NoPage from './pages/NoPage/NoPage'
import Sidebar from './components/Sidebar/Sidebar'
import useUser from './hooks/useUser'
import usePremium from './hooks/usePremium'
import useAdmin from './hooks/useAdmin'




function App() {
  const { user, setUser } = useUser()
  const { premium, setPremium } = usePremium()
  const { admin, setAdmin } = useAdmin()

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
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/videos" element={<Videos user={user} />} />
          <Route path="/audios" element={<Audios user={user} />} />
          <Route path="/images" element={<Images user={user} />} />
          <Route path="/files" element={<Files user={user} />} />
          <Route path="/premium" element={<Premium user={user} premium={premium} setPremium={setPremium} />} />
          <Route path="/admin" element={<Admin user={user} admin={admin} setAdmin={setAdmin} />} />
          <Route path="/library" element={<Library user={user} />} />
          <Route path="/account" element={<Account user={user} setUser={setUser} />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
