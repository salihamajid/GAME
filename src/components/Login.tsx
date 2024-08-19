import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useLoginStore from '../LoginStore';
import '../App.css'

const Login = () => {
  const { setIsLogin } = useLoginStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLogin(true);
      navigate('/');
    }
  }, [setIsLogin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email,
        password,
      });

      const { token } = response.data;
      console.log(token);

      if (token) {
        localStorage.setItem('authToken', token);
        setIsLogin(true);
        navigate('/');
      } else {
        setError('Token not found');
      }
    } catch (err: any) {
      console.error('An error occurred:', err);
      setError('Invalid Credentials');
    }
  };

  return (
    <div className="wrapper signIn">
      <div className="form paddinng=100px">
        <div className="heading">LOGIN</div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email"> Enter Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            required/>
          </div>
          <div>
            <label htmlFor="password"> Enter Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
           required />
          </div>
          <button type="submit">Login</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
        <p> Create New account! <Link to="/signup">Sign Up</Link> </p>
      </div>
    </div>
  );
};

export default Login;
