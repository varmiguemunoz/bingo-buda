import useUsers from "@/hooks/useUsers";
import { RootState } from "@/redux/store";
import socket from "@/utils/socket";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function ShowBall() {
  const { id } = useParams() as { id: string };

  const { bingoBalls } = useSelector((state: RootState) => state.game);

  const { getBingoBalls } = useUsers();

  useEffect(() => {
    getBingoBalls(id);
  }, [getBingoBalls, id]);

  useEffect(() => {
    socket.on("ball-drawn", (data) => {
      console.log("Evento recibido: ball-drawn", data);

      getBingoBalls(id);
    });

    return () => {
      socket.off("ball-drawn");
    };
  }, [getBingoBalls, id]);

  return (
    <div className="px-10 py-10 bg-gray-400 rounded-md w-full flex items-center justify-center gap-4">
      {Array.isArray(bingoBalls) && bingoBalls.length > 0 ? (
        bingoBalls.map((item, index) => (
          <div key={index}>
            <h2 className="text-center font-bold text-xl text-white">{item}</h2>
          </div>
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
