import { Routes, Route, Navigate } from 'react-router-dom'
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Support from './pages/Support'
import Login from './pages/Login'
import Register from './pages/Register'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/support" element={<Support />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/dashboard" 
          element={
            <>
              <SignedIn><Dashboard /></SignedIn>
              <SignedOut><Navigate to="/login" /></SignedOut>
            </>
          } 
        />
      </Routes>
    </>
  )
}
export default App
