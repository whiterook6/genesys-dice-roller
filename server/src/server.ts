import { Game, Turn } from "./game";
import express, {Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Player } from "./player";
import { DiceName } from "./dice";

export class Server {
  games: Game[] = [];
  app: Express;

  constructor(){
    this.app = express();
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: false}));

    this.app.get("/games", this.listGames.bind(this));
    this.app.get("/games/:game", this.getGame.bind(this));
    this.app.get("/games/:game/players", this.listGamePlayers.bind(this));
    this.app.get("/games/:game/turns", this.listGameTurns.bind(this));
    this.app.get("/games/:game/join", this.join.bind(this));

    this.app.post("/games", this.createGame.bind(this));
    this.app.post("/games/:game/turns", this.takeTurn.bind(this));
  }

  async listGames(_: Request, response: Response){
    response.status(200).json(this.games.map(game => game.name));
  }

  async getGame(request: Request, response: Response){
    const name = request.params.game;
    const game = this.games.find(game => game.name === name);
    if (!game){
      return response.status(404).send(`Game ${name} not found.`);
    }

    return response.status(200).json(game.getState());
  }

  async listGamePlayers(request: Request, response: Response){
    const name = request.params.game;
    const game = this.games.find(game => game.name === name);
    if (!game){
      return response.status(404).send(`Game ${name} not found.`);
    }

    return response.status(200).json(game.players.map(player => player.name));
  }

  async listGameTurns(request: Request, response: Response){
    const name = request.params.game;
    const game = this.games.find(game => game.name === name);
    if (!game){
      return response.status(404).send(`Game ${name} not found.`);
    }

    return response.status(200).json(game.turns.slice(-10));
  }

  async createGame(request: Request, response: Response){
    const name = request.body.name as string;
    if (this.games.find(game => game.name === name)){
      return response.status(400).send(`Game ${name} already exists.`);
    }

    const game = new Game(name);
    this.games.push(game);
    response.status(200).send();
  }   

  async join(request: Request, response: Response){
    const gameName = request.params.game as string;
    const game = this.games.find(game => game.name === gameName);
    if (!game){
      return response.status(404).send(`Game ${gameName} not found.`);
    }
    
    const playerName = request.query.name as string;
    if (game.players.find(player => player.name === playerName)){
      return response.status(400).send(`Player ${playerName} already exists.`);
    }

    const player = new Player(playerName, response);
    game.players.push(player);
    console.log(`Player ${playerName} joined ${gameName}.`);

    response.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Connection": "keep-alive",
      "Cache-Control": "no-cache"
    });

    request.on("close", () => {
      console.log(`Player ${player.name} left the game.`);
      const game = this.games.find(game => game.name === gameName);
      if (game){
        game.players = game.players.filter(player => player.name !== playerName);
        game.broadcast({type: "playerLeft", player: playerName});
      }
    });
  }

  async takeTurn(request: Request, response: Response){
    const gameName = request.params.game as string;
    const game = this.games.find(game => game.name === gameName);
    if (!game){
      return response.status(404).send(`Game ${gameName} not found.`);
    }

    const playerName = request.query.name as string;
    const player = game.players.find(player => player.name === playerName);
    if (!player){
      return response.status(400).send(`Player ${playerName} not found.`);
    }

    const dice = request.body.dice as DiceName[];
    const turn = game.rollDice(player, dice);
    game.broadcast({type: "turn", turn});

    return response.status(200).json(turn);
  }

  async getRoot(_: Request, response: Response){
    response.send("Hello World");
  };

  async start(port: number): Promise<Express>{
    return new Promise(resolve => {
      this.app.listen(port, () => {
        resolve(this.app);
      });
    });
  }
}