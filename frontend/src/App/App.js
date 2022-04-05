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
import { Footer } from 'Common/Footer/Footer'
import { ProfileContentDetail } from 'Components/Profile/ProfileContents/ProfileContentDetail'
import { ProfileStats } from 'Components/Profile/ProfileStats/ProfileStats'
import { ProfileArticles } from 'Components/Profile/ProfileArticles/ProfileArticles'
import { UserInfoEdit } from 'Components/Profile/ProfileEdit/UserInfoEdit'
import { PasswordEdit } from 'Components/Profile/ProfileEdit/PasswordEdit'
import { ProfileContents } from 'Components/Profile/ProfileContents/ProfileContents'

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="profile" element={<Profile />}>
            <Route index element={<ProfileContents/>}></Route>
            <Route path="content" element={<ProfileContents/>}>
              <Route path=":contentId" element={<ProfileContentDetail/>} />
            </Route>
            <Route path="stats" element={<ProfileStats/>} />
            <Route path="articles" element={<ProfileArticles />} />
            <Route path="edit" element={<UserInfoEdit />}>
              <Route path="password" element={<PasswordEdit />} />
            </Route>
        </Route> 
        
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
