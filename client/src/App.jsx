import Home from "./pages/Home.jsx"
import Profile from "./pages/Profile.jsx"
import About from "./pages/Abouts.jsx"
import SignIn from "./pages/SignIn.jsx"
import SignUp from "./pages/SignUp.jsx"
import Header from "./Components/Header.jsx"

import { BrowserRouter, Route, Routes } from "react-router"
import PrivateRoute from "./Components/PrivateRoute.jsx"

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route element={<PrivateRoute />}>
          <Route Route path="/profile" element={<Profile />}></Route>
        </Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
      </Routes>
    </BrowserRouter>
  )
}