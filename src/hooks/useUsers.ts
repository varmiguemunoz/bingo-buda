/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  setIsJoin,
  setIsLoading,
  setAllGames,
  setUsers,
} from "@/redux/features/gameSlice";
import { RootState } from "@/redux/store";
import { httpClient } from "@/utils/httpClient";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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
      await httpClient.post(`/game/${gameId}/start`);

      navigate("/home/room");

      toast.success("Juego iniciado exitosamente");
    } catch (error: any) {
      toast.error("Error al iniciar el juego: ", error.message);
    }
  };

  const getAllGames = async () => {
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
  };

  const getUsersInGame = async (gameId: number) => {
    try {
      dispatch(setIsLoading(true));
      const users = await httpClient.get(`/game/${gameId}/users`);
      dispatch(setUsers(users.data));
    } catch (error: any) {
      toast.error("Error al cargar las partidas: ", error.message);
      throw error;
    } finally {
      dispatch(setIsLoading(false));
    }
  };

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
