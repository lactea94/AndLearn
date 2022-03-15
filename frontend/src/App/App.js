import { Route, Routes } from 'react-router-dom';
import { Navigation } from '../Common/Navigation/Navigation';
import { Community } from '../Components/Community/Community';
import { Detail } from '../Components/Community/Detail/Detail';
import { Home } from '../Components/Home/Home';
import { Learn } from '../Components/Learn/Learn';
import { Profile } from '../Components/Profile/Profile';
import { ProfileContentDetail } from '../Components/Profile/ProfileContentDetail';
import { ProfileStats } from '../Components/Profile/ProfileStats';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navigation/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='profile/:userId'>
          <Route path='content' element={<Profile/>}/>
          <Route path='content/:contentId' element={<ProfileContentDetail/>}/>
          <Route path='stats' element={<ProfileStats/>}/>
        </Route>
        <Route path='learn' element={<Learn/>}></Route>
        <Route path='community' element={<Community/>}></Route>
        <Route path='community/:articleId' element={<Detail/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
