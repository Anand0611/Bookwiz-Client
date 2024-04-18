import { useState } from "react";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ProfileComplete = () => {
  const navigate = useNavigate();
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [dateOfJoin, setDateOfJoin] = useState(new Date());
  const [isSubmitted, setIsSubmitted] = useState(false);

  /**
   * Displays a Swal.fire component to input an admin code.
   * Sends the code to the API to grant admin privileges.
   * If the API response is "success", displays a success message.
   * If the API response is not "success", displays an error message.
   * @returns {Promise<boolean>} A Promise that resolves to true if admin privileges are granted, false otherwise.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      userType: "",
      course: "",
      department: "",
      joinDate: "",
      designation: "",
      isAdmin: false,
      role: "user",
      isProfileUpdated: false,
    },
    onSubmit: async (values) => {
      try {
        // Print values to the console
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
        console.log(values);
        if (values.isAdmin.toString() === "true") {
          try {
            const { value: code } = await Swal.fire({
              title: "Enter the admin code",
              input: "text",
              inputPlaceholder: "Admin code",
              showCancelButton: true,
              confirmButtonText: "Submit",
            });

            if (code) {
              console.log(code);
              const response = await axios.put("/api/v1/make-admin", code);
              console.log(response.data.success);
              if (response.data.success === "success") {
                Swal.fire({
                  icon: "success",
                  title: "Admin Granted",
                  confirmButtonText: "Continue",
                });
                values.role = "Admin";
                values.isProfileUpdated = true;
                await axios.put("/api/v1/update-user-info", values);

                return true;
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Wrong Code. Try Again",
                  confirmButtonText: "Try A",
                });
                return false;
              }
            }
            return false;
          } catch (error) {
            console.log(error);
            Swal.fire({ icon: "error", title: "Something went wrong" });
            return false;
          }
        } else {
          const response = await axios.put("/api/v1/update-user-info", values);
          if (response) {
            console.log(response); // Print response data to the console
            setIsSubmitted(false);
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
                Swal.fire({
                  icon: "success",
                  title: "Success",
                  text: "Login to continue",
                  confirmButtonText: "Login",
                  confirmButtonColor: "#0077B6",
                  showCancelButton: false,
                  allowOutsideClick: false,
                });
                navigate("/login");
              }
            });
          }
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
      userType: Yup.string().required("User Type is required"),

      department: Yup.string().required("Department is required"),
      joinDate: Yup.date().required("Join Date is required"),
    }),
  });

  return (
    <div className="flex h-screen w-screen">
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-t from-cyan-500 to bg-blue-700">
        <div className="flex items-center justify-center">
          <div className=" flex flex-col items-center justify-center bg-white rounded-xl shadow-2xl p-7 overflow-x-hidden overflow-y-auto scrollbar-thin">
            <motion.div
              className="flex flex-col"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1.5,
                ease: [0.04, 0.62, 0.23, 0.98],
              }}
            >
              <div className="text-[25px] flex justify-center font-[Montserrat] font-semibold ">
                Complete Your Profile
              </div>
              <div className="text-[15px] max-w font-[Montserrat] flex justify-center  font-semibold pb-5 text-[#818181]">
                Welcome, Please complete your profile.
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className=" pt-2 w-full grid grid-flow-row gap-1  auto-row-max">
                  <div className="grid grid-flow-col gap-10 auto-cols-max">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-gray-800 text-[Montserrat] font-semibold mb-1"
                      >
                        First Name:
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                        className={`border w-[300px] border-gray-300 px-3 py-2 text-gray-900 rounded-xl focus:outline-none focus:border-[#003F8F] transition duration-500 ${
                          formik.errors.firstName && formik.touched.firstName
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {formik.errors.firstName && formik.touched.firstName ? (
                        <div className="text-red-500 ml-3 text-[13px]">
                          {formik.errors.firstName}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-gray-800 text-[Montserrat] font-semibold mb-1"
                      >
                        Last Name:
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                        className={`border w-[300px] border-gray-300 px-3 py-2 text-gray-900 rounded-xl focus:outline-none focus:border-[#003F8F] transition duration-500 ${
                          formik.errors.lastName && formik.touched.lastName
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {formik.errors.lastName && formik.touched.lastName ? (
                        <div className="text-red-500 ml-3 text-[13px]">
                          {formik.errors.lastName}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="pt-1 grid grid-flow-col gap-10 auto-cols-max">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-gray-800 text-[Montserrat] font-semibold mb-1"
                      >
                        Email:
                      </label>
                      <input
                        id="email"
                        type="text"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        disabled={true}
                        value={formik.values.email}
                        className={`border w-[300px] border-gray-300 px-3 py-2 text-gray-900 rounded-xl focus:outline-none focus:border-[#003F8F] transition duration-500 ${
                          formik.errors.email && formik.touched.email
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {formik.errors.email && formik.touched.email ? (
                        <div className="text-red-500 ml-3 text-[13px]">
                          {formik.errors.email}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <label
                        htmlFor="phone_No"
                        className="block text-gray-800 text-[Montserrat] font-semibold mb-1"
                      >
                        Mobile Number:{" "}
                      </label>
                      <input
                        id="phone_No"
                        type="text"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.phone_No}
                        className={`border w-[300px] border-gray-300 px-3 py-2 text-gray-900 rounded-xl focus:outline-none focus:border-[#003F8F] transition duration-500 ${
                          formik.errors.phone_No && formik.touched.phone_No
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {formik.errors.phone_No && formik.touched.phone_No ? (
                        <div className="text-red-500 ml-3 text-[13px]">
                          {formik.errors.phone_No}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="pt-1 grid grid-flow-col gap-10 auto-cols-max">
                    <div>
                      <label
                        htmlFor="address"
                        className="block text-gray-800 text-[Montserrat] font-semibold mb-1"
                      >
                        Address:
                      </label>
                      <input
                        id="address"
                        type="text"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.address}
                        className={`border w-[640px] border-gray-300 px-3 py-2 text-gray-900 rounded-xl focus:outline-none focus:border-[#003F8F] transition duration-500 ${
                          formik.errors.address && formik.touched.address
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {formik.errors.address && formik.touched.address ? (
                        <div className="text-red-500 ml-3 text-[13px]">
                          {formik.errors.address}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="pt-1 grid grid-flow-col gap-10 auto-cols-max">
                    <div>
                      <label
                        htmlFor="locality"
                        className="block text-gray-800 text-[Montserrat] font-semibold mb-1"
                      >
                        Locality:
                      </label>
                      <input
                        id="locality"
                        type="text"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.locality}
                        className={`border w-[300px] border-gray-300 px-3 py-2 text-gray-900 rounded-xl focus:outline-none focus:border-[#003F8F] transition duration-500 ${
                          formik.errors.locality && formik.touched.locality
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {formik.errors.locality && formik.touched.locality ? (
                        <div className="text-red-500 ml-3 text-[13px]">
                          {formik.errors.locality}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <label
                        htmlFor="state"
                        className="block text-gray-800 text-[Montserrat] font-semibold mb-1"
                      >
                        State:
                      </label>
                      <input
                        id="state"
                        type="text"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.state}
                        className={`border w-[300px] border-gray-300 px-3 py-2 text-gray-900 rounded-xl focus:outline-none focus:border-[#003F8F] transition duration-500 ${
                          formik.errors.state && formik.touched.state
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {formik.errors.state && formik.touched.state ? (
                        <div className="text-red-500 ml-3 text-[13px]">
                          {formik.errors.state}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="pt-1 grid grid-flow-col gap-10 auto-cols-max">
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-gray-800 text-[Montserrat] font-semibold mb-1"
                      >
                        Country:
                      </label>
                      <input
                        id="country"
                        type="text"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.country}
                        className={`border w-[300px] border-gray-300 px-3 py-2 text-gray-900 rounded-xl focus:outline-none focus:border-[#003F8F] transition duration-500 ${
                          formik.errors.country && formik.touched.country
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {formik.errors.country && formik.touched.country ? (
                        <div className="text-red-500 ml-3 text-[13px]">
                          {formik.errors.country}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <label
                        htmlFor="pin"
                        className="block text-gray-800 text-[Montserrat] font-semibold mb-1"
                      >
                        Pin Code:
                      </label>
                      <input
                        id="pin"
                        type="text"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.pin}
                        className={`border w-[300px] border-gray-300 px-3 py-2 text-gray-900 rounded-xl focus:outline-none focus:border-[#003F8F] transition duration-500 ${
                          formik.errors.pin && formik.touched.pin
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {formik.errors.pin && formik.touched.pin ? (
                        <div className="text-red-500 ml-3 text-[13px]">
                          {formik.errors.pin}
                        </div>
                      ) : null}
                    </div>
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
                          formik.errors.dateOfBirth &&
                          formik.touched.dateOfBirth
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
                      {formik.errors.dateOfBirth &&
                      formik.touched.dateOfBirth ? (
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
                        value={formik.values.userType}
                        onChange={(e) =>
                          formik.setFieldValue("userType", e.target.value)
                        }
                      >
                        <option value={""}>Choose Your Role</option>
                        <option value="Student">Student</option>
                        <option value="Staff">Staff</option>
                      </select>
                      {formik.errors.userType && formik.touched.userType ? (
                        <div className="text-red-500 ml-3 text-[13px]">
                          {formik.errors.userType}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="pt-1 grid grid-flow-col gap-10 auto-cols-max">
                    <div>
                      <label
                        htmlFor="department"
                        className="block text-gray-800 text-[Montserrat] font-semibold mb-1"
                      >
                        Department:
                      </label>
                      <input
                        id="department"
                        type="text"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.department}
                        className={`border w-[640px] border-gray-300 px-3 py-2 text-gray-900 rounded-xl focus:outline-none focus:border-[#003F8F] transition duration-500 ${
                          formik.errors.department && formik.touched.department
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {formik.errors.department && formik.touched.department ? (
                        <div className="text-red-500 ml-3 text-[13px]">
                          {formik.errors.department}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="pt-1 grid grid-flow-col gap-10 auto-cols-max">
                    <div>
                      {formik.values.userType === "Student" ? (
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
                  <div className=" grid grid-flow-col gap-3 auto-cols-max items-center">
                    <input
                      type="checkbox"
                      disabled={formik.values.userType !== "Staff"}
                      id="isAdmin"
                      checked={formik.values.isAdmin}
                      onChange={() => {
                        formik.setFieldValue("isAdmin", !formik.values.isAdmin);
                      }}
                    />{" "}
                    <span>Are you an Admin ?</span>
                  </div>
                  <div className="mb-4 max-w-lg mx-auto">
                    <button
                      type="submit"
                      className={`bg-blue-700 w-[200px] font-[Montserrat] font-bold tex-[20px] text-white py-2 px-4 rounded hover:bg-[#003F8F] ${
                        isSubmitted ? "bg-gray-500 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSubmitted ? "Loading..." : "Continue"}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComplete;
