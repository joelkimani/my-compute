import logo from './logo.svg';
import './App.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router,Routes,Route, } from 'react-router-dom';
import Signup from './Components/Signup';
import Signin from './Components/Signin';
import Addproducts from './Components/Addproduct';
import Getproducts from './Components/Getproduct';
import Navbar from './Components/Navbar';
import Notfound from './Components/NotFound';
import Makepayment from './Components/Makepayment';
import Support from './Components/Support';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import RequireAuth from './Components/RequireAuth';
import AboutPage from './Components/AboutPage';
import Services from './Components/Services';
import HomePage from './Components/HomePage';
import { Home } from 'lucide-react';


function App() {
  
  return (
    <Router>
    <div className="App">
      
      
      <Routes>
        <Route path='/signup'element ={<Signup/>}/>
        <Route path='/signin' element ={<Signin/>}/>
        <Route path='*' element={<Notfound/>} />
        <Route path='/addproduct'element ={
        <RequireAuth>
        <Addproducts/>
        </RequireAuth>}/>
      
        <Route path='/'element ={<Getproducts/>}/>
        <Route path ="/makepayment" element ={<Makepayment/>}/>
        <Route path = "/about" element={<AboutPage/>}/>
        <Route path='/support' element ={<Support/>}/>
        <Route path='/services' element ={<Services/>}/>
        <Route path='/home' element ={<HomePage/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
