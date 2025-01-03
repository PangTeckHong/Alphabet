import React,{useState} from 'react';
import { Alert, View, Button, Text, TextInput } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Edit = ({navigation, route}) => {
  const[letter,setLetter] = useState(route.params.key);
  let mydata = JSON.parse(route.params.datastring);

  const setData = async(value) => {
    AsyncStorage.setItem("alphadata",value);
    navigation.navigate("Home");
  }
  return (
    <View>
      <Text>Letter:</Text>
      <TextInput value={letter} maxLength={1} style={{borderWidth:1}} onChangeText={(text)=>setLetter(text)}/>
      <View style={{flexDirection:"row"}}>
        <View style={{margin:10,flex:1}}>
        <Button title='Save'
          onPress={()=>{
            let indexnum = 1
            if(route.params.type=="Vowels") {
              indexnum = 0;
            }
            mydata[indexnum].data[route.params.index].key=letter;
            let stringData = JSON.stringify(mydata);
            setData(stringData)
          }
        }
        />
        </View>
        <View style={{margin:10,flex:1}}>
        <Button title='Delete'
          onPress={()=>{
            let indexnum = 1
            if(route.params.type=="Vowels") {
              indexnum = 0;
            }
            Alert.alert("Are you sure?",'',
              [{text:'Yes', onPress:()=>{
                mydata[indexnum].data.splice(route.params.index,1);
                let stringData = JSON.stringify(mydata);
                setData(stringData);
              }},
              {text:'No'}])
          }
        }
        />
        </View>
      </View>
    </View>
  );
};

export default Edit;
