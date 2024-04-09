import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import axios from "axios";

const OTPInput: React.FC = () => {
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const [otp, setOTP] = useState<string[]>(["", "", "", ""]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.nativeEvent.inputType === "deleteContentBackward") {
      const updatedOtp = [...otp];
      updatedOtp[index] = "";
      setOTP(updatedOtp);

      if (index > 0) {
        inputRefs[index - 1].current?.focus();
      }
      return;
    }

    const updatedOtp = [...otp];
    updatedOtp[index] = event.target.value;
    setOTP(updatedOtp);

    if (index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleSubmit = () => {
    console.log(otp.join(""))
    axios
      .post("/activate-user", { otp: otp.join("") })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="flex flex-row justify-center gap-6">
        {otp.map((char, i) => (
          <input
            key={i}
            ref={inputRefs[i]}
            value={char}
            onChange={(event) => handleChange(event, i)}
            maxLength={1}
            className="border text-black font-[montserrat] text-[30px] font-bold text-center border-gray-400 w-[80px] h-[80px] flex justify-center  items-center p-5 rounded-xl hover:border-blue-600"
          />
        ))}
      </div>

      <div className="flex flex-col">
        <button
          onClick={handleSubmit}
          className="bg-violet-700 text-white font-[montserrat] font-bold text-[18px]  p-2 w-[400px] rounded-2xl mt-5"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

const ActivationPage = () => {
  return (
    <section className=" bg-[#d8e1ff] w-screen h-screen flex justify-center items-center overflow-hidden">
      <motion.div
        className="flex flex-col"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 100 }}
        transition={{
          duration: 2,
          ease: [0.04, 0.62, 0.23, 0.98],
        }}
      >
        <div className="bg-white w-fit h-fit p-10 rounded-3xl shadow-2xl flex flex-col gap-1">
          <div className="font-[montserrat] font-bold flex justify-center text-[26px]">
            Verify Your Account
          </div>
          <div className="font-[montserrat] font-medium flex justify-center text-gray-300">
            Please enter the activation code sent to your email
          </div>
          <div className="flex flex-row justify-center mt-[20px] gap-5">
            <OTPInput />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ActivationPage;
