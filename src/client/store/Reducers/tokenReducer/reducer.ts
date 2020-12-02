import { ITokenState, ITokenActions, SET_TOKENS } from "./type";

const initalState = {
  authToken: "",
  refreshToken: "",
};
export function tokenReducer(
  state = initalState,
  action: ITokenActions
): ITokenState {
  switch (action.type) {
    case SET_TOKENS:
      return action.payload;
    default:
      return state;
  }
}
