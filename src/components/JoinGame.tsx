import useUsers from "@/hooks/useUsers";

import { RootState } from "@/redux/store";
import socket from "@/utils/socket";

import { useEffect } from "react";
import { useSelector } from "react-redux";

interface JoinGameProps {
  games: {
    id: number;
  }[];
}

export default function JoinGame() {
  const { getAllGames } = useUsers();

  const { games } = useSelector(
    (state: RootState) => state.game
  ) as JoinGameProps;

  useEffect(() => {
    socket.on("GameCreated", (data) => {
      console.log("Evento recibido: GameCreated", data);

      getAllGames();
    });

    return () => {
      socket.off("GameCreated");
    };
  }, [getAllGames]);

  useEffect(() => {
    getAllGames();
  }, [getAllGames]);

  return (
    <div className="flex flex-col gap-6 shadow-md w-1/2 h-[400px] bg-slate-100 px-4 py-6">
      <h1 className="text-xl font-bold text-gray-700">Unirse a un Juego</h1>

      {games.length > 0 ? (
        games.map(({ id }, index) => (
          <a
            key={index}
            href={`/home/game/${id}`}
            className="flex flex-col items-center justify-center w-full bg-white rounded-md cursor-pointer py-4 px-4"
          >
            <h1 className="text-blue-500 font-medium text-lg">
              Juego Numero {id}
            </h1>
          </a>
        ))
      ) : (
        <h1 className="text-xl font-medium">No hay juegos disponibles</h1>
      )}
    </div>
  );
}
