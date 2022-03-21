import { Route, Routes } from 'react-router-dom';
import { Navigation } from '../Common/Navigation/Navigation';
import { Community } from '../Components/Community/Community';
import { Detail } from '../Components/Community/Articles/Detail/Detail';
import { Home } from '../Components/Home/Home';
import { Learn } from '../Components/Learn/Learn';
import { Profile } from '../Components/Profile/Profile';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navigation/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='profile/:userId/*' element={<Profile />} />
        <Route path='learn' element={<Learn/>}></Route>
        <Route path='community' element={<Community/>}>
          <Route path=':articleId' element={<Detail/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
