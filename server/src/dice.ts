export const SUCCESS = "success";
export const FAILURE = "failure";
export const ADVANTAGE = "advantage";
export const THREAT = "threat";
export const TRIUMPH = "triumph";
export const DESPAIR = "despair";
export const BLANK = "blank";
export type Face = "success" | "failure" | "advantage" | "threat" | "triumph" | "despair" | "blank";
export const FaceNames: Face[] = [SUCCESS, FAILURE, ADVANTAGE, THREAT, TRIUMPH, DESPAIR, BLANK];

export type Roll = Face[];

export type Die = Face[][];
export type Dice = Die[];
export const ABILITY = "ability";
export const BOOST = "boost";
export const PROFICIENCY = "proficiency";
export const SETBACK = "setback";
export const CHALLENGE = "challenge";
export const DIFFICULTY = "difficulty";
export type DiceName = "ability" | "boost" | "proficiency" | "setback" | "challenge" | "difficulty";
export const DiceNames = [ABILITY, BOOST, PROFICIENCY, SETBACK, CHALLENGE, DIFFICULTY];

export const DICE: {[key: string]: Die} = {
  ABILITY: [
    [BLANK],
    [SUCCESS],
    [SUCCESS],
    [ADVANTAGE],
    [ADVANTAGE],
    [ADVANTAGE, SUCCESS],
    [ADVANTAGE, ADVANTAGE],
    [SUCCESS, SUCCESS]
  ],
  BOOST: [
    [BLANK],
    [BLANK],
    [SUCCESS],
    [ADVANTAGE],
    [ADVANTAGE, SUCCESS],
    [ADVANTAGE, ADVANTAGE],
  ],
  PROFICIENCY: [
    [BLANK],
    [TRIUMPH],
    [SUCCESS],
    [SUCCESS],
    [ADVANTAGE],
    [ADVANTAGE, SUCCESS],
    [ADVANTAGE, SUCCESS],
    [ADVANTAGE, SUCCESS],
    [ADVANTAGE, ADVANTAGE],
    [ADVANTAGE, ADVANTAGE],
    [SUCCESS, SUCCESS],
    [SUCCESS, SUCCESS]
  ],
  SETBACK: [
    [BLANK],
    [BLANK],
    [FAILURE],
    [FAILURE],
    [THREAT],
    [THREAT],
  ],
  CHALLENGE: [
    [BLANK],
    [FAILURE],
    [THREAT],
    [THREAT],
    [THREAT],
    [FAILURE, FAILURE],
    [FAILURE, THREAT],
    [THREAT, THREAT],
  ],
  DIFFICULTY: [
    [BLANK],
    [DESPAIR],
    [FAILURE],
    [FAILURE],
    [THREAT],
    [THREAT],
    [FAILURE, FAILURE],
    [FAILURE, FAILURE],
    [THREAT, THREAT],
    [THREAT, THREAT],
    [FAILURE, THREAT],
    [FAILURE, THREAT],
  ]
};

export const roll = (diceNames: DiceName[]): Roll => {
  const dice = diceNames.map(diceName => DICE[diceName]);
  const roll = dice.flatMap(die => die[Math.floor(Math.random() * die.length)]);
  return roll;
};

export const summarize = (roll: Roll): Roll => {
  const successes = roll.filter(face => face === SUCCESS).length - roll.filter(face => face === FAILURE).length;
  const advantages = roll.filter(face => face === ADVANTAGE).length - roll.filter(face => face === THREAT).length;
  const triumphs = roll.filter(face => face === TRIUMPH).length;
  const despairs = roll.filter(face => face === DESPAIR).length;

  return [
    ...(successes > 0 ? Array(successes).fill(SUCCESS) : Array(-successes).fill(FAILURE)),
    ...(advantages > 0 ? Array(advantages).fill(ADVANTAGE) : Array(-advantages).fill(THREAT)),
    ...Array(triumphs).fill(TRIUMPH),
    ...Array(despairs).fill(DESPAIR),
  ];
};