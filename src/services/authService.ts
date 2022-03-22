import axios from 'axios';
import { Config } from '../config/config';
axios.defaults.baseURL = Config.api_url;

export const signIn = (pin: string): Promise<string> => {
  return new Promise((resolve) => {
    axios.post("/login", {'pin':pin}).then((res)=>{
      const {data} = res;
      resolve(data.token)

    }).catch((e) => {
      resolve(e)
    })
  });
};
const signOut = (pin: string): Promise<string> => {
  return new Promise((resolve) => {
    axios.post("/logout", {},{headers:{
      'Authorization':pin
    }}).then((res)=>{
      const {data} = res;
      resolve(data.token)

    }).catch((e) => {
      resolve(e)

    })
})};
export const authService = {
  signIn,
  signOut
};