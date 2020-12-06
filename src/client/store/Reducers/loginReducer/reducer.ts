import { ILoginActions, ILoginState, SET_LOGIN } from "./type";

const initalState: ILoginState = {
  loggedinStatus: false,
};

export function LoginReducer(
  state = initalState,
  action: ILoginActions
): ILoginState {
  switch (action.type) {
    case SET_LOGIN:
      return action.payload;
    default:
      return state;
  }
}
