import React from 'react';
import { StyleSheet, Text, View, Pressable} from 'react-native';

import {useAuth} from '../contexts/Auth';

export const HomeScreen = () => {
  const auth = useAuth();
  const clickLogout = () => {
    auth.signOut();
  }
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={()=> {clickLogout();} }>
          <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width:'100%',
    height:'100%',
  },
  button:{
    borderRadius:5,
    borderWidth:1,
    borderColor:'lightgray',
    width:200,
    height:100,
    marginTop:'auto',
    marginBottom:'auto',
    marginLeft:'auto',
    marginRight:'auto'
  },
  buttonText:{
    color:'black',
    marginTop:'auto',
    marginBottom:'auto',
    marginLeft:'auto',
    marginRight:'auto'
  }
});
