import { ITokenState, ITokenActions, SET_TOKENS } from "./type";

const initalState = {
  tokens: [""],
};
export function tokenReducer(
  state = initalState,
  action: ITokenActions
): ITokenState {
  switch (action.type) {
    case SET_TOKENS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
