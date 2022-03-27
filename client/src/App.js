import './App.css';
import { Routes ,Route, Navigate } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Contact from './components/Contact/Contact';
import Home from './components/Home/Home';
import Folder from './components/Folder/Folder';
import Edit from './components/Edit/Edit';
import Create from './components/Create/Create';
import Account from './components/Account/Account';
import Page404 from './components/Page404/Page404';

function App() {
  let user = { id: -1 };
  if (localStorage.getItem("user")) {
    user = localStorage.getItem("user");
    user = JSON.parse(user);
  }
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Landing/>}/>
        <Route path='/login' element={user.id===-1?<Login/>:<Navigate to="/account"/>}/>
        <Route path='/signup' element={user.id===-1?<SignUp/>:<Navigate to="/account"/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/home' element={user.id===-1?<Navigate to="/login"/>:<Home/>}/>
        <Route path="/folder/:id" element={<Folder/>} />
        <Route path="/edit/item/:id" element={<Edit/>} />
        <Route path="/folder/create/" element={user.id===-1?<Navigate to="/login"/>:<Create/>} />
        <Route path="/account" element={user.id===-1?<Navigate to="/login"/>:<Account/>} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
