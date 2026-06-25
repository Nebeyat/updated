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
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity 
          style={[styles.backButton, { backgroundColor: colors.background }]}
          onPress={() => {
            setIsRunning(false); 
            router.back();
            setSelectedTime(0); 
          }}
        >
          <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
          <Text style={[styles.timerText, { color: colors.textPrimary, fontSize: 16, marginTop: 0 }]}>Back</Text>
        </TouchableOpacity>
         
        <Text style={[styles.timerText, { color: colors.textPrimary }]}>
          {timeFromat(selectedTime)}
        </Text>
        <Text style={[styles.subTitle, { color: colors.textPrimary }]}>focusing on :</Text>
        <Text style={[styles.focusTask, { color: colors.textPrimary }]}>{focusTask || "No task selected"}</Text>
        
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
              style={[styles.timeOptionsButton, { borderColor: colors.textPrimary }]}
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
          style={[styles.startFab, { borderColor: colors.textPrimary, marginTop: 40 }]}
          onPress={() => {
            if (selectedTime > 0) {
              setIsRunning(!isRunning);
            }
          }}
        >
          
          <Text style={{ color: colors.textPrimary, fontWeight: 'bold' }}> 
            {isRunning ? "STOP" : "START"}
          </Text>
        </TouchableOpacity>
        <Toast />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  timerText: {
    fontWeight: "bold",
    fontSize: 60,
    marginTop: 50,
  },
  subTitle: {
    fontSize: 12,
    marginTop: 20,
  },
  focusTask: {
    fontSize: 26,
    marginTop: 10,
    fontWeight: "bold",
  },
  timeOptions: {
    flexDirection: "row",
    marginTop: 30,
    width: "100%",
    justifyContent: "space-around",
  },
  timeOptionsButton: {
    height: 80,
    width: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  timeOptionsText: {
    fontSize: 16,
  },
  startFab: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    flexDirection: "row",
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 10,
  },
});