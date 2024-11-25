/* eslint-disable @typescript-eslint/no-explicit-any */
import BingoTable from "@/components/BingoTable";
import Spinner from "@/components/Spinner";
import UserList from "@/components/UserList";
import { setBingoTable, setIsLoading } from "@/redux/features/gameSlice";
import { RootState } from "@/redux/store";
import { httpClient } from "@/utils/httpClient";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function Room() {
  // 1. Boton de sacar las balotas y irlas presentando en el tablero de balotas
  // 2. Boton de validar si el jugador ha ganado (bingo)
  // 3. Conectar websockets para recibir informaicion en tiempo real

  const { game, isLoading, bingoTable } = useSelector(
    (state: RootState) => state.game
  );
  const { user } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    const getTableBingo = async () => {
      try {
        dispatch(setIsLoading(true));

        const request = await httpClient.get(
          `/game/${game.id}/card/${user.id}`
        );

        dispatch(setBingoTable(request.data));
      } catch (error: any) {
        console.log(error);
        toast.error("Error al obtener la tabla de bingo: ", error.message);
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    getTableBingo();
  }, [dispatch, game.id, user.id]);

  return (
    <div className="w-full h-full py-12 flex flex-col items-center justify-center">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex items-start justify-between gap-10 w-full">
          <div className="flex flex-col items-center justify-center w-1/2 gap-5">
            <div className="px-10 py-10 bg-gray-400 rounded-md w-full">
              <h2 className="text-center font-bold text-xl text-white">B1</h2>
            </div>
            <div className="flex items-center justify-between w-full gap-8">
              <BingoTable numbers={bingoTable.numbers} />
              <button className="bg-blue-500 px-4 py-4 w-[200px] text-white font-bold rounded-md">
                Bingo
              </button>
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
