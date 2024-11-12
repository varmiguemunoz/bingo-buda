/* eslint-disable @typescript-eslint/no-explicit-any */
import BingoTable from "@/components/BingoTable";
import Spinner from "@/components/Spinner";
import { setBingoTable, setIsLoading } from "@/redux/features/gameSlice";
import { RootState } from "@/redux/store";
import { httpClient } from "@/utils/httpClient";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function Room() {
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

        console.log(request);
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
    <div className="py-16 px-16 w-full max-w-xl mx-auto h-[90vh] flex flex-col items-center justify-center">
      {isLoading ? <Spinner /> : <BingoTable numbers={bingoTable.numbers} />}
    </div>
  );
}
