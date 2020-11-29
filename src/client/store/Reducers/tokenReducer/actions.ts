import { ITokenActions, SET_TOKENS } from "./type";

export const _getTokens = (tokens: Array<string>): ITokenActions => ({
  type: SET_TOKENS,
  payload: tokens,
});
