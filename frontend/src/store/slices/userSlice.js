import { register } from "@/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [easypaisaAccountNumber, setEasypaisaAccountNumber] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState("");

  const [errors, setErrors] = useState({}); // NEW: error object

  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({}); // reset errors

    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("role", role);
    formData.append("profileImage", profileImage);

    if (role === "Auctioneer") {
      formData.append("bankAccountName", bankAccountName);
      formData.append("bankAccountNumber", bankAccountNumber);
      formData.append("bankName", bankName);
      formData.append("easypaisaAccountNumber", easypaisaAccountNumber);
      formData.append("paypalEmail", paypalEmail);
    }

    try {
      await dispatch(register(formData));
    } catch (err) {
      if (err.response && err.response.data) {
        setErrors(err.response.data.errors || { general: err.response.data.message });
      } else {
        setErrors({ general: "Something went wrong. Please try again." });
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated]);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfileImagePreview(reader.result);
      setProfileImage(file);
    };
  };

  return (
    <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center">
      <div className="bg-white mx-auto w-full h-auto px-2 flex flex-col gap-4 items-center py-4 justify-center rounded-md">
        <h1 className="text-[#d6482b] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl">
          Register
        </h1>

        {errors.general && (
          <p className="text-red-600 font-semibold text-center mb-2">{errors.general}</p>
        )}

        <form className="flex flex-col gap-5 w-full" onSubmit={handleRegister}>
          <p className="font-semibold text-xl md:text-2xl">Personal Details</p>

          {/* Full Name */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col sm:flex-1">
              <label className="text-[16px] text-stone-600">Full Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none"
              />
              {errors.userName && <p className="text-red-600">{errors.userName}</p>}
            </div>

            {/* Email */}
            <div className="flex flex-col sm:flex-1">
              <label className="text-[16px] text-stone-600">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none"
              />
              {errors.email && <p className="text-red-600">{errors.email}</p>}
            </div>
          </div>

          {/* Phone */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col sm:flex-1">
              <label className="text-[16px] text-stone-600">Phone</label>
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none"
              />
              {errors.phone && <p className="text-red-600">{errors.phone}</p>}
            </div>

            {/* Address */}
            <div className="flex flex-col sm:flex-1">
              <label className="text-[16px] text-stone-600">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none"
              />
              {errors.address && <p className="text-red-600">{errors.address}</p>}
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col sm:flex-1 gap-4">
            <label className="text-[16px] text-stone-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none"
            />
            {errors.password && <p className="text-red-600">{errors.password}</p>}
          </div>

          {/* Role */}
          <div className="flex flex-col sm:flex-1 gap-4">
            <label className="text-[16px] text-stone-600">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none"
            >
              <option value="">Select Role</option>
              <option value="Auctioneer">Auctioneer</option>
              <option value="Bidder">Bidder</option>
            </select>
            {errors.role && <p className="text-red-600">{errors.role}</p>}
          </div>

          {/* Profile Image */}
          <div className="flex flex-col sm:flex-1 gap-2">
            <label className="text-[16px] text-stone-600">Profile Image</label>
            <div className="flex items-center gap-3">
              <img
                src={profileImagePreview ? profileImagePreview : "/imageHolder.jpg"}
                alt="profileImagePreview"
                className="w-14 h-14 rounded-full"
              />
              <input type="file" onChange={imageHandler} />
            </div>
            {errors.profileImage && <p className="text-red-600">{errors.profileImage}</p>}
          </div>

          <button
            className="bg-[#d6482b] w-[420px] font-semibold hover:bg-[#b8381e] transition-all duration-300 text-xl py-2 px-4 rounded-md text-white mx-auto lg:w-[640px] my-4"
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
