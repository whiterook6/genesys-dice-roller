const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class Controller {
  public listGames = async () => {
    const [
      response
    ] = await Promise.all([
       fetch("/games"),
       sleep(250)
    ]);
    await this.checkResponse(response);
    return response.json() as Promise<string[]>;
  }

  public getGame = async (name: string) => {
    const response = await fetch(`/games/${name}`);
    await this.checkResponse(response);
    return response.json() as Promise<any>;
  }

  public getPlayers = async (name: string) => {
    const response = await fetch(`/games/${name}/players`);
    await this.checkResponse(response);
    return response.json() as Promise<any>;
  };

  public getTurns = async (name: string) => {
    const response = await fetch(`/games/${name}/turns`);
    await this.checkResponse(response);
    return response.json() as Promise<any>;
  };

  public createGame = async (name: string) => {
    const response = await fetch(`/games`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });
    await this.checkResponse(response);
    return response.json() as Promise<any>;
  };

  public takeTurn = async (name: string, dice: string[]) => {
    const response = await fetch(`/games/${name}/turn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dice
      }),
    });
    await this.checkResponse(response);
    return response.json() as Promise<any>;
  };

  private checkResponse = async (response: Response) => {
    if (response.ok) {
      return;
    }
    try {
      const error = await response.json();
      throw new Error(error.message);
    } catch (e) {
      throw new Error(response.statusText);
    }
  };
}