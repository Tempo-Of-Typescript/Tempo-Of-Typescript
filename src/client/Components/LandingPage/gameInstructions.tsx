import React from "react";

export const GameInstructions = (): JSX.Element => {
  return (
    <div id="instructions">
      <ul id="game-instructions">
        <li>
          Objective: try to survive and kill as many enemies as possible before
          your health falls to 0.
        </li>
        <li>
          In order to perform any action, you must move with the beat of the
          music. If you need help, follow the visual at the bottom of the
          screen.
        </li>
        <li>
          To move your character, simply push on the arrow key on your keyboard
          for the direction you would like to move at the correct interval.
        </li>
        <li>
          If you would like to attack, hold down the space bar and push down the
          arrow key for the direction that you would like to attack at the
          correct interval.
        </li>
      </ul>
    </div>
  );
};
