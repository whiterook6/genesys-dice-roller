import { Component, createContext } from "preact";

interface IServerEventsContext {
  events: any[];
  clearEvents: () => void;
  error?: Error;
}

export const ServerEventsContext = createContext<IServerEventsContext>({
  events: [],
  clearEvents: () => {},
});

interface Props {
  game: string;
}

interface State {
  events: any[];
  error?: Error;
}

export class ServerEventsProvider extends Component<Props, State> {
  eventSource: EventSource;
  constructor(props: Props){
    super(props);
    this.state = {
      events: []
    };

    this.eventSource = new EventSource(`/api/game/${props.game}/events`);
    this.addListener();
  }

  componentDidUpdate(previousProps: Readonly<Props>): void {
    if (previousProps.game !== this.props.game) {
      this.eventSource.close();
      this.eventSource = new EventSource(`/api/game/${this.props.game}/events`);
      this.setState({
        events: []
      });
      this.addListener();
    }    
  }

  public addListener = () => {
    if (!this.eventSource){
      return;
    }

    if (!this.eventSource.OPEN){
      return;
    }
    
    this.eventSource.onmessage = (message) => {
      this.addEvent(JSON.parse(message.data));
    };

    this.eventSource.onerror = (error: Event) => {
      this.setState({
        error: new Error(error.type)
      });
    }
  }

  public addEvent = (event: any) => {
    this.setState({
      events: [...this.state.events, event].slice(-100)
    });
  }

  public clearEvents = () => {
    this.setState({
      events: []
    });
  }

  public render = () => {
    return (
      <ServerEventsContext.Provider value={{
        events: this.state.events,
        clearEvents: this.clearEvents
      }}>
        {this.props.children}
      </ServerEventsContext.Provider>
    )
  }
}