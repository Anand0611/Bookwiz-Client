import React from "react";
import { Header, SideNav } from "../Components/Admin Dashboard";
import axios from "axios";
import { TextInput } from "../Components/Input Components";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineSearch } from "react-icons/ai";

interface UserDetails {
  firstName: string;
  lastname: string;
  userId: string;
  designation: string;
}

interface BookDetails {
  title: string;
  author: string;
  volume: number;
  edition: number;
  publishedYear: number;
  publisher: string;
  description: string;
  isbn: string;
  pages: number;
  price: number;
  docType: string;
  copy: number;
}
const Editbook = () => {
  const [bookDetails, setBookDetials] = React.useState<BookDetails>({
    title: "",
    author: "",
    volume: 0,
    edition: 0,
    publishedYear: 0,
    publisher: "",
    description: "",
    isbn: "",
    pages: 0,
    price: 0,
    docType: "",
    copy: 0,
  });
  const [userDetails, setUserDetails] = React.useState<UserDetails>({
    firstName: "Anand",
    userId: "INMCA",
    designation: "Teacher",
    lastname: "",
  });
  React.useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/me`);
        setUserDetails({
          userId: response.data.user.staffID || response.data.user.studentID,
          firstName: response.data.user.firstName,
          lastname: response.data.user.lastName,
          designation: response.data.user.role,
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, []);
  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      volume: 0,
      edition: 0,
      publishedYear: 0,
      publisher: "",
      description: "",
      isbn: "",
      pages: 0,
      price: 0,
      docType: "",
      ddcClass: "",
      copy: 0,
    },
    onSubmit: async (values) => {
      
      const response = await axios.post(
        "http://localhost:8000/api/v1/add-books",
        values
      );
      setBookDetials(values);
      console.log(response.status);
      if (response.status == 400) {
        Swal.fire("Book already exists", "", "error");
      }
      Swal.fire("Book added successfully", "", "success");
    },
  });

  return (
    <div className="bg-gray-200 h-screen w-screen overflow-x-hidden">
      <div className="flex flex-row">
        <div>
          <SideNav activeItemFromMain="Create New Book" />
        </div>
        <div className="flex flex-col items-center">
          <Header
            userId={userDetails.userId}
            name={userDetails.firstName + " " + userDetails.lastname}
            role={userDetails.designation}
          />

            <div className="flex justify-center bg-white w-fit  rounded-2xl items-center p-5 mt-5 ">
              <input
                type="text"
                placeholder="Search for a book..."
                className="border-2 border-gray-300 px-4 py-2 w-[800px] h-[50px] rounded-lg focus:outline-none focus:border-[#003F8F] transition duration-500"
                onChange={(event) => {
                  formik.setFieldValue("search", event.target.value);
                }}
              />
              <AiOutlineSearch className="text-[30px] text-gray-600 absolute translate-x-[360px]" onClick={() => handleSearch()}/>


            
          </div>
        </div>
      </div>
    </div>
  );
};
export default Editbook;
