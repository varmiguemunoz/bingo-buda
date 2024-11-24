import { RootState } from "@/redux/store";
import useUsers from "@/hooks/useUsers";
import Spinner from "@/components/Spinner";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import StartGame from "@/components/StartGame";

export default function Game() {
  // 03. componente que muestra el numero de jugadores en la sala

  const { id } = useParams();

  const { handleJoinGame, handleStartGame, isJoin, isLoading } = useUsers();

  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="py-16 px-16 w-full max-w-xl mx-auto h-full flex flex-col items-center justify-center">
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          {isJoin ? (
            <StartGame
              handleStartGame={() => handleStartGame(parseInt(id))}
              gameId={parseInt(id)}
            />
          ) : (
            <button
              className="mx-auto w-full bg-blue-500 px-3 py-4 text-white font-bold rounded-md"
              onClick={() => handleJoinGame(parseInt(id), user.id)}
            >
              Unirse a la partida
            </button>
          )}
        </div>
      )}
    </div>
  );
}
