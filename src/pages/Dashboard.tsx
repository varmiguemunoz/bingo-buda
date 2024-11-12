/* eslint-disable @typescript-eslint/no-explicit-any */
import { setGame } from "@/redux/features/gameSlice";
import { httpClient } from "@/utils/httpClient";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Dashboard() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const StartGame = async () => {
    try {
      const request = await httpClient.post("/game");

      console.log(request);

      dispatch(setGame(request.data));
      navigate("/home/game");
      toast.success("Juego iniciado exitosamente");
    } catch (error: any) {
      toast.error("Error al iniciar el juego: ", error.message);
    }
  };

  return (
    <div className="py-16 px-16 w-full max-w-xl mx-auto h-[80vh] flex flex-col items-center justify-center">
      <button
        className="mx-auto w-full bg-blue-500 px-3 py-4 text-white font-bold rounded-md"
        onClick={StartGame}
      >
        Crear Juego
      </button>
    </div>
  );
}
