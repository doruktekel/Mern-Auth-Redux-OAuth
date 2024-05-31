import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-slate-200 ">
      <div className="max-w-6xl mx-auto flex justify-between p-3">
        <Link to={"/"} className="font-semibold text-xl">
          Mern Auth
        </Link>

        <ul className="flex gap-4">
          <Link to={"/"}>
            <li>Home</li>
          </Link>
          <Link to={"/about"}>
            <li>About</li>
          </Link>
          <Link to={"/signIn"}>
            <li>Sign In</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
