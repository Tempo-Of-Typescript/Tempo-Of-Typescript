// import React from "react";
// import { useSelector } from "react-redux";
// import { IRootState as AppState } from "../../../../store/Reducers";
// import { inGameSongs } from "./inGameSongs";

// export const QueueViz = (): JSX.Element => {
//   const { songQueue } = useSelector((state: AppState) => state);

//   if (songQueue.length > 0) {
//     return (
//       <div className="queue-with-start-butt">
//         <h1>Player's Queue:</h1>
//         <h2>{`(${songQueue.length} songs)`}</h2>
//         <div className="song-queue">
//           {songQueue.map((ele) => {
//             return (
//               <div key={`songQ_${ele.id}`}>
//                 <inGameSongs qItem={ele}/>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   } else {
//     return <div>No Songs in Queue!</div>;
//   }
// };
