import { useState } from "preact/hooks";

export const Game = () => {
  const [dice, setDice] = useState<string[]>([]);
  const add = (die: string) => {
    setDice(oldDice => {
      const earlier = oldDice.filter(d => d < die);
      const later = oldDice.filter(d => d > die);
      const same = oldDice.filter(d => d === die);
      return [...earlier, ...same, die, ...later];
    });
  };
  const remove = (die: string) => {
    setDice(oldDice => {
      const earlier = oldDice.filter(d => d < die);
      const later = oldDice.filter(d => d > die);
      const same = oldDice.filter(d => d === die);
      const removed = same.slice(1);
      return [...earlier, ...removed, ...later];
    });
  };
  const noDifficulty = () => {
    setDice(oldDice => {
      return oldDice.filter(d => d !== "difficulty");
    });
  }
  const easyDifficulty = () => {
    setDice(oldDice => {
      const earlier = oldDice.filter(d => d < "difficulty");
      const later = oldDice.filter(d => d > "difficulty");
      return [
        ...earlier,
        "difficulty",
        ...later,
      ];
    });
  };
  const mediumDifficulty = () => {
    setDice(oldDice => {
      const earlier = oldDice.filter(d => d < "difficulty");
      const later = oldDice.filter(d => d > "difficulty");
      return [
        ...earlier,
        "difficulty",
        "difficulty",
        ...later,
      ];
    });
  };
  const hardDifficulty = () => {
    setDice(oldDice => {
      const earlier = oldDice.filter(d => d < "difficulty");
      const later = oldDice.filter(d => d > "difficulty");
      return [
        ...earlier,
        "difficulty",
        "difficulty",
        "difficulty",
        ...later,
      ];
    });
  };
  const clear = () => setDice([]);
  const canRoll = dice.length > 0;
  const canClear = dice.length > 0;
  return (
    <div class="container is-fluid">
      <div class="box">
        <h1>Game</h1>
      </div>
      <div class="columns">
        <div class="column is-one-quarter">
          <div class="box">
            <h1>Players</h1>
          </div>
        </div>
        <div class="column is-one-half">
          <div class="box">
            <h1>Dice</h1>
            <div class="level">
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">Ability</p>
                  <div class="buttons has-addons is-centered">
                    <button
                      class="button is-small is-rounded is-primary"
                      onClick={() => remove("ability")}
                    >-1</button>
                    <button
                      class="button is-small is-rounded is-primary"
                      onClick={() => add("ability")}
                    >+1</button>
                  </div>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">Boost</p>
                  <div class="buttons has-addons is-centered">
                    <button
                      class="button is-small is-rounded is-info"
                      onClick={() => remove("boost")}
                    >-1</button>
                    <button
                      class="button is-small is-rounded is-info"
                      onClick={() => add("boost")}
                    >+1</button>
                  </div>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">Challenge</p>
                  <div class="buttons has-addons is-centered">
                    <button
                      class="button is-small is-rounded is-link"
                      onClick={() => remove("challenge")}
                    >-1</button>
                    <button
                      class="button is-small is-rounded is-link"
                      onClick={() => add("challenge")}
                    >+1</button>
                  </div>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">Proficiency</p>
                  <div class="buttons has-addons is-centered">
                    <button
                      class="button is-small is-rounded is-warning"
                      onClick={() => remove("proficiency")}
                    >-1</button>
                    <button
                      class="button is-small is-rounded is-warning"
                      onClick={() => add("proficiency")}
                    >+1</button>
                  </div>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">Setback</p>
                  <div class="buttons has-addons is-centered">
                    <button
                      class="button is-small is-rounded is-dark"
                      onClick={() => remove("setback")}
                    >-1</button>
                    <button
                      class="button is-small is-rounded is-dark"
                      onClick={() => add("setback")}
                    >+1</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="level">
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">Difficulty</p>
                  <div class="buttons has-addons is-centered">
                    <button
                      class="button is-small is-danger is-rounded"
                      onClick={() => remove("difficulty")}
                    >-1</button>
                    <button
                      class="button is-small is-danger"
                      onClick={() => add("difficulty")}
                    >+1</button>
                    <button class="button is-small is-danger" onClick={noDifficulty}>None</button>
                    <button class="button is-small is-danger" onClick={easyDifficulty}>Easy</button>
                    <button class="button is-small is-danger" onClick={mediumDifficulty}>Medium</button>
                    <button class="button is-small is-rounded is-danger" onClick={hardDifficulty}>Hard</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="has-background-light">
              <div class="buttons">
                {dice.map(die => {
                  const onClick= () => remove(die);
                  let colorClass = "";
                  switch (die) {
                    case "ability":
                      colorClass = "is-primary";
                      break;
                    case "boost":
                      colorClass = "is-info";
                      break;
                    case "proficiency":
                      colorClass = "is-warning";
                      break;
                    case "setback":
                      colorClass = "is-dark";
                      break;
                    case "challenge":
                      colorClass = "is-link";
                      break;
                    case "difficulty":
                      colorClass = "is-danger";
                      break;
                  }

                  return (
                    <button class={`button is-rounded ${colorClass}`} onClick={onClick} />
                  )
                })}
                <div class="buttons is-right">
                  <button class="button is-success" disabled={!canRoll}>Roll</button>
                  <button class="button is-danger" disabled={!canClear} onClick={clear}>Clear</button>
                </div>
              </div>
            </div>
          </div>
          <div class="box">
            <h1>Rolls</h1>
          </div>
        </div>
        <div class="column is-one-quarter">
          <div class="box">
            <h1>You</h1>
          </div>
        </div>
      </div>
    </div>
  )
}