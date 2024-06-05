import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((store) => store.user);
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
      dispatch(signInStart());
      const res = await axios.post(
        "http://localhost:3000/api/auth/signin",
        formData
      );
      console.log(res);
      if (res.data.success === false) {
        console.log("girdi buraya");
        dispatch(signInFailure(res.data));
        return;
      }
      dispatch(signInSuccess(res.data));
      navigate("/");
    } catch (error) {
      console.log("lknwefnlfflk");
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className=" max-w-xl mx-auto p-5">
      <h1 className="text-2xl text-center font-semibold py-5">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
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
          Sign in
        </button>
      </form>
      <div>
        <p>Dont you have an account ?</p>
        <Link to={"/signup"} className="text-blue-500">
          Sign Up
        </Link>
      </div>
      {error
        ? error.message || (
            <p className="text-red-600">Something went wrong !</p>
          )
        : ""}
    </div>
  );
};

export default SignIn;
