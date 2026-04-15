import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  return (
    <div style={{ 
      minHeight: '100vh', background: '#080808', display: 'flex', 
      alignItems: 'center', justifyContent: 'center', paddingTop: '80px' 
    }}>
      <SignIn 
        appearance={{
          elements: {
            formButtonPrimary: 'bg-amber-600 hover:bg-amber-700 text-sm normal-case',
            card: 'bg-zinc-900 border border-zinc-800 shadow-2xl',
            headerTitle: 'text-white font-black text-2xl',
            headerSubtitle: 'text-zinc-400',
            socialButtonsBlockButton: 'bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700',
            socialButtonsBlockButtonText: 'text-white font-bold',
            dividerLine: 'bg-zinc-800',
            dividerText: 'text-zinc-500',
            formFieldLabel: 'text-zinc-400',
            formFieldInput: 'bg-zinc-950 border-zinc-800 text-white',
            footerActionText: 'text-zinc-500',
            footerActionLink: 'text-amber-500 hover:text-amber-400'
          }
        }}
        fallbackRedirectUrl="/dashboard"
      />
    </div>
  );
};
export default Login;
