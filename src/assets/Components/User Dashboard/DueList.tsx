import React, { useState } from "react";


interface Duelist {
  id: number;
  bookTitle: string;
  borrow_date: string;
  due_date: string;
}

const DueList: React.FC = () => {
  const [dueList] = useState<Duelist[]>([]);

  // useEffect(() => {
  //   const fetchDueList = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3001/api/dueList");
  //       const data = await response.json();
  //       setDueList(data);
  //     } catch (error) {
  //       console.error("Error fetching due list:", error);
  //     }
  //   };
  //   fetchDueList();
  // }, []);

  return (
    <div>
      <div className="text-[25px] font-['Montserrat']  pb-10 pt-4  underline underline-offset-auto text-zinc-800 font-medium">
        Your Borrows{" "}
      </div>

      <div className="bg-white rounded w-[1414px] p-2 mt-2 shadow-sm">
        <div>
          <table className=" table-fixed flex-col   w-full ">
            <thead>
              <tr>
                <th className="px-4 py-2">Id</th>
                <th className="px-4 py-2">Book Title</th>
                <th className="px-4 py-2">Borrowed On</th>
                <th className="px-4 py-2">Due Date</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {dueList.map((due) => (
                <tr key={due.id}>
                  <td className="border px-4 py-2">{due.id}</td>
                  <td className="border px-4 py-2">{due.bookTitle}</td>
                  <td className="border px-4 py-2">{due.borrow_date}</td>
                  <td className="border px-4 py-2">{due.due_date}</td>
                  <td className="border px-4 py-2">
                    <div>
                      <button></button>
                    </div>
                  </td>
                </tr>
              ))}
              <tr className=" text-center">
                <td className="border px-4 py-2">25</td>
                <td className="border px-4 py-2">
                  Harry Potter: The Sorcerer's Stone Vol 32
                </td>
                <td className="border px-4 py-2">26/6/2023</td>
                <td className="border px-4 py-2">3/7/2023</td>
                <td className="border px-4 py-2">
                  <div className="flex flex-row gap-5 justify-center">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      {" "}
                      Return
                    </button>
                    <button className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      {" "}
                      Renew
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DueList;
