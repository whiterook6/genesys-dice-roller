import { Game } from "./Game";
import { GamesProvider } from "./GamesContext";

export const App = () => (
  <GamesProvider>
    <Game />
  </GamesProvider>
);