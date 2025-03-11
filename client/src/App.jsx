import Home from "./pages/Home.jsx"
import Profile from "./pages/Profile.jsx"
import About from "./pages/Abouts.jsx"
import SignIn from "./pages/SignIn.jsx"
import SignOut from "./pages/SignOut.jsx"
import Header from "./Components/Header.jsx"

import { BrowserRouter, Route, Routes } from "react-router"

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/sign-out" element={<SignOut />}></Route>
      </Routes>
    </BrowserRouter>
  )
}