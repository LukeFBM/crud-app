import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex justify-center mt-5">
      <div className="flex flex-col gap-10">
        <h1 className="text-2xl text-violet-600 font-mono">
          CRUD APP by LukeFBM
        </h1>
        <button>
          <Link to={"/users"}>
            <h5 className="text-lg text-slate-950 font-primary font-bold hover:text-violet-600 transition-all duration-300">
              Users List
            </h5>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
