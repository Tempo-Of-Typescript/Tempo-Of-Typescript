export const SET_TOKENS = "SET_TOKENS";

export interface ITokenActions {
  type: typeof SET_TOKENS;
  payload: ITokenState;
}

export interface ITokenState {
  authToken: string;
  refreshToken: string;
}
