import { GamesProvider } from "./GamesContext";
import { Lobby } from "./Lobby";

export const App = () => (
  <GamesProvider>
    <Lobby onCreate={() => {}} onJoin={() => {}} />
  </GamesProvider>
);