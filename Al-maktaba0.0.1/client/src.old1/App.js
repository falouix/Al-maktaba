
import './App.css';
//import 'semantic-ui-css/semantic.min.css';
import Login from './components/login/login'
import Navbar from './components/navbar/Navbar';
import Navbar_mobile from './components/navbar/Navbar_mobile';
import Dashboard  from './components/dashboard/Dashboard';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
