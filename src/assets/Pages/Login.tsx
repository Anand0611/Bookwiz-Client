import React, { useState } from "react";
import { FormikErrors, useFormik } from "formik";
import { motion } from "framer-motion";
import * as Yup from "yup";

import axios from "axios";
// import { SuccessPopup } from "../Components";
import { Reading, Polygon1, Polygon2 } from "../Images";
import RandomQuotes from "../Components/RandomQuotes";
import { useNavigate } from "react-router-dom";

interface Login {
  email: string;
  password: string;
}
interface FormErrors extends FormikErrors<Login> {
  form?: string;
}

const LoginForm: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  // const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (
      
      values: Login,
      { setErrors }: { setErrors: (errors: FormErrors) => void }
    ) => {
      try {
        console.log(values);
        setIsSubmitted(true);
        const response = await axios.post(
          "http://localhost:8000/api/v1/login",
          { email: values.email, password: values.password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        if (response.data.user.isProfileUpdated) {
          if(response.data.user.role === "Admin"){
            navigate("/adminDashboard");
          }else{
          navigate("/userDashboard");
          }
        } else {
          localStorage.setItem("firstName", response.data.user.firstName);
          localStorage.setItem("email", response.data.user.email);
          navigate("/profileCompletion");
        }
        if(!response){
          setTimeout(() => {
            setIsSubmitted(false)
          }, 3000);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.response && error.response.status === 400) {
          setErrors({ form: error.response.data.message } as FormErrors);
        } else {
          setErrors({
            form: "Something went wrong. Please try again later.",
          } as FormErrors);
        }
      }
    },
  });

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-white flex items-center p-10 ">
        <div className="bg-white flex flex-col items-begin mx-auto w-[60%]">
          <motion.div
            className="flex flex-col"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 1.5,
              ease: [0.04, 0.62, 0.23, 0.98],
            }}
          >
            <div className="text-[30px] font-[MuseoModerno] font-semibold  text-[#3F51B5] pb-[30px]">
              <a href="/home">BookWiz</a>
            </div>
            <div className="text-[20px] font-[Montserrat] font-semibold ">
              Login to Your Account
            </div>
            <div className="text-[12px] max-w-lg font-[Montserrat] font-semibold pb-5 text-[#818181]">
              Welcome back, Please Login to continue.
            </div>
            <form onSubmit={formik.handleSubmit} method="POST">
              <div className="mb-4 max-w-lg mx-auto">
                <label
                  htmlFor="email"
                  className="block text-gray-800 text-[Montserrat] font-semibold mb-1"
                >
                  Email:
                </label>
                <input
                  id="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="border w-full border-gray-300 px-3 py-2 text-gray-900 rounded-xl focus:outline-none focus:border-[#003F8F] transition duration-500"
                />
                {formik.errors.email && formik.touched.email ? (
                  <div className="text-red-500 ml-3 text-[13px]">
                    {formik.errors.email}
                  </div>
                ) : null}{" "}
              </div>
              <div className="mb-4 max-w-lg mx-auto">
                <label
                  htmlFor="password"
                  className="block text-gray-800 text-[Montserrat] font-semibold mb-1"
                >
                  Password:
                </label>
                <input
                  id="password"
                  type="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className="border w-full border-gray-300 px-3 py-2 text-gray-900 rounded-xl focus:outline-none focus:border-[#003F8F] transition duration-500"
                />
                {formik.errors.password && formik.touched.password ? (
                  <div className="text-red-500 ml-3 text-[13px]">
                    {formik.errors.password}
                  </div>
                ) : null}{" "}
              </div>

              <div className="mb-4 max-w-lg mx-auto">
                <button
                  type="submit"
                  className={`bg-[#3F51B5] w-full font-[Montserrat] font-bold tex-[20px] text-white py-2 px-4 rounded hover:bg-[#003F8F] ${
                    isSubmitted ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Login
                </button>
                <div className="text-center mt-2 mb-2">Or</div>
                <button
                  type="button"
                  disabled={isSubmitted}
                  className={`bg-[#ffffff] w-full font-[Montserrat] font-bold tex-[20px] text-black border-solid border-black border-[2px] py-2 px-4 rounded hover:bg-black hover:text-white ${
                    isSubmitted ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Login with Google
                </button>
                <div className="font-[Montserrat] mt-3">
                  Don't have an account?{" "}
                  <a href="/signup" className="font-bold text-[#3F51B5]">
                    Create an Account
                  </a>
                </div>
                {formik.errors.form && (
                  <p className="text-red-500 text-sm">{formik.errors.form}</p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
      <div className="w-1/2 bg-[#3F51B5] overflow-hidden">
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 1.5,
            ease: [0.04, 0.62, 0.23, 0.98],
          }}
        >
          <img
            className=" absolute  translate-x-[270px] opacity-60 translate-y-[330px]"
            src={Polygon1}
          />
          <img
            className=" absolute  translate-x-[5px] scale-75 opacity-60 translate-y-[100px]"
            src={Polygon2}
          />
          <img
            className=" absolute  translate-x-[280px] scale-50 opacity-60 translate-y-[-30px]"
            src={Polygon2}
          />
          <img
            className="  translate-x-[310px] translate-y-[420px]"
            src={Reading}
          />
          <div className="absolute scale-90 translate-x-[200px] translate-y-[-340px]">
            <RandomQuotes />
          </div>
        </motion.div>
      </div>
      <div className="absolute font-[poppins] font-semibold text-[12px] translate-y-[890px] translate-x-[890px]">
        <span className="text-[#3F51B5]">Created by</span>{" "}
        <span className="text-white">BookWiz Team</span>
      </div>
    </div>
  );
};

export default LoginForm;
