/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from "@/redux/store";
import { httpClient } from "@/utils/httpClient";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { setGame, setIsJoin, setIsLoading } from "@/redux/features/gameSlice";
import Counter from "@/components/Counter";
import Spinner from "@/components/Spinner";

export default function Game() {
  //03. componente que muestra el numero de jugadores en la sala

  const navigate = useNavigate();

  const { game, isJoin, isLoading } = useSelector(
    (state: RootState) => state.game
  );
  const { user } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  const handleJoinGame = async () => {
    try {
      dispatch(setIsLoading(true));

      const request = await httpClient.post(`/game/${game.id}/join/${user.id}`);

      dispatch(setIsJoin(true));

      dispatch(setGame(request.data));

      toast.success("Unido exitosamente a la partida");
    } catch (error: any) {
      console.log(error);
      toast.error("Error al unirse a la partida: ", error.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleStartGame = async () => {
    try {
      const request = await httpClient.post(`/game/${game.id}/start`);

      dispatch(setGame(request.data));

      navigate("/home/room");

      toast.success("Juego iniciado exitosamente");
    } catch (error: any) {
      toast.error("Error al iniciar el juego: ", error.message);
    }
  };

  return (
    <div className="py-16 px-16 w-full max-w-xl mx-auto h-[90vh] flex flex-col items-center justify-center">
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <Counter />

          {isJoin ? (
            <button
              className="mx-auto w-full bg-blue-500 px-3 py-4 text-white font-bold rounded-md"
              onClick={handleStartGame}
            >
              Iniciar Juego
            </button>
          ) : (
            <button
              className="mx-auto w-full bg-blue-500 px-3 py-4 text-white font-bold rounded-md"
              onClick={handleJoinGame}
            >
              Unirse a la partida
            </button>
          )}
        </div>
      )}
    </div>
  );
}
