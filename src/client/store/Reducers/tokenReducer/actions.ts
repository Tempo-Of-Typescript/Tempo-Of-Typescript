import { ITokenActions, SET_TOKENS, ITokenState } from "./type";

export const _getTokens = (token: ITokenState): ITokenActions => ({
  type: SET_TOKENS,
  payload: token,
});
