import Counter from "./Counter";
import UserList from "./UserList";

interface StartGameProps {
  handleStartGame: () => void;
  gameId: number;
}

function StartGame({ handleStartGame, gameId }: StartGameProps) {
  return (
    <section className="flex justify-between items-center">
      <div className="flex flex-col items-center justify-center">
        <Counter />
        <button
          className="mx-auto w-full bg-blue-500 px-3 py-4 text-white font-bold rounded-md"
          onClick={() => handleStartGame()}
        >
          Iniciar Juego
        </button>
      </div>

      <UserList gameId={gameId} />
    </section>
  );
}

export default StartGame;
