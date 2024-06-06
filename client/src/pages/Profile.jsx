import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  const handleUpdate = (e) => {
    e.preventDefault();
  };
  return (
    <div className="flex flex-col p-3 max-w-lg mx-auto">
      <h1 className="text-center font-semibold">Profile</h1>
      <form className="flex flex-col gap-2">
        <div className="flex justify-center ">
          <img
            src={currentUser.profilePicture}
            alt="profile"
            className="w-40 h-40 object-cover rounded-full cursor-pointer "
          />
        </div>
        <input
          defaultValue={currentUser.username}
          type="text"
          placeholder="username"
          className="bg-slate-100 w-full p-2 rounded-lg"
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          placeholder="email"
          className="bg-slate-100 w-full p-2 rounded-lg"
        />
        <input
          type="password"
          placeholder="password"
          className="bg-slate-100 w-full p-2 rounded-lg"
        />
        <button
          onSubmit={handleUpdate}
          className="bg-slate-700 text-white p-2 rounded-lg hover:opacity-80"
        >
          Update
        </button>
      </form>
      <div className="flex justify-between text-red-500 cursor-pointer">
        <span>Delece Account</span>
        <span>Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
