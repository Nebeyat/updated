import{View,Text, TouchableOpacity,StyleSheet, Alert}from 'react-native'
import { SafeAreaView } from 'react-native-safeArea-context'
import{usestate,useEffect} from 'react'
import Toast from "react-native-toast-message";
export default function FocusTime({focusTask,onBack}){
    const[isRunning,setIsRunning]=usestate(false);
    const times=[10,900,1200];//10,15,20 minutes in seconds
    // 10:00
    const [selectedTime, setSelectedTime] = usestate();
    const timeFromat = (times) =>  {
       const minutes=Math.floor(times /60);
       const seconds=Math.floor(times % 60);
       return `${minutes}:${seconds < 10 ? '0':''}${seconds}`;
    }
    useEffect(()=>{
      if(isRunning){
      let intervalId;
      intetrvalId=setInterval(()=>{
        setSelectedTime(prev => prev -1)
      },1000)}
     else if(!isRunning || selectedTime <= 0){
        clearInterval(intervalId);
      }
      else if(selectedTime == 0){
        Alert.alert(
         'you have focus on ....') 
      }

      
    },[isRunning,selectedTime])
    return(
        <SafeAreaView style={Styles.container}>
       
        <Text style={Styles.timerText}>
            {selectedTime? timeFromat(selectedTime) :'00:0'}
          </Text>
         <Text style={styles.subTitle}>focusing on :</Text>
          <Text style={styles.focusTask}>{focusTask}</Text>
          <View style={{height:10,width:'100%',backgroundColor:'#252250',mariginTop:30,marginBottom:20}}/>

          <View style={styles.timeOptions}>
            {times.map((time, index) =>(
   
    
              <TouchableOpacity key={index} style={styles.timeOptionsButton}onPress={()=>setSelectedTime(time)}>

              
              <Text styles={styles.timeOptionsText}>timeFromat(time)</Text>
             </TouchableOpacity>
              ))}
          </View>
           <TouchableOpacity style={styles.startFab} onPress={() => {setIsRunning(!isRunning)}}>
            <Text style={{color:'white'}}>{isRunning?'stop':'start'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style ={{color:'white'}}>Back</Text>
          </TouchableOpacity>
    </SafeAreaView>

            )
}
const style=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#252250',
    alignItems:'center',
  },
  timerText:{
    fontWeight:'bold',
    fontSize:60,
    color:'white',
    marginTop:50,
  },
  subTitle:{
    fontSize:10,
    color:'white',
    mariginTop:20,
  },
  focusTask:{
    fontSize:30,
    color:'white',
    mariginTop:20,
    fontWeight:'bold',
  },
  timeOptions:{
    flexDirectione:'row',
    mariginTop:30,
    alignItems:'space-between',
    width:'100%',
    justifyContent:'space-around',
  },
  timeOptionsButton:{
    hight:100,
    width:100,
    borderRadius:50,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'transparent',
    borderWidth:2,
    borderColor:'white,'
  },
  timeOptionsText:{
    fontSize:18,
    color:'white'
  },
  startFab:{
    height:80,
    width:80,
    borderRadius:40,
    backgroundColor:'transparent',
    borderWidth:2,
    borderColor:'white',
    justifyContent:'center',
    alignItems:'center',
    marginTop:50,
  },
  backButton:{
    hight:50,
    width:100,
    borderRadius:25,
    backgroundColor:'transparent',
    borderWidth:2,
    borderColor:'white',
    justifyContent: 'center',
    alignItems:'center',
  
  }
  

})