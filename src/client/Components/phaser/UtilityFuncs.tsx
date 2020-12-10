import { checkFunc } from "./MainScene";

//this function makes sure callback on collider (enemy vs player) fires only once
//player loses one life
export function collisionCheck(
  this: any,
  callback?: checkFunc,
  context = this
): any {
  let once = false;

  return (...args: checkFunc[]) => {
    if (!once) {
      once = true;
      callback?.apply(context, args);
    }
  };
}
