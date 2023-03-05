import { Component, createContext } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";

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
  game?: string;
  children: any;
}

interface State {
  events: any[];
}

export const ServerEventsProvider = ({game, children}: Props) => {
  const [state, setState] = useState<State>({events: []});
  const ref = useRef<EventSource>();
  useEffect(() => {
    if (ref.current){
      ref.current.close();
      setState({events: []});
    }

    const source = new EventSource(`/api/games/${game}/events`);
    source.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setState(oldState => ({
        ...oldState,
        events: [...oldState.events, data]
      }));
    };
    
    ref.current = source;
    return () => {
      ref.current.close();
    }
  }, [game]);

  const clearEvents = () => {
    setState({events: []});
  }

  return (
    <ServerEventsContext.Provider value={{
      events: state.events,
      clearEvents
    }}>
      {children}
    </ServerEventsContext.Provider>
  );
}