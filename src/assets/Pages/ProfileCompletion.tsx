import { useFormik } from "formik";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput } from "../Components/Input Components";

const ProfileCompletion = () => {
  const navigate = useNavigate();

  const handleAdmin = async () => {
    try {
      const { value: code } = await Swal.fire({
        title: "Enter the admin code",
        input: "text",
        inputPlaceholder: "Admin code",
        showCancelButton: true,
        confirmButtonText: "Submit",
      });

      if (code) {
        const response = await axios.put(
          "http://localhost:8000/api/v1/make-admin",
          {
            adminCode: code,
          }
        );
        if (response.status === 200) {
          return true;
        } else {
          Swal.fire("Invalid code", "", "error");
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Something went wrong", "", "error");
      return false;
    }
  };

  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [dateOfJoin, setDateOfJoin] = useState(new Date());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formik = useFormik({
    initialValues: {
      firstName: localStorage.getItem("name") || "",
      lastName: "",
      email: localStorage.getItem("email") || "",
      address: "",
      phone_No: "",
      locality: "",
      state: "",
      country: "",
      pin: "",
      dateOfBirth: "",
      UserType: "",
      course: "",
      department: "",
      joinDate: "",
      designation: "",
      isAdmin: false,
      isProfileUpdated: false,
      role: "user",
    },
    onSubmit: async (values) => {
      try {
        setIsSubmitted(true);
        values.isProfileUpdated = true;
        const dateString1 = values.dateOfBirth;
        const dateString2 = values.joinDate;
        const dob = new Date(dateString1);
        const joinDate = new Date(dateString2);
        const dobmongo = dob.toISOString().split("T")[0];
        const jdatemongo = joinDate.toISOString().split("T")[0];
        values.dateOfBirth = dobmongo;
        values.joinDate = jdatemongo;
        if (values.UserType === "Staff") {
          values.course = "";
        } else {
          values.designation = "";
          values.isAdmin = false;
        }
        if (values.isAdmin) {
          const response = await handleAdmin();
          if (response) {
            values.role = "Admin";
            values.isProfileUpdated = true;
            const dataResponse = await axios.put(
              "http://localhost:8000/api/v1/update-user-info",
              values
            );
            if (dataResponse.status === 201) {
              Swal.fire({
                icon: "success",
                title: "Success",
                text: "Your Profile has Successfully Updates, Welcome to BookWiz",
                confirmButtonText: "Continue",
                confirmButtonColor: "#0077B6",
                showCancelButton: false,
                allowOutsideClick: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate("/userDashboard");
                }
              });
            } else {
              setTimeout(() => {
                setIsSubmitted(false);
              }, 3000);
            }
          }
        }
        const response = await axios.put(
          "http://localhost:8000/api/v1/update-user-info",
          values
        );
        console.log(values);
        if (response.status === 201) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Your Profile has Successfully Updates, Please Login before continuing",
            confirmButtonText: "Continue to DashBoard",
            confirmButtonColor: "#0077B6",
            showCancelButton: false,
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/userDashboard");
            }
          });
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        alert(error.response.data.message);
      }
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(3, "Must be at least 3 characters")
        .required("First Name is required"),
      email: Yup.string()
        .email("Invalid email")
        .min(3, "Must be at least 3 characters")
        .required("Email is required"),
      phone_No: Yup.string()
        .matches(/^[0-9]\d{9}$/, "Phone number is not valid")
        .required("Phone number is required"),
      dateOfBirth: Yup.date()
        .required("Date of Birth is required")
        .test("age-check", "Age should be less than 5", function (value) {
          const currentDate = new Date();
          const birthDate = new Date(value);
          let age = currentDate.getFullYear() - birthDate.getFullYear();
          const monthDiff = currentDate.getMonth() - birthDate.getMonth();

          if (
            monthDiff < 0 ||
            (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())
          ) {
            age--;
          }
          if (age < 5) {
            return this.createError({
              message: "Age should be greater than 5",
            });
          }
          return true;
        }),
      address: Yup.string().required("Address is required"),
      locality: Yup.string().required("Locality is required"),
      state: Yup.string().required("State is required"),
      country: Yup.string().required("Country is required"),
      pin: Yup.string().required("Pin is required"),
      UserType: Yup.string().required("User Type is required"),
      department: Yup.string().required("Department is required"),
      joinDate: Yup.date().required("Join Date is required"),
    }),
  });

  return (
    <div className="w-screen h-screen bg-blue-100 ">
      <div className="w-screen h-1/2 shadow-xl rounded-b-3xl bg-gradient-to-t from-cyan-500 to bg-blue-700">
        <span className="font-[museomoderno] text-white font-bold text-[35px] ml-[50px] absolute translate-y-4">
          BookWiz
        </span>
      </div>
      <motion.div
        className="flex flex-col"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 1.5,
          ease: [0.04, 0.62, 0.23, 0.98],
        }}
      >
        <div className="w-[800px] h-[850px] overflow-x-hidden scrollbar-thin scrollbar-webkit absolute rounded-2xl shadow-xl translate-x-[570px] translate-y-[-430px] bg-white  p-8 flex flex-col items-center">
          <div className="text-[#003F8F] font-[Poppins] font-bold text-[30px]">
            Profile Completion
          </div>
          <div className=" text-gray-500 font-[Poppins] text-[15px]">
            Please complete your profile details to continue
          </div>
          <div className="w-[600px] h-[2px] bg-gray-500 my-4" />
          <form onSubmit={formik.handleSubmit} method="POST">
            <div className=" pt-2 w-full grid grid-flow-row gap-1  auto-row-max">
              <div className="grid grid-flow-col gap-10 auto-cols-max">
                <TextInput
                  id="firstName"
                  label="First Name:"
                  onBlur={formik.handleBlur}
                  width="w-[300px]"
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                  error={formik.errors.firstName}
                  touched={formik.touched.firstName}
                />
                <TextInput
                  id="lastName"
                  label="Last Name:"
                  onBlur={formik.handleBlur}
                  width="w-[300px]"
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                  error={formik.errors.lastName}
                  touched={formik.touched.lastName}
                />
              </div>
              <div className="grid grid-flow-col gap-10 auto-cols-max">
                <TextInput
                  id="email"
                  label="Email:"
                  onBlur={formik.handleBlur}
                  width="w-[300px]"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  error={formik.errors.email}
                  touched={formik.touched.email}
                />
                <TextInput
                  id="phone_No"
                  label="Mobile: "
                  onBlur={formik.handleBlur}
                  width="w-[300px]"
                  onChange={formik.handleChange}
                  value={formik.values.phone_No}
                  error={formik.errors.phone_No}
                  touched={formik.touched.phone_No}
                />
              </div>
              <div className="grid grid-flow-col gap-10 auto-cols-max">
                <TextInput
                  id="address"
                  label="Address: "
                  onBlur={formik.handleBlur}
                  width="w-[640px]"
                  onChange={formik.handleChange}
                  value={formik.values.address}
                  error={formik.errors.address}
                  touched={formik.touched.address}
                />
              </div>
              <div className="grid grid-flow-col gap-10 auto-cols-max">
                <TextInput
                  id="locality"
                  label="Locality: "
                  onBlur={formik.handleBlur}
                  width="w-[300px]"
                  onChange={formik.handleChange}
                  value={formik.values.locality}
                  error={formik.errors.locality}
                  touched={formik.touched.locality}
                />
                <TextInput
                  id="state"
                  label="State: "
                  onBlur={formik.handleBlur}
                  width="w-[300px]"
                  onChange={formik.handleChange}
                  value={formik.values.state}
                  error={formik.errors.state}
                  touched={formik.touched.state}
                />
              </div>
              <div className="grid grid-flow-col gap-10 auto-cols-max">
                <TextInput
                  id="country"
                  label="Country: "
                  onBlur={formik.handleBlur}
                  width="w-[300px]"
                  onChange={formik.handleChange}
                  value={formik.values.country}
                  error={formik.errors.country}
                  touched={formik.touched.country}
                />
                <TextInput
                  id="pin"
                  label="PinCode: "
                  onBlur={formik.handleBlur}
                  width="w-[300px]"
                  onChange={formik.handleChange}
                  value={formik.values.pin}
                  error={formik.errors.pin}
                  touched={formik.touched.pin}
                />
              </div>

              <div className="pt-1 grid grid-flow-col gap-10 auto-cols-max">
                <div>
                  <label
                    htmlFor="dob"
                    className="block text-gray-800 text-[Montserrat] font-semibold mb-1"
                  >
                    Date Of Birth
                  </label>
                  <DatePicker
                    id="dob"
                    className={`border w-[300px] border-gray-300 px-3 py-2 text-gray-900 rounded-xl focus:outline-none focus:border-[#003F8F] transition duration-500 ${
                      formik.errors.dateOfBirth && formik.touched.dateOfBirth
                        ? "border-red-500"
                        : ""
                    }`}
                    value={formik.values.dateOfBirth}
                    onBlur={formik.handleBlur}
                    dateFormat={"dd/MM/yyyy"}
                    selected={dateOfBirth}
                    onChange={(date) => {
                      if (date) {
                        setDateOfBirth(date);
                      }
                      formik.setFieldValue("dateOfBirth", date);
                    }}
                    maxDate={new Date()}
                  />
                  {formik.errors.dateOfBirth && formik.touched.dateOfBirth ? (
                    <div className="text-red-500 ml-3 text-[13px]">
                      {formik.errors.dateOfBirth}
                    </div>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="role"
                    className="block text-gray-800 text-[Montserrat] font-semibold mb-1"
                  >
                    You are a:
                  </label>
                  <select
                    id="role"
                    className="border w-[300px] border-gray-300 px-3 py-2 text-gray-900 rounded-xl focus:outline-none focus:border-[#003F8F] transition duration-500"
                    value={formik.values.UserType}
                    onChange={(e) =>
                      formik.setFieldValue("UserType", e.target.value)
                    }
                  >
                    <option value={""}>Choose Your Role</option>
                    <option value="Student">Student</option>
                    <option value="Staff">Staff</option>
                  </select>
                  {formik.errors.UserType && formik.touched.UserType ? (
                    <div className="text-red-500 ml-3 text-[13px]">
                      {formik.errors.UserType}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="pt-1 grid grid-flow-col gap-10 auto-cols-max">
                <TextInput
                  id="department"
                  label="Department: "
                  onBlur={formik.handleBlur}
                  width="w-[640px]"
                  onChange={formik.handleChange}
                  value={formik.values.department}
                  error={formik.errors.department}
                  touched={formik.touched.department}
                />
              </div>
              <div className="pt-1 grid grid-flow-col gap-10 auto-cols-max">
                <div>
                  {formik.values.UserType === "Student" ? (
                    <div>
                      <label
                        htmlFor="course"
                        className="block text-gray-800 text-[Montserrat] font-semibold mb-1"
                      >
                        Course:
                      </label>
                      <input
                        id="course"
                        type="text"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.course}
                        className={`border w-[300px] border-gray-300 px-3 py-2 text-gray-900 rounded-xl focus:outline-none focus:border-[#003F8F] transition duration-500 ${
                          formik.errors.course && formik.touched.course
                            ? "border-red-500"
                            : ""
                        }`}
                      />

                      {formik.errors.course && formik.touched.course ? (
                        <div className="text-red-500 ml-3 text-[13px]">
                          {formik.errors.course}
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <div>
                      <label
                        htmlFor="designation"
                        className="block text-gray-800 text-[Montserrat] font-semibold mb-1"
                      >
                        Designation:
                      </label>
                      <input
                        id="designation"
                        type="text"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.designation}
                        className={`border w-[300px] border-gray-300 px-3 py-2 text-gray-900 rounded-xl focus:outline-none focus:border-[#003F8F] transition duration-500 ${
                          formik.errors.designation &&
                          formik.touched.designation
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {formik.errors.designation &&
                      formik.touched.designation ? (
                        <div className="text-red-500 ml-3 text-[13px]">
                          {formik.errors.designation}
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="joinDate"
                    className="block text-gray-800 text-[Montserrat] font-semibold mb-1"
                  >
                    Joining Date:
                  </label>
                  <DatePicker
                    id="joinDate"
                    className={`border w-[300px] border-gray-300 px-3 py-2 text-gray-900 rounded-xl focus:outline-none focus:border-[#003F8F] transition duration-500 ${
                      formik.errors.joinDate && formik.touched.joinDate
                        ? "border-red-500"
                        : ""
                    }`}
                    value={formik.values.joinDate}
                    onBlur={formik.handleBlur}
                    dateFormat={"dd/MM/yyyy"}
                    selected={dateOfJoin}
                    onChange={(date) => {
                      if (date) {
                        setDateOfJoin(date);
                      }
                      formik.setFieldValue("joinDate", date);
                    }}
                    maxDate={new Date()}
                  />

                  {formik.errors.joinDate && formik.touched.joinDate ? (
                    <div className="text-red-500 ml-3 text-[13px]">
                      {formik.errors.joinDate}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className=" grid grid-flow-col gap-3 auto-cols-max items-center  pt-2">
                <input
                  type="checkbox"
                  disabled={formik.values.UserType !== "Staff"}
                  id="isAdmin"
                  checked={formik.values.isAdmin}
                  onChange={() => {
                    formik.setFieldValue("isAdmin", !formik.values.isAdmin);
                  }}
                />{" "}
                <span>Are you an Admin ?</span>
              </div>
              <div className=" grid grid-flow-col gap-10 auto-cols-max items-center justify-center pt-6">
                <button
                  // disabled={isSubmitted ? true : false}
                  className={`bg-blue-700 w-[300px] font-[Montserrat] font-bold tex-[20px] text-white py-2 px-4 rounded hover:bg-[#003F8F] ${
                    isSubmitted
                      ? "bg-gray-500 cursor-not-allowed hover:bg-gray-500"
                      : ""
                  }`}
                >
                  {isSubmitted ? "Loading..." : "Submit"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileCompletion;
