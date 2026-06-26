import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from "expo-router";
import { useTasks } from '../../contexts/taskContexts';
import { useColors } from '../../contexts/colorContext';

export default function FocusTime() {
  const { colors } = useColors();
  const { setTasks, selectedTask } = useTasks();
  const focusTask = selectedTask;

  const [isRunning, setIsRunning] = useState(false);
  const times = [5, 900, 1200]; 
  const [selectedTime, setSelectedTime] = useState(0); 
  const parameters = useLocalSearchParams();

  const timeFromat = (time) => {
    if (!time && time !== 0) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const showToast = () => {
    Toast.show({
      position: "bottom",
      type: "success",
      text1: `You have successfully focused on ${focusTask || 'your task'}`,
    });
  };

  useEffect(() => {
    let intervalId;
    if (isRunning && selectedTime > 0) {
      intervalId = setInterval(() => {
        setSelectedTime((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && selectedTime === 0) {
      showToast();
      setIsRunning(false);
      if (selectedTask) {
        setTasks((prev) => [...prev, selectedTask]);
      }
    }
    return () => clearInterval(intervalId);
  }, [isRunning, selectedTime]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, alignSelf: "flex-start", marginTop: 20,gap:10 }}>
 <TouchableOpacity 
          style={[styles.backButton, { backgroundColor: colors.surface }]}
          onPress={() => {
            setIsRunning(false); 
            router.back();
            setSelectedTime(0); 
          }}
        >
          <Ionicons
           name="chevron-back" 
           size={24}
            color={colors.textPrimary} />
        </TouchableOpacity>
        
          <Text style={[styles.timerText, { color: colors.textPrimary,
            fontFamily:'Righteous_400Regular'  }]}>Focus Session</Text>

        </View>
         <Text style={[styles.timerText, { color: colors.textPrimary, fontFamily:'Righteous_400Regular' }]}>
          {selectedTime ? timeFromat(selectedTime) : "00:00"}
        </Text>
        <View style={{ 
      flexDirectione:'row',
        backgroundColor:colors.surface,
        alignItems: "center",
         gap:10,
         marginTop: 10,
          padding: 10,
           borderRadius: 15 ,
           width:'90%',
           minHeight:50,
           marginLeft:10,}}>
        <Text style={[styles.subTitle, { color: colors.textSecondary }]}>
          focusing on :{ " "}
          </Text>
        <Text style={[styles.focusTask, { color: colors.textPrimary }]}>{focusTask || "No task selected"}</Text>
        </View>
        <View style={{
            height: 10,
            width: "100%",
            backgroundColor: colors.surface || '#ccc',
            marginTop: 30,
            marginBottom: 20,
          }}
        />

        <View style={[styles.timeOptions, { backgroundColor: colors.background }]}>
          {times.map((time, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.timeOptionsButton, { backgroundColor: colors.surface,borderColor:selectedTime === time ? colors.success : 'transparent',borderWidth:2 },]}
              onPress={() => {
                setIsRunning(false);
                setSelectedTime(time);
              }}
            >
              <Text style={[styles.timeOptionsText, { color: colors.textPrimary }]}>{timeFromat(time)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
        disabled={!selectedTime ||!selectedTask}
          style={[styles.startFab, { borderColor: isRunning ? colors.error : colors.surface }]}
          onPress={() => {
            if (selectedTime > 0) {
              setIsRunning(!isRunning);
            }
          }}
        >
          
          <Text style={{ minHeight:40,color:isRunning ? colors.onPrimary : colors.textSecondary,  fontFamily:'Righteous_400Regular' }}> 
            {isRunning ? "STOP" : "START"}
          </Text>
        </TouchableOpacity>
        <Toast />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  timerText: {
  
    
    marginTop: 50,
    color:"white",
   
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "semi-bold",
    marginLeft: 10,

    
  },
  focusTask: {
    fontSize: 25,
   fontWeight: "bold",
    fontFamily:'Righteous_400Regular'
  },
  timeOptions: {
    flexDirection: "row",
    marginTop: 30,
    width: "100%",
    justifyContent: "space-around",
  },
  timeOptionsButton: {
    height: 40,
    width: 80,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  timeOptionsText: {
    fontSize: 16,
     fontFamily:'Righteous_400Regular',
     color:'white',
  },
  startFab: {
    height: 50,
    width: '80%',
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  backButton: {
  
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    marginLeft:10,
  
  },
});