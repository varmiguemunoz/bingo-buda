import { setBingoBalls } from "@/redux/features/gameSlice";
import { RootState } from "@/redux/store";
import { httpClient } from "@/utils/httpClient";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

function ShowBall() {
  const { id } = useParams() as { id: string };

  const { bingoBalls } = useSelector((state: RootState) => state.game);

  const dispatch = useDispatch();

  useEffect(() => {
    const getBingoBalls = async () => {
      try {
        const request = await httpClient.get(`/game/${id}/bingo-balls`);

        dispatch(setBingoBalls(request.data));
      } catch (error) {
        toast.error("Error al obtener los numeros del bingo ");
        throw error;
      }
    };

    getBingoBalls();
  }, [dispatch, id]);

  console.log(bingoBalls);

  return (
    <div className="px-10 py-10 bg-gray-400 rounded-md w-full">
      {Array.isArray(bingoBalls) && bingoBalls.length > 0 ? (
        bingoBalls.map((item, index) => (
          <h2 className="text-center font-bold text-xl text-white" key={index}>
            {item}
          </h2>
        ))
      ) : (
        <h2 className="text-center font-bold text-xl text-white">
          No hay números disponibles.
        </h2>
      )}
    </div>
  );
}

export default ShowBall;
