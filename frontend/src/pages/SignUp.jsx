import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "@/store/slices/userSlice";

const SignUp = () => {
  const [formValues, setFormValues] = useState({
    userName: "",
    email: "",
    phone: "",
    address: "",
    role: "",
    password: "",
    bankAccountName: "",
    bankAccountNumber: "",
    bankName: "",
    easypaisaAccountNumber: "",
    paypalEmail: "",
    profileImage: null,
  });

  const [profileImagePreview, setProfileImagePreview] = useState("");
  const [errors, setErrors] = useState({});
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfileImagePreview(reader.result);
      setFormValues({ ...formValues, profileImage: file });
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    // FormData for file upload
    const formData = new FormData();
    Object.keys(formValues).forEach((key) => {
      if (formValues[key]) formData.append(key, formValues[key]);
    });

    dispatch(register(formData))
      .unwrap()
      .catch((err) => {
        if (err?.response?.data?.errors) {
          setErrors(err.response.data.errors); // Backend validation errors
        }
      });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated, navigateTo]);

  return (
    <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center">
      <div className="bg-white mx-auto w-full h-auto px-2 flex flex-col gap-4 items-center py-4 justify-center rounded-md">
        <h1 className="text-[#d6482b] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl">
          Register
        </h1>
        <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
          {/* Personal Details */}
          <p className="font-semibold text-xl md:text-2xl">Personal Details</p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-col sm:flex-1">
              <label className="text-[16px] text-stone-600">Full Name</label>
              <input
                type="text"
                name="userName"
                value={formValues.userName}
                onChange={handleChange}
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none"
              />
              {errors.userName && <p className="text-red-600">{errors.userName}</p>}
            </div>
            <div className="flex flex-col sm:flex-1">
              <label className="text-[16px] text-stone-600">Email</label>
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none"
              />
              {errors.email && <p className="text-red-600">{errors.email}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-col sm:flex-1">
              <label className="text-[16px] text-stone-600">Phone</label>
              <input
                type="number"
                name="phone"
                value={formValues.phone}
                onChange={handleChange}
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none"
              />
              {errors.phone && <p className="text-red-600">{errors.phone}</p>}
            </div>
            <div className="flex flex-col sm:flex-1">
              <label className="text-[16px] text-stone-600">Address</label>
              <input
                type="text"
                name="address"
                value={formValues.address}
                onChange={handleChange}
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none"
              />
              {errors.address && <p className="text-red-600">{errors.address}</p>}
            </div>
          </div>

          {/* Role & Password */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-col sm:flex-1">
              <label className="text-[16px] text-stone-600">Role</label>
              <select
                name="role"
                value={formValues.role}
                onChange={handleChange}
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none"
              >
                <option value="">Select Role</option>
                <option value="Auctioneer">Auctioneer</option>
                <option value="Bidder">Bidder</option>
              </select>
              {errors.role && <p className="text-red-600">{errors.role}</p>}
            </div>
            <div className="flex flex-col sm:flex-1">
              <label className="text-[16px] text-stone-600">Password</label>
              <input
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none"
              />
              {errors.password && <p className="text-red-600">{errors.password}</p>}
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex flex-col sm:flex-1 gap-2">
            <label className="text-[16px] text-stone-600">Profile Image</label>
            <div className="flex items-center gap-3">
              <img
                src={profileImagePreview || "/imageHolder.jpg"}
                alt="profile preview"
                className="w-14 h-14 rounded-full"
              />
              <input type="file" onChange={handleImageChange} />
              {errors.profileImage && <p className="text-red-600">{errors.profileImage}</p>}
            </div>
          </div>

          {/* Auctioneer Payment Fields */}
          {formValues.role === "Auctioneer" && (
            <div className="flex flex-col gap-4">
              <label className="font-semibold text-xl md:2xl flex flex-col">
                Payment Method Details{" "}
                <span className="text-[12px] text-stone-500">
                  Fill Payment Details Only If you are registering as an Auctioneer
                </span>
              </label>

              {/* Bank Details */}
              <div className="flex flex-col gap-2">
                <label className="text-[16px] text-stone-500">Bank Details</label>
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                  <select
                    name="bankName"
                    value={formValues.bankName}
                    onChange={handleChange}
                    className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none sm:flex-1"
                  >
                    <option value="">Select Your Bank</option>
                    <option value="SBI">SBI</option>
                    <option value="UNION">UNION</option>
                    <option value="CANARA">CANARA</option>
                    <option value="Allied Bank">Allied Bank</option>
                    <option value="INDIAN BANK">INDIAN BANK</option>
                  </select>
                  {errors.bankName && <p className="text-red-600">{errors.bankName}</p>}

                  <input
                    type="text"
                    name="bankAccountNumber"
                    placeholder="IBAN / IFSC"
                    value={formValues.bankAccountNumber}
                    onChange={handleChange}
                    className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none sm:flex-1"
                  />
                  {errors.bankAccountNumber && <p className="text-red-600">{errors.bankAccountNumber}</p>}

                  <input
                    type="text"
                    name="bankAccountName"
                    placeholder="Bank Account UserName"
                    value={formValues.bankAccountName}
                    onChange={handleChange}
                    className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none sm:flex-1"
                  />
                  {errors.bankAccountName && <p className="text-red-600">{errors.bankAccountName}</p>}
                </div>
              </div>

              {/* Easypaisa & Paypal */}
              <div>
                <label className="text-[16px] text-stone-600 font-semibold">
                  Easypaisa And Paypal Details
                </label>
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                  <input
                    type="number"
                    name="easypaisaAccountNumber"
                    placeholder="Easypaisa Account Number"
                    value={formValues.easypaisaAccountNumber}
                    onChange={handleChange}
                    className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none sm:flex-1"
                  />
                  {errors.easypaisaAccountNumber && <p className="text-red-600">{errors.easypaisaAccountNumber}</p>}

                  <input
                    type="email"
                    name="paypalEmail"
                    placeholder="Paypal Email"
                    value={formValues.paypalEmail}
                    onChange={handleChange}
                    className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none sm:flex-1"
                  />
                  {errors.paypalEmail && <p className="text-red-600">{errors.paypalEmail}</p>}
                </div>
              </div>
            </div>
          )}

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
