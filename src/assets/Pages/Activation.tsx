import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const OTPInput: React.FC = () => {
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const [otp, setOTP] = useState<string[]>(["", "", "", ""]);
  const navigate = useNavigate();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement> & {nativeEvent: {inputType: string}},
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
  const handleSuccess = () => {
    Swal.fire({
      icon: "success",
      title: "Success",
      html: `Your Account have be successfully Verified, please Fill-in you details to continue`,
      confirmButtonText: "Continue",
      confirmButtonColor: "#0077B6",
      showCancelButton: false,
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login");
      }
    });
  };

  const handleSubmit = async () => {
    try {
      const activationToken = localStorage.getItem("token");
      const response = await axios.post("/api/v1/activate-user", {
        activation_code: otp.join(""),
        activation_token: activationToken,
      });
      if (response.data.success) {
        handleSuccess();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message,
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
      });
    }
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
