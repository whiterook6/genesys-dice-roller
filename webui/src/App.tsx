import { Component } from "preact";

interface State {
  connected: boolean;
  game?: string;
  events: any[];
}

export class App extends Component<any, State> {
  events: EventSource;
  state = {
    connected: false,
    events: []
  };

  

  render() {
    return (
      <div>
        <h1>Games</h1>
        
      </div>
    );
  }
}