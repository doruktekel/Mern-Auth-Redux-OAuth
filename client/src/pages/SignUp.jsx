import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      await axios.post("http://localhost:3000/api/auth/signup", formData);
      setLoading(false);
      navigate("/signin");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className=" max-w-xl mx-auto">
      <h1 className="text-2xl text-center font-semibold py-5">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100   rounded-lg  p-3  "
          onChange={handleChange}
          name="username"
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100   rounded-lg  p-3  "
          onChange={handleChange}
          name="email"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100   rounded-lg  p-3  "
          onChange={handleChange}
          name="password"
        />
        <button
          type="submit"
          disabled={loading}
          className="uppercase bg-slate-700 text-white p-2  rounded-lg hover:opacity-30 transition-all ease-in-out disabled:opacity-90"
        >
          Sign up
        </button>
      </form>
      <div>
        <p>You have an account ?</p>
        <Link to={"/signin"} className="text-blue-500">
          Sign In
        </Link>
      </div>
      {error && <p className="text-red-600">Something went wrong !</p>}
    </div>
  );
};

export default SignUp;
