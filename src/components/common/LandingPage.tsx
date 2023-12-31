import { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) return <Loading />;
  return (
    <div className="flex justify-center mt-5">
      <div className="flex flex-col gap-10">
        <h1 className="text-2xl text-violet-600 font-mono font-bold">
          CRUD APP by LukeFBM
        </h1>
        <button>
          <Link to={"/users"}>
            <h5 className="text-lg text-slate-950 font-primary font-semibold hover:text-red-600 transition-all duration-300">
              Users List
            </h5>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
