import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Checks } from "../Images/icons";

interface SuccessBannerProps {
  isOpen: boolean;
}
const SuccessBanner: React.FC<SuccessBannerProps> = ({
  isOpen: isOpenProp,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setIsOpen(isOpenProp);
  }, [isOpenProp]);
  if (!isOpen) {
    return null;
  }
  return (
    <motion.div
      className="absolute w-screen h-screen flex justify-center items-center"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute w-screen h-screen">
        <div className="absolute translate-x-[650px] translate-y-[300px] border-8 flex flex-col border-green-500 rounded-2xl drop-shadow-lg  w-[600px] h-[350px] bg-white  m-auto items-center justify-center">
          <img className="w-[80px]" src={Checks} />

          <span className="font-[poppins] flex flex-flex-col font-semibold text-[40px] text-green-600">
            SUCCESS
          </span>
          <span className="font-[poppins] font-normal text-center flex flex-col text-[20px] text-black">
            Your Account has been created successfully
          </span>
          <span className="font-[poppins] font-normal text-center flex flex-col text-[15px] text-black">
            Please check you mail for an Activation code
          </span>
          <button onClick={() => setIsOpen(false)} className="bg-white text-black border-green-600 border-[4px] mt-[20px] p-3 w-[200px] rounded-2xl font-[poppins] font-bold text-[20px] hover:bg-green-600 hover:text-white">
            Continue
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SuccessBanner;
