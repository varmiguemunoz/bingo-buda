import useUsers from "@/hooks/useUsers";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

interface UserListProps {
  users: {
    id: number;
  }[];
}

export default function UserList() {
  const { id } = useParams() as { id: string };
  const { getUsersInGame } = useUsers();

  const { users } = useSelector(
    (state: RootState) => state.game
  ) as UserListProps;

  useEffect(() => {
    getUsersInGame(id);
  }, [getUsersInGame, id]);

  return (
    <div className="flex flex-col gap-6 shadow-md w-full h-[400px] bg-slate-100 px-4 py-6">
      <h1 className="text-xl font-bold text-gray-700">Lista de Jugadores</h1>

      {users.length > 0 ? (
        users.map(({ id }, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center w-full bg-white rounded-md cursor-pointer py-4 px-4"
          >
            <h1 className="text-blue-500 font-medium text-lg">
              Jugador Numero {id}
            </h1>
          </div>
        ))
      ) : (
        <h1 className="text-xl font-medium">No hay jugadores en la partida</h1>
      )}
    </div>
  );
}
