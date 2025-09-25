import React from "react";
import React, { useEffect, useState } from "react";
import { testBackend } from "../api.js";

const About = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    testBackend().then(data => {
      if (data?.message) {
        setMessage(data.message);
      }
    });
  }, []);

  const values = [
    {
      id: 1,
      title: "Integrity",
      description:
        "We prioritize honesty and transparency in all our dealings, ensuring a fair and ethical auction experience for everyone.",
    }
  ];

  return (
    <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] gap-7 flex flex-col min-h-screen py-4 justify-center">
      <div>
        <h1
          className={`text-[#d6482b] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl`}
        >
          About Us
        </h1>
        <p className="text-xl text-stone-600">
          Welcome to PrimeBid, the ultimate destination for online auctions
          and bidding excitement. Founded in 2025. It provides a dynamic and user-friendly platform for buyers and
          sellers to connect, explore, and transact in a secure and seamless
          environment.
        </p>

        {/* Display backend test message */}
        {message && (
          <p className="mt-4 text-green-600 font-semibold">
            Backend says: {message}
          </p>
        )}
      </div>
    </section>
  );
};

export default About;

