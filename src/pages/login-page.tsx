import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/login-page.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Expense Tracker</h1>
        <p className="login-subtitle">Manage your money smarter</p>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder=""
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder=""
            />
          </div>

          <Link to="/dashboard" className="login-button">
            Sign In
          </Link>

       
        </form>

        <div className="login-footer">
          <span>Don't have an account? </span>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;