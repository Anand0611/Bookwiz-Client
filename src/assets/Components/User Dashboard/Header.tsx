

interface User {
  userId: string;
  name: string;
  role: string;
}

const Header = (props: User) => {
  return (
    <div className="bg-white shadow-md  w-[1665px] h-[100px] flex justify-between items-center">
      <div className="text-2xl font-bold"></div>
      <div className="flex items-center pr-10">
        <div className="ml-auto flex flex-col font-['Montserrat'] p-5 justify-end place-items-end">
          <div className="text-gray-900 text-[12px]">{props.userId}</div>
          <div className="text-gray-600 font-bold ">{props.name}</div>
          <div className="text-gray-600 text-[12px]">{props.role}</div>
        </div>
        <img
          className="h-16 w-16 rounded-full object-cover"
          src="https://via.placeholder.com/150"
          alt="Profile Picture"
        />
      </div>
    </div>
  );
};

export default Header