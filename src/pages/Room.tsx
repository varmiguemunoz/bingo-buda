import BingoTable from "@/components/BingoTable";
import ShowBall from "@/components/ShowBall";
import Spinner from "@/components/Spinner";
import UserList from "@/components/UserList";
import useUsers from "@/hooks/useUsers";
import { RootState } from "@/redux/store";
import { httpClient } from "@/utils/httpClient";
import socket from "@/utils/socket";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default function Room() {
  const { game, isLoading, bingoTable } = useSelector(
    (state: RootState) => state.game
  );
  const { user } = useSelector((state: RootState) => state.auth);

  const { handleDrawBallot, getTableBingo, navigate } = useUsers();

  const isHostUser =
    Array.isArray(game.players) && game.players.length > 0
      ? game.players[0].id === user.id
      : false;

  useEffect(() => {
    getTableBingo(game.id, user.id);
  }, [game.id, getTableBingo, user.id]);

  const handleBingo = async () => {
    try {
      const checkBingo = await httpClient.get(
        `/game/${game.id}/check-bingo/${user.id}`
      );

      return checkBingo;
    } catch (error) {
      toast.error("Error al hacer el bingo");
      throw error;
    }
  };

  useEffect(() => {
    socket.on("not-bingo", (data) => {
      console.log("Evento recibido: not-bingo", data);

      toast.error("Un usuario intento hacer bingo sin ganar el juego 🫢");
      navigate("/home/dashboard");
    });
    return () => {
      socket.off("not-bingo");
    };
  }, [navigate]);

  useEffect(() => {
    socket.on("game-winner", (data) => {
      console.log("Evento recibido: game-winner", data);

      toast.success("El ganador es: " + { data });
      navigate("/home/dahsboard");
    });
    return () => {
      socket.off("game-winner");
    };
  }, [navigate]);

  return (
    <div className="w-full h-full py-12 flex flex-col items-center justify-center">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex items-start justify-between gap-10 w-full">
          <div className="flex flex-col items-center justify-center w-1/2 gap-5">
            <ShowBall />
            <div className="flex items-center justify-between w-full gap-8">
              <BingoTable numbers={bingoTable.numbers} />
              <div className="flex flex-col gap-10">
                {isHostUser && (
                  <button
                    className="bg-blue-500 px-4 py-4 w-[200px] text-white font-bold rounded-md"
                    onClick={() => handleDrawBallot(game.id)}
                  >
                    Sacar Balota
                  </button>
                )}

                <button
                  className="bg-blue-500 px-4 py-4 w-[200px] text-white font-bold rounded-md"
                  onClick={handleBingo}
                >
                  Bingo
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8 w-1/2">
            <UserList />

            <a href="https://www.varmiguemunoz.dev/">
              <div
                className="rounded-md w-full bg-blue-300 px-8 py-16"
                style={{
                  backgroundSize: "cover",
                  backgroundPosition: "right top",
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url("https://res.cloudinary.com/dy7kvvzgj/image/upload/v1732515148/EL_MIGUEL_pxiiij.png")`,
                }}
              >
                <h1 className="text-white font-bold text-2xl">
                  @varmiguemunoz
                </h1>
              </div>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
