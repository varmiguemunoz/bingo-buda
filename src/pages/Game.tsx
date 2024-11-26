import { RootState } from "@/redux/store";
import useUsers from "@/hooks/useUsers";
import Spinner from "@/components/Spinner";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Counter from "@/components/Counter";
import UserList from "@/components/UserList";

export default function Game() {
  const { id } = useParams() as { id: string };

  const { handleJoinGame, handleStartGame, isJoin, isLoading } = useUsers();

  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="w-full ">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          {isJoin ? (
            <section className="flex justify-between items-center w-full ">
              <div className="flex flex-col items-center justify-center w-1/2">
                <Counter gameId={id} />
                <button
                  className="w-[300px] bg-blue-500 px-3 py-4 text-white font-bold rounded-md"
                  onClick={() => handleStartGame(parseInt(id))}
                >
                  Iniciar Juego
                </button>
              </div>
              <div className="w-1/2">
                <UserList />
              </div>
            </section>
          ) : (
            <button
              className="w-[300px] bg-blue-500 px-3 py-4 text-white font-bold rounded-md"
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
