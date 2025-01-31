import { useState } from "react";
import './Login.css'
function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    alert(data.message);
  };

  return (<div className="page-container">
    <h1>Signup</h1>
    <form onSubmit={handleSignUp}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" />
      <button type="submit">Sign Up</button>
    </form>
    </div>
  );
}

export default SignUp;
