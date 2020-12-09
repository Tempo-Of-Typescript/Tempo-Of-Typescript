import { ILoginActions, SET_LOGIN, ILoginState } from "./type";

export const _getLoginStatus = (
  loggedinStatus: ILoginState
): ILoginActions => ({
  type: SET_LOGIN,
  payload: loggedinStatus,
});
