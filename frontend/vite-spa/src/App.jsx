// import ObjectList from './components/ObjectList'
// import ObjectUpload from './components/ObjectUpload'
// import ObjectDelete from './components/ObjectDelete'
// import Test from './components/Test'

import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'
import Test from './components/Test'
import NoPage from './components/NoPage/NoPage'
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
        <Routes>
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/test" element={<Test user={user} />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )

  // return (
  //   <>
  //     <div className="App">
  //       <ObjectList />
  //       <ObjectUpload />
  //       <ObjectDelete />
  //       <Test />
  //     </div>
  //   </>
  // )
}

export default App
