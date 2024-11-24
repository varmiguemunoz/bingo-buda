import useUsers from "@/hooks/useUsers";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function UserList({ gameId }: { gameId: number }) {
  const { dispatch, getUsersInGame } = useUsers();

  const { users } = useSelector((state: RootState) => state.game);

  useEffect(() => {
    getUsersInGame(gameId);
  }, [dispatch, getUsersInGame, gameId]);

  return (
    <div className="flex flex-col gap-6 shadow-md w-1/2 h-[400px] bg-slate-100 px-4 py-6">
      <h1 className="text-xl font-bold text-gray-700">Unirse a un Juego</h1>

      {users.length > 0 ? (
        users.map(() => (
          <a
            href={`/home/game/`}
            className="flex flex-col items-center justify-center w-full bg-white rounded-md cursor-pointer py-4 px-4"
          >
            <h1 className="text-blue-500 font-medium text-lg">Juego Numero</h1>
          </a>
        ))
      ) : (
        <h1 className="text-xl font-medium">No hay jugadores en la partida</h1>
      )}
    </div>
  );
}
