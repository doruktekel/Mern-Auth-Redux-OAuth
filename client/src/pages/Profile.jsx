import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  const fileRef = useRef(null);

  const [image, setImage] = useState(null);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(null);
  const [formData, setFormData] = useState({});
  console.log(formData);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );

    console.log(abc);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
  };
  return (
    <div className="flex flex-col p-3 max-w-lg mx-auto">
      <h1 className="text-center font-semibold">Profile</h1>
      <form className="flex flex-col gap-2">
        <div className="flex flex-col justify-center items-center ">
          <input
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <img
            src={formData.profilePicture || currentUser.profilePicture}
            alt="profile"
            className="w-40 h-40 object-cover rounded-full cursor-pointer p-2  "
            onClick={() => fileRef.current.click()}
          />
          <p className="text-sm self-center">
            {imageError ? (
              <span className="text-red-700">
                Error uploading image (file size must be less than 2 MB)
              </span>
            ) : imagePercent > 0 && imagePercent < 100 ? (
              <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
            ) : imagePercent === 100 ? (
              <span className="text-green-700">
                Image uploaded successfully
              </span>
            ) : (
              ""
            )}
          </p>
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
