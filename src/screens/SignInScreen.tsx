import React, { useEffect } from 'react';
import {StyleSheet, Pressable, Text, View} from 'react-native';
import {useAuth} from '../contexts/Auth';

export const SignInScreen = () => {
  const numArray = [1,2,3,4,5,6,7,8,9,0];
  const inputArry = [1,2,3,4];
  const [inputText, setInputText] = React.useState<number[]>([]);
  const auth = useAuth();

  const signIn = async (pin:string) => {
    await auth.signIn(pin);
  };
  useEffect(()=>{
    if(inputText.length === 4){
        let tempString = '';
        for(let i = 0;i < 4; i++){
          tempString += inputText[i].toString();
        }
        setInputText([])
        signIn(tempString);
    }
    if(inputText.length > 4)
      setInputText([])
  },[inputText])
  return (
    <View style={styles.container}>
        <View style={styles.inputSection}>
          {inputArry.map(subInput =>(
            <Text key={subInput + '-input'} style={styles.inputTextStyle}>
                {subInput <= inputText.length ? '*':'__'}
            </Text>
          ))}
        </View>
        <View style={styles.mainSection}>
          {numArray.map(subNum =>(
            <Pressable key={subNum+ '-button'} style={styles.button} onPress={()=> {setInputText([...inputText, subNum])}}>
                <Text style={[styles.buttonText, {fontSize:25}]}>{subNum}</Text>
            </Pressable>
          ))}
        </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width:'100%',
    height:'100%',
  },
  inputSection:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    marginTop:30,
    marginBottom:30,
  },
  inputTextStyle:{
    fontSize:50,
    marginTop:'auto',
    marginBottom:'auto',
    marginLeft:'auto',
    marginRight:'auto'
  },
  mainSection:{
    flex:4,
    flexDirection:'row',
    justifyContent:'center',
    flexWrap:'wrap'
  },
  button:{
    width:'28%',
    borderColor:'lightgray',
    borderWidth:1,
    padding:30,
    marginLeft:'auto',
    marginRight:'auto',
    marginTop:10,
    marginBottom:10,
  },
  buttonText:{
    color:'black',
    marginTop:'auto',
    marginBottom:'auto',
    marginLeft:'auto',
    marginRight:'auto'
  },
});
