import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import CreatePost from './pages/CreatePost';
import Home from './pages/Home';
import Login from './pages/Login';
import "./styles/App.css";
import { useState } from 'react';
import Posts from './pages/Post';
import Edit from './pages/Edit';
import Navbar from './pages/Navbar';
import NotFound from './pages/Notfound';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  return (
    <Router>
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path="/" element={<Home isAuth={isAuth}  setIsAuth={setIsAuth}/>} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth}/>} />
        <Route path="/login" element={<Login  setIsAuth={setIsAuth}/>} />

          <Route path="/:id" exact element={<Posts isAuth={isAuth}/>} />
          <Route path="/:id/edit-post" exact element={<Edit isAuth={isAuth}/>} />

    </Routes>
    </Router>
  );
}

export default App;
