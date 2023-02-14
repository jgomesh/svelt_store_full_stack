import IUserInfo from "./IUserInfo"

export default interface IRegistered {
  setLoading: Function,
  userInfo: IUserInfo,
  setError: Function,
  setRegistered: Function,
  disabled: boolean,
  error: boolean,
  registered: boolean,
  loading: boolean,
  setUserInfo: Function,
  setDisabled: Function,
  history: { push: Function},
  setLoginOpen: Function
}