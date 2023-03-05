import { useContext, useState } from "preact/hooks";
import { AutoHeight } from "./components/AutoHeight";
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
    <div class="section">
      <div class="container">
        <div class="box">
          <AutoHeight>
            <div class="tabs">
              <ul>
                <li class={view === View.BROWSE ? "is-active" : ""} onClick={setJoinView}>
                  <a>Join Game</a>
                </li>
                <li class={view === View.CREATE ? "is-active" : ""} onClick={setCreateView}>
                  <a>Create Game</a>
                </li>
              </ul>
            </div>
            {view === View.BROWSE && (
              <>
                <button class={isLoading ? "button is-loading" : "button"} disabled={isLoading} onClick={loadGames}>Refresh</button>
                {error && <div>Error: {error}</div>}
                <ul>
                  {games.map((name) => (
                    <li key={name}>
                      <button class="button" onClick={() => onJoin(name)}>{name}</button>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {view === View.CREATE && (
              <>
                <div class="field is-grouped">
                  <div class="control is-expanded">
                    <input class="input" type="text" value={newName} onInput={onNewNameInput} placeholder="Game Name" />
                  </div>
                  <div class="control">
                    <button class="button" onClick={onCreateClick} disabled={!canCreate}>
                      Create
                    </button>
                  </div>
                </div>
              </>
            )}
          </AutoHeight>
        </div>
      </div>
    </div>
  )
}