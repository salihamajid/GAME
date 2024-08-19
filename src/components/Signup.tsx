import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useLoginStore from '../LoginStore';

interface FormData {
  name: string;
  email: string;
  password: string;
}
interface ResponseData {
  id: number;
  token: string;
}
export default function Signup() {
    const { setIsLogin } = useLoginStore();
const navigate = useNavigate();
useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLogin(true);
      navigate('/');
    }
  }, [setIsLogin, navigate]);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: ''
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('https://reqres.in/api/register', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data: ResponseData = await res.json();
     console.log(data)
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        setIsLogin(true);
        navigate('/');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="wrapper signUp">
      <div className="form">
        <div className="heading">SING UP</div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={formData.name}
             required onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">E-Mail</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
           required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
           required />
          </div>
          <button type="submit">Submit</button>
          <h2 className="text-center or">OR</h2>
        </form>
        <p>
         Alredy Have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
