import { DiceName, roll, Roll } from "./dice";
import { Player } from "./player";

export interface Turn {
  player: Player;
  roll: Roll;
  timestamp: Date;
  dice: DiceName[];
};

export class Game {
  name: string;
  players: Player[] = [];
  turns: Turn[] = [];

  constructor(name: string){
    this.name = name;
  }

  public getState(){
    return {
      name: this.name,
      players: this.players.map(player => player.getState()),
      turns: this.turns.slice(-10)
    }
  }

  broadcast(message: any){
    this.players.forEach(player => player.send(message));
  }

  rollDice(player: Player, dice: DiceName[]){
    const result = roll(dice);
    const turn: Turn = {
      player,
      dice,
      roll: result,
      timestamp: new Date()
    }

    this.turns.push(turn);
    return turn;
  }
};