
import { Bg1 } from '../Images'
import { Navbar } from '../Components';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  };
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <section
      style={{ backgroundImage: `url(${Bg1})`}}
      className="w-screen h-screen overflow-hidden bg-cover bg-center "
    >


      <div className="h-screen opacity-[95%] bg-gradient-to-r from-indigo-800 via-indigo-950 to-fuchsia-950">

        <div className="items-center flex flex-col opacity-100">
          <Navbar />

          <div className="text-white font-[Montserrat] text-[50px] mt-[250px] items-center flex flex-col">
            <span className=" uppercase tracking-[10px]">Welcome to</span>
            <div>Your Ultimate Library Companion</div>
            <div className="text-[25px] mt-[30px] text-center text-gray-400">
              <p>
                Step into the future of library management with BookWiz.
                Streamline borrowing,
                <br /> explore new reads, and embark on literary adventures like
                never before.
              </p>
            </div>
            <div>
              <button
                className="bg-[#0077B6]  text-white font-[montserrat] font-semibold text-[15px] py-2 px-8 rounded-md hover:bg-[#005580]"
                onClick={handleSignup}
              >
                Get Started
              </button>
              <span className="text-[20px] p-[20px]">- Or -</span>
              <button
                className="bg-[#ffffff] text-black font-[montserrat] font-semibold text-[15px] py-2 px-8 rounded-md hover:bg-[#c5c5c5] hover:text-black"
                onClick={handleLogin}
              >
                Login Now
              </button>
            </div>
          </div>
        </div>
      </div>



    </section>
  );
};

export default LandingPage