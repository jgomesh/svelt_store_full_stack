import requestLoginOrSignin from "./api/requestLoginOrSignin";
import IUserInfo from "../interfaces/IUserInfo";

const signIn = async (event: Event, setLoading: Function, userInfo: IUserInfo, setError: Function, setRegistered: Function, role: 'login' | 'register' | 'register_seller') => {
  event.preventDefault();
  setLoading(true);
  console.log(userInfo)
  const data = await requestLoginOrSignin(userInfo, role);
  console.log(data)
  if(!data.id) {
    setError(true);
    return setLoading(false);
  }
  setRegistered(true);
  setError(false);
  return setLoading(false);
}

export default signIn