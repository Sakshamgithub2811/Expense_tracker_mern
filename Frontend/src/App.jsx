
import {
  BrowserRouter as Router,
  Routes,
  Route, 
  Navigate
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from './pages/Auth/SignUp';
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";

function App() {


  return (
  
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root/>} />
          <Route path="/login" element = {<Login/>}/>
          <Route path="/signUp" element = {<SignUp/>}/>
          <Route path="/dashboard" element = {<Home/>}/>
          <Route path="/income" element = {<Income/>}/>
          <Route path="/Expense" element = {<Expense/>}/>
        
        </Routes>
      </Router>
    </div>
  )
}

export default App;

const Root = () =>{
  const isAuthenticated = !!localStorage.getItem("token");
  console.log(isAuthenticated);

  return isAuthenticated ? (
    <Navigate to="/dashboard"/>
  ):(
    <Navigate to ="/login" />
  );
};
