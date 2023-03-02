import { Response } from "express";

export class Player {
  name: string;
  response: Response;

  constructor(name: string, response: Response) {
    this.name = name;
    this.response = response;
  }

  send(message: any){
    this.response.write(`data: ${JSON.stringify(message)}\n\n`);
  }

  getState(){
    return {
      name: this.name,
    }
  }
};