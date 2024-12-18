/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  setIsJoin,
  setIsLoading,
  setAllGames,
  setUsers,
  setGame,
  setBingoTable,
  setBingoBalls,
} from "@/redux/features/gameSlice";
import { RootState } from "@/redux/store";
import { httpClient } from "@/utils/httpClient";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCallback } from "react";

const useUsers = () => {
  const { game, isJoin, isLoading, users } = useSelector(
    (state: RootState) => state.game
  );

  const { user } = useSelector((state: RootState) => state.auth) as {
    user: { id: number };
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const currentUser = sessionStorage.getItem("user");

  const handleJoinGame = async (gameId: number, userId: number) => {
    try {
      dispatch(setIsLoading(true));

      const response = await httpClient.post(`/game/${gameId}/join/${userId}`);

      dispatch(setIsJoin(true));
      dispatch(setGame(response.data));

      toast.success("Unido exitosamente a la partida");
    } catch (error: any) {
      toast.error("Error al unirse a la partida");
      throw error;
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleStartGame = async (gameId: number) => {
    try {
      dispatch(setIsLoading(true));
      const response = await httpClient.post(`/game/${gameId}/start`);

      const { rooms } = response.data;
      const roomId = rooms[0].id;

      dispatch(setGame(response.data));

      navigate(`/home/game/${gameId}/room/${roomId}`);

      toast.success("Juego iniciado");
    } catch (error: any) {
      toast.error("Error al iniciar el juego");
      throw error;
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleDrawBallot = async (gameId: number) => {
    try {
      return await httpClient.patch(`/game/${gameId}/draw-ball`);
    } catch (error) {
      toast.error("Error al sacar la balota");
      throw error;
    }
  };

  const getAllGames = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const games = await httpClient.get("/game");
      dispatch(setAllGames(games.data));
    } catch (error: any) {
      toast.error("Error al cargar las partidas: ", error.message);
      throw error;
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  const getUsersInGame = useCallback(
    async (gameId: number | string) => {
      try {
        const users = await httpClient.get(`/game/${gameId}/users`);
        dispatch(setUsers(users.data));
      } catch (error) {
        toast.error("Error al cargar los usuarios");
        throw error;
      }
    },
    [dispatch]
  );

  const getTableBingo = useCallback(
    async (gameId: number | string, userId: number) => {
      try {
        const request = await httpClient.get(`/game/${gameId}/card/${userId}`);

        dispatch(setBingoTable(request.data));

        toast.success("Tabla de bingo generada");
      } catch (error: any) {
        toast.error("Error al obtener la tabla de bingo");
        throw error;
      }
    },
    [dispatch]
  );

  const getBingoBalls = useCallback(
    async (gameId: number | string) => {
      try {
        const request = await httpClient.get(`/game/${gameId}/bingo-balls`);

        dispatch(setBingoBalls(request.data));
      } catch (error) {
        toast.error("Error al obtener los numeros del bingo");
        throw error;
      }
    },
    [dispatch]
  );

  return {
    currentUser,
    user,
    dispatch,
    handleJoinGame,
    handleStartGame,
    getAllGames,
    getUsersInGame,
    handleDrawBallot,
    getTableBingo,
    getBingoBalls,
    navigate,
    isJoin,
    isLoading,
    game,
    users,
  };
};

export default useUsers;
