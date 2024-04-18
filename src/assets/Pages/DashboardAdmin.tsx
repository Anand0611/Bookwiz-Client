import React from "react";
import {
  DisplayCard,
  DueList,
  Header,
  SideNav,
} from "../Components/Admin Dashboard";
import axios from "axios";

interface UserDetails {
  firstName: string;
  userId: string;
  designation: string;
  totalBookBorrowed: number;
  totalBookInHand: number;
  totalFine: string;
  duedate: string;
}
const DashboardAdmin = () => {
  const [userDetails, setUserDetails] = React.useState<UserDetails>({
    firstName: "",
    userId: "",
    designation: "",
    totalBookBorrowed: 0,
    totalBookInHand: 0,
    totalFine: "",
    duedate: "",
  });

  React.useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/me`);
        console.log(response.data.user);
        setUserDetails({
          userId: response.data.user.staffID || response.data.user.studentID,
          firstName: response.data.user.firstName,
          designation: response.data.user.staffID
            ? response.data.user.designation || "Staff"
            : "Student",
          totalBookBorrowed: response.data.user.totalnoofBooks,
          totalBookInHand: response.data.user.booksinhand,
          totalFine: response.data.user.Fineamnt,
          duedate: response.data.user.duedate,
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <div className="flex flex-row bg-gray-200 h-screen w-screen overflow-x-hidden">
      <div>
        <SideNav activeItemFromMain="Home" />
      </div>
      <div>
        <Header
          userId={userDetails.userId}
          name={userDetails.firstName}
          role={userDetails.designation}
        />
        <div className="flex flex-col items-start justify-start gap-5 p-10">
          <div>
            <span className="text-[30px] flex  font-bold font-['Montserrat']">
              Hi, {userDetails.firstName}
            </span>

            <span className="font-['Montserrat'] text-[20px]">
              Welcome Back{" "}
            </span>
          </div>

          <div>
            <DisplayCard
              totalBooksBorrowed={userDetails.totalBookInHand}
              totalBooksInHand={userDetails.totalBookInHand}
              totalFine={userDetails.totalFine}
              dueDate={userDetails.duedate}
            />
          </div>
          <div>
            <DueList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
