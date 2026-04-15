import { SignIn } from "@clerk/clerk-react";
import Navbar from "../components/Navbar";

const Login = () => (
  <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Navbar />
    <SignIn appearance={{ baseTheme: 'dark' }} routing="path" path="/login" signUpUrl="/register" />
  </div>
);
export default Login;
