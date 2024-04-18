import React from "react";
import { Header, Logout, SideNav } from "../Components/User Dashboard";
import axios from "axios";
import { TextInput } from "../Components/Input Components";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";

interface UserDetails {
  firstName: string;
  lastname: string;
  userId: string;
  designation: string;
  email: string;
  phone_no: string;
  address: string;
  locality: string;
  state: string;
  country: string;
  pin: string;
  dateOfBirth: string;
}
const UserProfile = () => {
  const [userDetails, setUserDetails] = React.useState<UserDetails>({
    firstName: "",
    userId: "",
    designation: "",
    lastname: "",
    email: "",
    phone_no: "",
    address: "",
    locality: "",
    state: "",
    country: "",
    pin: "",
    dateOfBirth: "",
  });
  React.useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/me`);
        console.log(response.data.user);
        const dob = response.data.user.dateOfBirth;
        const date = new Date(dob);
        const dateofbirth = date.toISOString().split("T")[0];
      
        setUserDetails({
          userId: response.data.user.staffID || response.data.user.studentID,
          firstName: response.data.user.firstName,
          lastname: response.data.user.lastName,
          designation: response.data.user.staffID
            ? response.data.user.designation || "Staff"
            : "Student",
          email: response.data.user.email,
          phone_no: response.data.user.phone_no,
          address: response.data.user.address,
          locality: response.data.user.locality,
          state: response.data.user.state,
          country: response.data.user.country,
          pin: response.data.user.pincode,
          dateOfBirth: dateofbirth,
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, []);
  console.log(userDetails.firstName);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: userDetails.firstName,
      lastName: userDetails.lastname,
      email: userDetails.email,
      address: userDetails.address,
      phone_No: userDetails.phone_no,
      locality: userDetails.locality,
      state: userDetails.state,
      country: userDetails.country,
      pin: userDetails.pin,
      dateOfBirth: userDetails.dateOfBirth,
    },
    onSubmit: async (values) => {
      console.log(values);
      const response = await axios.put(
        "http://localhost:8000/api/v1/update-user-info",
        values
      );
      console.log(response.data);
      Swal.fire("Updated Successfully", "", "success");
      window.location.reload();
    },
  });

  return (
    <div className="bg-gray-200 h-screen w-screen overflow-x-hidden">
      <div className="flex flex-row">
        <div>
          <SideNav activeItemFromMain="Profile" />
        </div>
        <div>
          <Header
            userId={userDetails.userId}
            name={userDetails.firstName + " " + userDetails.lastname}
            role={userDetails.designation}
          />

          <div className="bg-white rounded-2xl w-[800px] p-10 flex flex-col translate-y-10  shadow-xl translate-x-10 justify-center items-center">
            <div>
              <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-2 gap-5 justify-center items-center">
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
                    label="Phone No:"
                    onBlur={formik.handleBlur}
                    width="w-[300px]"
                    onChange={formik.handleChange}
                    value={formik.values.phone_No}
                    error={formik.errors.phone_No}
                    touched={formik.touched.phone_No}
                  />
                  <TextInput
                    id="address"
                    label="Address:"
                    onBlur={formik.handleBlur}
                    width="w-[670px]"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                    error={formik.errors.address}
                    touched={formik.touched.address}
                  />
                  <div></div>
                  <TextInput
                    id="locality"
                    label="Locality:"
                    onBlur={formik.handleBlur}
                    width="w-[300px]"
                    onChange={formik.handleChange}
                    value={formik.values.locality}
                    error={formik.errors.locality}
                    touched={formik.touched.locality}
                  />
                  <TextInput
                    id="state"
                    label="State:"
                    onBlur={formik.handleBlur}
                    width="w-[300px]"
                    onChange={formik.handleChange}
                    value={formik.values.state}
                    error={formik.errors.state}
                    touched={formik.touched.state}
                  />
                  <TextInput
                    id="country"
                    label="Country:"
                    onBlur={formik.handleBlur}
                    width="w-[300px]"
                    onChange={formik.handleChange}
                    value={formik.values.country}
                    error={formik.errors.country}
                    touched={formik.touched.country}
                  />
                  <TextInput
                    id="pin"
                    label="Pin Code:"
                    onBlur={formik.handleBlur}
                    width="w-[300px]"
                    onChange={formik.handleChange}
                    value={formik.values.pin}
                    error={formik.errors.pin}
                    touched={formik.touched.pin}
                  />
                  <div className="mb-8">
                    <label
                      htmlFor="dob"
                      className="block text-gray-800 text-[Montserrat] font-semibold mb-1"
                    >
                      Date Of Birth
                    </label>
                    <DatePicker
                      id="dob"
                      selected={formik.values.dateOfBirth}
                      onChange={(date: Date) =>
                        formik.setFieldValue("dateOfBirth", date)
                      }
                      dateFormat="dd/MM/yyyy"
                      className="border w-[300px] border-gray-300 px-3 py-2 text-gray-900 rounded-xl focus:outline-none focus:border-[#003F8F] transition duration-500 "
                    />
                  </div>
                  <button className="bg-blue-700 w-[300px] font-[Montserrat] font-bold tex-[20px] text-white py-2 px-4 rounded hover:bg-[#003F8F]">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className=" absolute translate-x-[850px] translate-y-[-670px]">
            <div className="bg-white rounded-2xl w-fit p-10 translate-y-20  shadow-xl translate-x-10 ">
              <div className="flex flex-col justify-center items-center">
                <div className="text-[25px] font-['Montserrat'] text-zinc-800 underline font-semibold tracking-wider pb-5 uppercase">
                  Your Profile
                </div>
                <div className="text-[20px] font-['Montserrat'] text-zinc-800 font-bold">
                  {userDetails.firstName + " " + userDetails.lastname}
                </div>
                <div className="text-[15px] font-['Montserrat'] text-zinc-800 font-medium">
                  <b>ID:</b> {userDetails.userId}
                </div>
                <div className="text-[15px] font-['Montserrat'] text-zinc-800 font-medium">
                  {userDetails.designation}
                </div>
                <div className="w-[300px] h-[2px] rounded-md bg-gradient-to-l from-white via-black to-white"></div>
                <div className="flex flex-col gap-2 items-start justify-start pt-5">
                  <div className="text-[15px] font-['Montserrat'] text-zinc-800 font-medium">
                    <b>Email</b> :- {userDetails.email}
                  </div>
                  <div className="text-[15px] font-['Montserrat'] text-zinc-800 font-medium">
                    <b>Phone</b> :- {userDetails.phone_no}
                  </div>
                  <div className="text-[15px] font-['Montserrat'] text-zinc-800 font-medium">
                    <b>Address</b> :- {userDetails.address},{" "}
                    {userDetails.locality},
                    <br />
                    {userDetails.state}, {userDetails.country}, PIN :-{" "}
                    {userDetails.pin}
                  </div>
                  <div className="text-[15px] font-['Montserrat'] text-zinc-800 font-medium">
                    <b>Date Of Birth</b> :- {userDetails.dateOfBirth}
                  </div>
                </div>
              </div>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
