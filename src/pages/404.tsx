import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen">
      <div className="my-auto mx-auto h-full w-[500px] flex flex-col items-center justify-center">
        <h2 className="text-7xl font-bold text-darkGray">ERROR</h2>
        <p className="text-9xl font-bold text-basePurple">404</p>
        <p className="text-xl font-light text-darkGray text-center mb-4">
          Estamos trabajando para solucionarlo en el menor tiempo posible.
        </p>
        <div className="w-1/3 mx-auto flex flex-col items-center justify-center">
          <button
            className="bg-blue-500 text-white rounded-md px-4 py-2 font-bold"
            id="back-to-home"
            onClick={() => {
              navigate(-1);
            }}
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
