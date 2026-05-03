import React from 'react';
import{stylesheet,view,text} from 'react-native';
import { View } from 'react-native/types_generated/index';
const setting =() =>{
    return(
        <View styles={{flex:1,justifyContent:'center',alignItems:'center'}}>
             <Text>setting screen</Text>
        </View>
    )
}
const styles=stylesheet.create({

})
export default setting ;