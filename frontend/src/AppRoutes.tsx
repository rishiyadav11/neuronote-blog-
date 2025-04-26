import { Route, Routes } from "react-router-dom"
import About from "./pages/About"
import Homepage from "./pages/Homepage"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"

const AppRoutes = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/about" element={<About/>} />
        <Route path="/login" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
    </Routes>
    </>
  )
}

export default AppRoutes