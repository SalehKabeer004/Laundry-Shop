import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState, useEffect } from 'react'
import { supabase } from './utils/supabase'

import NotFound from "./components/NotFound"
import FullPageLoader from "./components/preloader/FullPageLoader";

import Navbar from "./components/header/Navbar"
import Home from "./pages/Home"
import Footer from "./components/footer/Footer"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword"
import SetNewPassword from "./pages/SetNewPassword"
import UserDashboard from "./pages/UserDashboard"
import Booking from "./pages/Booking"

export default function App() {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const testConnection = async () => {
      const { data, error } = await supabase.from('profiles').select('*')

      if (error) {
        console.error("Connection Failed ❌:", error.message)
      } else {
        console.log("Connection Success ✅:", data)
      }
      setLoading(false)
    }
    testConnection()
  }, [])

  if (loading) return <FullPageLoader />;

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="set-new-password" element={<SetNewPassword />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="book-now" element={<Booking />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}