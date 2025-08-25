import { useState } from "react";
import axios from "axios";
import DeshGo from "../../../Shared/DeshGo/DeshGo";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/newsletter", { email });
      setMessage(res.data.message);
      setEmail("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="py-10  bg-gradient-to-br from-[#FFE3BB] to-white dark:from-gray-900 dark:to-gray-800 text-center rounded-2xl shadow-md">
      <div className="mr-25 flex flex-col md:flex-row  items-center  justify-center  ">
       <h1 className="text-xl md:text-4xl text-gray-300 font-bold mb-4 relative top-4">Subscribe to </h1>
     <div className="mr-22 md:mr-0"> <DeshGo /></div>
      </div>
      <p className="mb-4 text-gray-300 dark:text-gray-300 text-2xl font-semibold">Subscribe to our  for the latest updates</p>

      <form onSubmit={handleSubscribe} className="flex justify-center gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none"
        />
        <button type="submit" className="bg-[#1A73E8] text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Subscribe
        </button>
      </form>

     
    </div>
  );
};

export default Newsletter;
