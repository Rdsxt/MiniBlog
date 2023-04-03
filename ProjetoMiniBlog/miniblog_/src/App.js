import './App.css';

import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import { onAuthStateChanged } from './Firebase/auth';

// Hooks
import { useState, useEffect } from "react"
import { useAuthentication } from "./Hooks/useAuthentication"

// Context
import { AuthProvider } from "./Context/AuthContext";

// Pages
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import CreatePost from './Pages/CreatePost/CreatePost';
import Dashboard from './Pages/Dashboard/Dashboard';
import Search from './Pages/Search/Search';
import Post from './Pages/Post/Post';
import EditPost from './Pages/EditPost/EditPost';

// Components
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';


function App() {

  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/search" element={<Search />} />
            <Route path="/posts/:id" element={<Post />} />
            <Route path="/login" element={ !user ? <Login /> : <Navigate to="/" />} />
            <Route path="/register" element={ !user ? <Register /> : <Navigate to="/" />} />
            <Route path="/posts/edit/:id" element={user ? <EditPost /> : <Navigate to="/login" />} />
            <Route path="/post/create" element={ user ? <CreatePost /> : <Navigate to="/login" />} />
            <Route path="/dashboard" element={ user ? <Dashboard /> : <Navigate to="/login" />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
