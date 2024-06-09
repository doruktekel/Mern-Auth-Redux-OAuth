import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const Oauth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await axios.post("/api/auth/google", {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });
      dispatch(signInSuccess(res.data));
      navigate("/");
    } catch (error) {
      console.log("Couldnt login with google", error);
    }
  };
  return (
    <div className="">
      <button
        type="button"
        onClick={handleGoogleClick}
        className="bg-red-700 text-white mt-1  p-3 hover:opacity-80  rounded-lg  w-full uppercase"
      >
        Continue with Google
      </button>
    </div>
  );
};

export default Oauth;
