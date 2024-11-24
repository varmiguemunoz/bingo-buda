/* eslint-disable @typescript-eslint/no-explicit-any */
import JoinGame from "@/components/JoinGame";
import { setGame, setIsLoading } from "@/redux/features/gameSlice";
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

      dispatch(setGame(request.data));

      navigate(`/home/game/${request.data.id}`); // pagina dinamica

      toast.success("Juego iniciado exitosamente");
    } catch (error: any) {
      toast.error("Error al iniciar el juego: ", error.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <div className="py-16 px-16 max-w-[1250px] mx-auto h-full w-full flex flex-col justify-center items-center">
      <div className="flex justify-between items-center h-full w-full gap-10">
        <div className="w-1/2">
          <button
            className="mx-auto w-full bg-blue-500 px-3 py-4 text-white font-bold rounded-md"
            onClick={StartGame}
          >
            Crear Juego
          </button>
        </div>

        <JoinGame />
      </div>
    </div>
  );
}
