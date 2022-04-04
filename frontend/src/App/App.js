import { Route, Routes, useLocation } from 'react-router-dom'
import { Navigation } from '../Common/Navigation/Navigation'
import { Community } from '../Components/Community/Community'
import { Detail } from '../Components/Community/Articles/Detail/Detail'
import { Home } from '../Components/Home/Home'
import { Learn } from '../Components/Learn/Learn'
import { Profile } from '../Components/Profile/Profile'
import { NotFound } from '../Common/NotFound/NotFound'
import { Login } from '../Common/Login/Login'
import { Signup } from '../Common/Signup/Signup'
import './App.css'
import { useEffect, useState } from 'react'
import { ACCESS_TOKEN } from 'constants/index'
import { useNavigate } from 'react-router-dom'
import { apiInstance } from 'api'
import { Footer } from 'Common/Footer/Footer'

function App() {
  const token = localStorage.getItem(ACCESS_TOKEN)
  const location = useLocation()
  const [auth, setAuth] = useState()
  const nav = useNavigate()
  useEffect(() => {
    if (!token) {
      nav('/')
    }
  }, [])
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="profile/*" element={<Profile />} />

        <Route path="login" element={<Login />}></Route>
        <Route path="signup" element={<Signup />}></Route>

        <Route path="learn" element={<Learn />}>
          <Route path="image" element={<Learn />}></Route>
        </Route>

        <Route path="community" element={<Community />}>
          <Route path=":articleId" element={<Detail />}></Route>
        </Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      {location.pathname !== '/learn' && <Footer />}
    </div>
  )
}

export default App
