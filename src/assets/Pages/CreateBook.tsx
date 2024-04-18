import React from "react";
import { Header, SideNav } from "../Components/Admin Dashboard";
import axios from "axios";
import { TextInput } from "../Components/Input Components";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";

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
const CreateBook = () => {
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

          <div className="bg-white rounded-2xl w-[1000px]  p-10 flex flex-col translate-y-10  shadow-xl translate-x-10 justify-center items-center">
            <div>
              <form onSubmit={formik.handleSubmit} method="POST">
                <div className="grid grid-cols-3 gap-10 col-auto justify-center items-center">
                  <TextInput
                    id="ddcClass"
                    label="DDC Classification Code:"
                    onBlur={formik.handleBlur}
                    width="w-[300px]"
                    onChange={formik.handleChange}
                    value={formik.values.ddcClass}
                    error={formik.errors.ddcClass}
                    touched={formik.touched.ddcClass}
                  />
                  <TextInput
                    id="isbn"
                    label="ISBN:"
                    onBlur={formik.handleBlur}
                    width="w-[300px]"
                    onChange={formik.handleChange}
                    value={formik.values.isbn}
                    error={formik.errors.isbn}
                    touched={formik.touched.isbn}
                  />
                  <TextInput
                    id="title"
                    label="Book Title:"
                    onBlur={formik.handleBlur}
                    width="w-[300px]"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    error={formik.errors.title}
                    touched={formik.touched.title}
                  />
                  <TextInput
                    id="author"
                    label="Author Name:"
                    onBlur={formik.handleBlur}
                    width="w-[300px]"
                    onChange={formik.handleChange}
                    value={formik.values.author}
                    error={formik.errors.author}
                    touched={formik.touched.author}
                  />
                  <TextInput
                    id="publisher"
                    label="Publisher Name:"
                    onBlur={formik.handleBlur}
                    width="w-[300px]"
                    onChange={formik.handleChange}
                    value={formik.values.publisher}
                    error={formik.errors.publisher}
                    touched={formik.touched.publisher}
                  />

                  <TextInput
                    id="publishedYear"
                    label="Publishing Year:"
                    onBlur={formik.handleBlur}
                    width="w-[300px]"
                    onChange={formik.handleChange}
                    value={formik.values.publishedYear}
                    error={formik.errors.publishedYear}
                    touched={formik.touched.publishedYear}
                  />
                  <TextInput
                    id="description"
                    label="Description:"
                    onBlur={formik.handleBlur}
                    width="w-[300px]"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    error={formik.errors.description}
                    touched={formik.touched.description}
                  />
                  <TextInput
                    id="volume"
                    label="Volume:"
                    onBlur={formik.handleBlur}
                    width="w-[300px]"
                    onChange={formik.handleChange}
                    value={formik.values.volume}
                    error={formik.errors.volume}
                    touched={formik.touched.volume}
                  />
                  <TextInput
                    id="edition"
                    label="Edition:"
                    onBlur={formik.handleBlur}
                    width="w-[300px]"
                    onChange={formik.handleChange}
                    value={formik.values.edition}
                    error={formik.errors.edition}
                    touched={formik.touched.edition}
                  />
                  <TextInput
                    id="pages"
                    label="Total Pages:"
                    onBlur={formik.handleBlur}
                    width="w-[300px]"
                    onChange={formik.handleChange}
                    value={formik.values.pages}
                    error={formik.errors.pages}
                    touched={formik.touched.pages}
                  />
                  <TextInput
                    id="price"
                    label="Cost Price:"
                    onBlur={formik.handleBlur}
                    width="w-[300px]"
                    onChange={formik.handleChange}
                    value={formik.values.price}
                    error={formik.errors.price}
                    touched={formik.touched.price}
                  />
                  <TextInput
                    id="copy"
                    label="No of Copies:"
                    onBlur={formik.handleBlur}
                    width="w-[300px]"
                    onChange={formik.handleChange}
                    value={formik.values.copy}
                    error={formik.errors.copy}
                    touched={formik.touched.copy}
                  />
                  <div></div>
                  <button className="bg-blue-700 w-[300px] font-[Montserrat] font-bold tex-[20px] text-white py-2 px-4 rounded hover:bg-[#003F8F]">
                    Add Book
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateBook;
