export const SET_LOGIN = "SET_LOGIN";

export interface ILoginActions {
  type: typeof SET_LOGIN;
  payload: ILoginState;
}

export interface ILoginState {
  loggedinStatus: boolean;
}
