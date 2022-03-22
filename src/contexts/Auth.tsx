import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { authService} from '../services/authService';

type AuthContextData = {
  authData?: string;
  status?: string;
  loading: boolean;
  signIn(pin:string): Promise<void>;
  signOut(): void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}) => {
  const [authData, setAuthData] = useState<string>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData(): Promise<void> {
    try {
      const authDataSerialized = await AsyncStorage.getItem('@AuthData');
      if (authDataSerialized) {
        const _authData =  authDataSerialized;
        setAuthData(_authData);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  const signIn = async (pin:string) => {
    const _authData = await authService.signIn(
      pin
    );
    console.log('-authdata', _authData)
    if(typeof _authData !== 'string') {
      setAuthData(undefined);
      await AsyncStorage.removeItem('@AuthData');
    }else{
      setAuthData(_authData);
      AsyncStorage.setItem('@AuthData', _authData);
    }
  };

  const signOut = async () => {
    const res = await authService.signOut(
      authData||''
    );
    console.log('-authdatasignOut', res)
    setAuthData(undefined);
    await AsyncStorage.removeItem('@AuthData');
  };

  return (
    <AuthContext.Provider value={{authData, loading, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export {AuthContext, AuthProvider, useAuth};
