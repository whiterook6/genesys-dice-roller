import { useContext, useState } from "preact/hooks";
import { GamesContext } from "./GamesContext";

enum View {
  BROWSE,
  CREATE,
};

interface Props {
  onJoin: (name: string) => void;
  onCreate: (name: string) => void;
}

export const Lobby = ({onJoin, onCreate}: Props) => {
  const {games, isLoading, loadGames, error} = useContext(GamesContext);

  const [newName, setNewName] = useState<string>("");
  const onNewNameInput = (e: {currentTarget: {value: string}}) => setNewName(e.currentTarget.value);
  const canCreate = !isLoading && newName.length > 0 && !games.includes(newName);
  const onCreateClick = () => onCreate(newName);
  
  const [view, setView] = useState<View>(View.BROWSE);
  const setJoinView = () => setView(View.BROWSE);
  const setCreateView = () => setView(View.CREATE);

  return (
    <div>
      <h1>Lobby</h1>
      <div>
        <button onClick={setJoinView}>Browse Games</button>
        <button onClick={setCreateView}>Create Game</button>
      </div>
      {view === View.BROWSE && (
        <div>
          <button onClick={loadGames}>Refresh</button>
          {isLoading && <div>Loading...</div>}
          {error && <div>Error: {error}</div>}
          <ul>
            {games.map((name) => (
              <li key={name}>
                <button onClick={() => onJoin(name)}>{name}</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {view === View.CREATE && (
        <div>
          <input type="text" value={newName} onInput={onNewNameInput} />
          <button onClick={onCreateClick} disabled={!canCreate}>Create</button>
        </div>
      )}
    </div>
  )
}