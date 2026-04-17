import { View, Text, TouchableOpacity, StyleSheet, Alert,ImageBackground,} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from  "react";
import Toast from "react-native-toast-message";
import { SystemBars } from "react-native-edge-to-edge";
import Ionicons from '@expo/vector-icons/Ionicons';


export default function FocusTime({ focusTask, onBack }) {
  const [isRunning, setIsRunning] = useState(false);
  const times = [10, 900, 1200]; //10,15,20 minutes in seconds
  const [selectedTime, setSelectedTime] = useState();

  const timeFromat = (times) => {
    const minutes = Math.floor(times / 60);
    const seconds = Math.floor(times % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const showToast = () => {
    Toast.show({
      positione: "bottom",
      type: "success",
      text1: "you have successfully  focus on ${focusTask}",
    });
  };
  useEffect(() => {
    let intervalId;
    if (isRunning && selectedTime > 0) {
      intervalId = setInterval(() => {
        setSelectedTime((prev) => prev - 1);
      }, 1000);
    }
    if (!isRunning || selectedTime < 0) {
      clearInterval(intervalId);
    } else if (selectedTime === 0) {
      showToast();
      setIsRunning(false);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, selectedTime]);

  const showSuccess = () => {
    Alert.alert("you have focus on ${focusTask}");
  };
  return (
    <ImageBackground style={styles.imageBackground} resizeMode='cover' source={require('../assets/image.jpg')}>
    <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Ionicons name="chevron-back" size={24} color="white" />
        <Text style={{ color: "white" }}>Back</Text>
      </TouchableOpacity>
      <SystemBars style="light"/>
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
            <Text styles={styles.timeOptionsText}>timeFromat{time}</Text>
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
  imageBackground:{
    flex:1,
    alignItems:"center",
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
    mariginTop: 20,
  },
  focusTask: {
    fontSize: 30,
    color: "white",
    mariginTop: 20,
    fontWeight: "bold",
  },
  timeOptions: {
    flexDirectione: "row",
    mariginTop: 30,
    alignItems: "space-between",
    width: "100%",
    justifyContent: "space-around",
  },
  timeOptionsButton: {
    hight: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "white,",
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
    flexDirectione:"row",
    hight: 40,
    width: 80,
    borderRadius: 25,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    alignSelf:"flex-start",
    marginLeft:10,
  },
});
