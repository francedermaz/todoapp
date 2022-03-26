import './App.css';
import { Routes ,Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Contact from './components/Contact/Contact';
import Home from './components/Home/Home';
import Folder from './components/Folder/Folder';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Landing/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path="/folder/:id" element={<Folder/>} />
        <Route path="/item/:id" element={<Edit/>} />
        <Route path="/folder/:id" element={<Create/>} />
      </Routes>
    </div>
  );
}

export default App;
