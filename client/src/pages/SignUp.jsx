import { Link } from "react-router-dom";
const SignUp = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
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
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100   rounded-lg  p-3  "
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100   rounded-lg  p-3  "
        />
        <button className="uppercase bg-slate-700 text-white p-2  rounded-lg hover:opacity-30 transition-all ease-in-out disabled:opacity-90">
          Sign up
        </button>
      </form>
      <div>
        <p>You have an account ?</p>
        <Link to={"/signin"} className="text-blue-500">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
