import{View,Text, TouchableOpacity}from 'react-native'
import { SafeAreaView } from 'react-native-safeArea-context'
import{usestate,useEffect} from 'react'

export default function FocusTime({focusTask,onBack}){
    const[isRunning,setIsRunning]=usestate(false);
    const times=[600,900,1200];
    
    return(
        <SafeAreaView>
       
        <Text></Text>
         <Text></Text>
          <Text></Text>
          <View/>
          <View>
            <Text>Task</Text>
          </View>
           <TouchableOpacity>
            <Text>Start</Text>
          </TouchableOpacity>
          
          <TouchableOpacity>
            <Text>Back</Text>
          </TouchableOpacity>
    </SafeAreaView>

    )
}
const style=StyleSheet.create({
  

})