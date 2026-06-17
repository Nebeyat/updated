import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import { SystemBars } from "react-native-edge-to-edge";
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from "expo-router";
import { useTasks } from '../contexts/taskContexts';

export default function FocusTime() {
  const { setTasks, selectedTask } = useTasks();
  const focusTask = selectedTask;

  const [isRunning, setIsRunning] = useState(false);
  const times = [5, 900, 1200]; // 5 sec, 15 min, 20 min
  const [selectedTime, setSelectedTime] = useState();
  const parameters = useLocalSearchParams();

  const timeFromat = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const showToast = () => {
    Toast.show({
      position: "bottom",
      type: "success",
      text1: `you have successfully focused on ${focusTask}`,
    });
  };

  useEffect(() => {
    let intervalId;
    if (isRunning && selectedTime > 0) {
      intervalId = setInterval(() => {
        setSelectedTime((prev) => prev - 1);
      }, 1000);
    }
   
    else if (isRunning &&selectedTime === 0) {
      showToast();
      setIsRunning(false);
      setTasks((prev) => [...prev, selectedTask]);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, selectedTime]);

  return (
    <ImageBackground style={styles.imageBackground} resizeMode="cover" source={require('../../assets/image.jpg')}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
             setIsRunning(false); 
              router.back();
              setSelectedTime(null);
            }}
          >
            <Ionicons name="chevron-back" size={24} color="white" />
            <Text style={{ color: "white" }}>Back</Text>
          </TouchableOpacity>
          <SystemBars style="light" />
          <Text style={styles.timerText}>
            {selectedTime ? timeFromat(selectedTime) : "00:00"}
          </Text>
          <Text style={styles.subTitle}>focusing on :</Text>
          <Text style={styles.focusTask}>{focusTask}</Text>
          <View
            style={{
              height: 10,
              width: "100%",
              backgroundColor: "#252250",
              marginTop: 30,
              marginBottom: 20,
            }}
          />

          <View style={styles.timeOptions}>
            {times.map((time, index) => (
              <TouchableOpacity
                key={index}
                style={styles.timeOptionsButton}
                onPress={() => setSelectedTime(time)}
              >
                <Text style={styles.timeOptionsText}>{timeFromat(time)}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={styles.startFab}
            onPress={() => {
              setIsRunning(!isRunning);
            }}
          >
            <Text style={{ color: "white" }}> {isRunning ? "stop" : "start"}</Text>
          </TouchableOpacity>
          <Toast />
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: "center",
  },
  imageBackground: {
    flex: 1,
    alignItems: "center",
  },
  timerText: {
    fontWeight: "bold",
    fontSize: 60,
    color: "white",
    marginTop: 50,
  },
  subTitle: {
    fontSize: 10,
    color: "white",
    marginTop: 20,
  },
  focusTask: {
    fontSize: 30,
    color: "white",
    marginTop: 20,
    fontWeight: "bold",
  },
  timeOptions: {
    flexDirection: "row",
    marginTop: 30,
    width: "100%",
    justifyContent: "space-around",
  },
  timeOptionsButton: {
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "white",
  },
  timeOptionsText: {
    fontSize: 18,
    color: "white",
  },
  startFab: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  backButton: {
    flexDirection: "row",
    height: 40,
    width: 80,
    borderRadius: 25,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    marginLeft: 1,
  },
}); 