import {useContext, useEffect, useState} from "preact/hooks";
import { GamesContext } from "./GamesContext";

export const Game = () => {
  const {
    games,
    isLoading,
    loadGames,
    createGame,
    error
  } = useContext(GamesContext);

  const [game, setGame] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (game && !games.includes(game)){
      setGame(undefined);
    }
  }, [games, game]);
  
  const [newGame, setNewGame] = useState<string>("");
  const onChangeInput = (event: {currentTarget: {value: string}}) => {
    setNewGame(event.currentTarget.value || "");
  };
  const onClickCreateGame = () => {
    if (game || !newGame){
      return;
    }

    createGame(newGame);
  }

  return (
    <div>
      <h1>Games</h1>
      <button onClick={loadGames}>Load Games</button>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!error && games.map(gameName => {
        const onClick = () => setGame(gameName);
        return <p><button onClick={onClick}>{gameName}</button></p>
      })}
      {game && <p>Selected game: {game}</p>}
      {!game && (
        <div>
          <input type="text" value={newGame} onInput={onChangeInput} />
          <button onClick={onClickCreateGame}>Create Game</button>
        </div>
      )}
    </div>
  );  
}