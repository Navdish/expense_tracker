import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './Components/Home/Home'
import SignUp from "./Components/Signup/Signup"
import Login from './Components/Login/Login'

function App() {
  return (
    <div>
      <BrowserRouter>
        
        <Routes>
          <Route path='/' element={<Navigate to ='/SignUp' replace={true} />}></Route>
          <Route path='/Home' element={<Home />} />
          <Route path='/SignUp' element={<SignUp />}></Route>
          <Route path='/Login' element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
