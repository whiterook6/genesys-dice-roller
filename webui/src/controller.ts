const checkResponse = async (response: Response) => {
  if (response.ok) {
    return;
  }
  const error = await response.json();
  throw new Error(error.message);
};

export const listGames = async () => {
  const response = await fetch("/games");
  await checkResponse(response);
  return response.json() as Promise<string[]>;
};

export const getGame = async (name: string) => {
  const response = await fetch(`/games/${name}`);
  await checkResponse(response);
  return response.json() as Promise<any>;
};

export const getPlayers = async (name: string) => {
  const response = await fetch(`/games/${name}/players`);
  await checkResponse(response);
  return response.json() as Promise<any>;
};

export const getTurns = async (name: string) => {
  const response = await fetch(`/games/${name}/turns`);
  await checkResponse(response);
  return response.json() as Promise<any>;
};

export const createGame = async (name: string) => {
  const response = await fetch(`/games`, {
    method: "POST",
    body: JSON.stringify({
      name,
    }),
  });
  await checkResponse(response);
  return response.json() as Promise<any>;
};

export const takeTurn = async (name: string, dice: string[]) => {
  const response = await fetch(`/games/${name}/turn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      dice
    }),
  });
  await checkResponse(response);
  return response.json() as Promise<any>;
}