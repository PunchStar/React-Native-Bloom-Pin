import React from 'react';
import {createNativeStackNavigator} from  '@react-navigation/native-stack';
import {SignInScreen} from '../screens/SignInScreen';

const Stack = createNativeStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Sign In Screen" component={SignInScreen} />
    </Stack.Navigator>
  );
};
