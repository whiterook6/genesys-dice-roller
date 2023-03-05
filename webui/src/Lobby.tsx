import { useContext, useState } from "preact/hooks";
import { AutoHeight } from "./components/AutoHeight";
import { GamesContext } from "./GamesContext";

enum View {
  BROWSE,
  CREATE,
};

interface Props {
  onJoin: (game: string) => void;
  onCreate: (game: string) => void;
}

interface State {
  newGameName: string;
}

export const Lobby = ({onJoin, onCreate}: Props) => {
  const {games, isLoading, loadGames, error} = useContext(GamesContext);
  const [{newGameName}, setState] = useState<State>({
    newGameName: ""
  });
  
  const [view, setView] = useState<View>(View.BROWSE);
  const setJoinView = () => setView(View.BROWSE);
  const setCreateView = () => setView(View.CREATE);

  const onNewGameNameInput = (e: {currentTarget: {value: string}}) => {
    setState(oldState => {
      return {
        ...oldState,
        newGameName: e.currentTarget.value
      }
    })
  };
  const canCreate = !isLoading
    && newGameName.length > 0
    && !games.includes(newGameName);
  const onCreateClick = () => {
    if (canCreate){
      onCreate(newGameName);
    }
  };

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
                {games.length === 0 && <div>No games found. Create one?</div>}
                {games.length > 0 && (
                  <table class="table is-striped is-hoverable is-fullwidth">
                    <colgroup>
                      <col width="100%" />
                      <col />
                    </colgroup>
                    <thead>
                      <tr>
                        <th colSpan={2}>Games</th>
                      </tr>
                    </thead>
                    <tbody>
                      {games.map((game, index) => (
                        <tr key={`${index}-${game}`}>
                          <td>{game}</td>
                          <td>
                            <button class="button is-primary" onClick={() => onJoin(game)}>
                              Join
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
            {view === View.CREATE && (
              <>
                <div class="field is-grouped">
                  <div class="control is-expanded">
                    <input class="input" type="text" value={newGameName} onInput={onNewGameNameInput} placeholder="Game Name" />
                  </div>
                  <div class="control">
                    <button class="button is-primary" onClick={onCreateClick} disabled={!canCreate}>
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