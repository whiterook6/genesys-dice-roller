import { Component, createContext } from "preact";
import { listGames, createGame } from "./controller";

interface IGamesContext {
  games: string[];
  loadGames: () => Promise<string[]>;
  createGame: (name: string) => Promise<void>;
  isLoading: boolean;
  error?: Error;
  promise?: Promise<string[]>;
}

export const GamesContext = createContext<IGamesContext>({
  games: [],
  loadGames: async () => Promise.resolve([]),
  createGame: async () => Promise.resolve(),
  isLoading: false,
});

export class GamesProvider extends Component<any, IGamesContext>{
  private isMounted = false;
  constructor(){
    super();
    this.state = {
      games: [],
      loadGames: this.loadGames.bind(this),
      createGame: this.createGame.bind(this),
      isLoading: false,
    }
  }

  public componentDidMount(): void {
    this.isMounted = true;
    this.loadGames();
  }

  public componentWillUnmount(): void {
    this.isMounted = false;
  }

  public loadGames = async () => {
    const {isLoading} = this.state;
    if (isLoading){
      return;
    }

    const promise = listGames();
    this.setState({
      isLoading: true,
      promise
    });

    let games: string[];
    try {
      games = await promise;
    } catch (error) {
      if (this.isMounted){
        this.setState({
          error,
          isLoading: false,
        });
      }
      return;
    }

    if (this.isMounted){
      this.setState({
        error: undefined,
        games,
        isLoading: false,
      });
    }

    return games;
  }

  public createGame = async (name: string) => {
    if (this.state.isLoading){
      return;
    }

    const {games} = this.state;
    if (games.includes(name)){
      return;
    }

    await createGame(name);
    return this.loadGames();
  }
  
  public render(){
    return (
      <GamesContext.Provider value={this.state}>
        {this.props.children}
      </GamesContext.Provider>
    );
  }
}