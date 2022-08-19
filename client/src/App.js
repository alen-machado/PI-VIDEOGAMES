import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import  CardDetail  from "./components/CardDetail";
import  CreateGame  from "./components/CreateGame";
import  HomePage  from "./components/HomePage";
import  LandingPage  from "./components/LandingPage";
import  NotFound  from "./components/NotFound"

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={ < LandingPage /> } />
     <Route path='/home' element={ < HomePage /> } />
     <Route path='/home/:id' element={ < CardDetail /> } />
     <Route path='/create' element={ < CreateGame /> } />
     <Route path='*' element={ < NotFound /> } />

    </Routes>
   </BrowserRouter>
  );
}

export default App;
