import { Route, Routes } from 'react-router-dom';
import { Navbar } from '../Common/Navbar/Navbar';
import { Community } from '../Components/Community/Community';
import { Home } from '../Components/Home/Home';
import { Learn } from '../Components/Learn/Learn';
import { Profile } from '../Components/Profile/Profile';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='profile' element={<Profile/>}></Route>
        <Route path='learn' element={<Learn/>}></Route>
        <Route path='community' element={<Community/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
