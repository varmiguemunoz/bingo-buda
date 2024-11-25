/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  setIsJoin,
  setIsLoading,
  setAllGames,
  setUsers,
  setGame,
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

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const currentUser = sessionStorage.getItem("user");

  const handleJoinGame = async (gameId: number, userId: number) => {
    try {
      dispatch(setIsLoading(true));

      await httpClient.post(`/game/${gameId}/join/${userId}`);

      dispatch(setIsJoin(true));

      toast.success("Unido exitosamente a la partida");
    } catch (error: any) {
      toast.error("Error al unirse a la partida: ", error.message);
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

      toast.success("Juego iniciado exitosamente");
    } catch (error: any) {
      toast.error("Error al iniciar el juego: ", error.message);
    } finally {
      dispatch(setIsLoading(false));
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
      } catch (error: any) {
        toast.error("Error al cargar los usuarios: ", error.message);
        throw error;
      }
    },
    [dispatch]
  );

  return {
    currentUser,
    dispatch,
    handleJoinGame,
    handleStartGame,
    getAllGames,
    getUsersInGame,
    isJoin,
    isLoading,
    game,
    users,
  };
};

export default useUsers;
