import React from "react";

export const LoginInstructions = (): JSX.Element => {
  return (
    <div id="instructions">
      <ul id="login-instructions">
        <li>Click on the button to Log into your Spotify account.</li>
        <li>
          Once you are connected to Spotify, you can search for songs and create
          a playlist queue that you would like to play Tempo of Typescript to.
        </li>
        <li>
          Keep in mind, the game speed will correlate to the speed of the songs
          you choose!
        </li>
        <li>
          Once you are done choosing your songs, click the start button to begin
          your adventure!
        </li>
      </ul>
    </div>
  );
};
