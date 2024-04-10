import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Overview from "./pages/Overview";
import Settings from "./pages/Settings";
import Category from "./pages/Category";
import TaskForm from "./pages/TaskForm";
import EditTask from "./pages/EditTask";

function App(){

  return <> 

    <Router>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/register" element = {<Register/>}/>
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/overview" element = {<Overview/>}/> 
        <Route path = "/overview/settings" element = {<Settings/>}/>
        <Route path = "/overview/category" element = {<Category/>}/>
        <Route path = "/overview/taskform" element = {<TaskForm/>}/>
        <Route path = "/overview/edittask" element = {<EditTask/>}/>
      </Routes>
    </Router>
    

  </>

}

export default App;