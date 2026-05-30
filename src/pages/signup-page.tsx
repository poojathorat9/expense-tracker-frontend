import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/signup-page.css';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signup attempt:', { email, password, confirmPassword });
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="signup-title">Expense Tracker</h1>
        <p className="signup-subtitle">Create your account</p>

        <form onSubmit={handleSignup} className="signup-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder=""
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder=""
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-input"
              placeholder=""
              required
            />
          </div>

          <button
            type="submit"
            className="signup-button"
          >
            Sign Up
          </button>
        </form>

        <div className="signup-footer">
          <span>Already have an account? </span>
          <Link to="/">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;