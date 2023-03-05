import { Game } from "./Game";
import { GamesProvider } from "./GamesContext";
import { Lobby } from "./Lobby";

export const App = () => (
  <GamesProvider>
    <Game />
  </GamesProvider>
);