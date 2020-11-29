export const SET_TOKENS = "SET_TOKENS";

export interface ITokenActions {
  type: typeof SET_TOKENS;
  payload: Array<string>;
}

export interface ITokenState {
  tokens: Array<string>;
}
