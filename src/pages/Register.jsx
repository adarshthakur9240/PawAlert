import { SignUp } from "@clerk/clerk-react";
import Navbar from "../components/Navbar";

const Register = () => (
  <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Navbar />
    <SignUp appearance={{ baseTheme: 'dark' }} routing="path" path="/register" signInUrl="/login" />
  </div>
);
export default Register;
