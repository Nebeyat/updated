import { View, Text, TouchableOpacity, StyleSheet,ImageBackground,ScrollView, Pressable } from "react-native";
import { SystemBars } from 'react-native-edge-to-edge';
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-paper";
import FocusTime from "./component/FocusTime";
import { useState } from "react";

export default function App() {
  const [switchScreen, setSwitchScreen] = useState(false);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(['go to the gym','read a book','learn react native']);
  const [selectedTask, setSelectedTask] = useState("");

  const changeScreen = () => {
    setSwitchScreen(!switchScreen);
  };
  const addTask = () => {
    const trimmed = task.trim();

    if (trimmed.length > 0) {
      setTasks((prev) => [...prev, trimmed]);
      setTask("");
      setSelectedTask(trimmed);
    }
  };
  if (switchScreen) {
    return <FocusTime focusTask={selectedTask} onBack={changeScreen} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <SystemBars style="dark"/>
      <View style={styles.inputcontainer}>
        <TextInput
          placeholder="what woulde you like to focus..."
          style={styles.InputText}
          mode={"outlined"}
          label="Focus"
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity
          style={styles.fabButton}
          onPress={() => {
            addTask();
            changeScreen();
          }}
        >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.focusedTasks}>
        <Text style={styles.focusTitle}>things we have focused on:</Text>
        <ImageBackground style={styles.taskBackground} source= {require('./assets/image.jpg')}>
        <ScrollView style={{padding:20}} contentContainerStyle={{gap:10,marginTop:10}}  resizeMode='cover'>
        
          {tasks.map((task, index) => (
            <Pressable  key={index} onPress={() => {
              addTask()
              changeScreen()
            }}>
          <Text key={index} style={styles.taskText}> {task}
          </Text>
          </Pressable> 
        ))}
        </ScrollView>
        </ImageBackground>
 
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2f0b6849",
  },
  inputcontainer: {
    flexDirection: "row",
    paddding: 20,
  },

  InputText: {
    flex: 1,
  },
  fabButton: {
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "white",
  },
  fabText: {
    fontSize: 20,
    color: "white",
    marginLeft: 10,
  },
  focusedTasks: {
    backgroundColor: 'transparent',
    marginTop: 20,
    padding:10,
    flex:1,
  },
  focusTitle: {
    fontWeight: "bold",
    fontSize: 26,
    marginLeft: 10,
    color: "white",
  },
  taskText: {
    fontWeight: "semi-bold",
    fontSize: 18,
    color: "white",
    padding: 10,
  },
  taskBackground:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    resizeMode:'cover',
    overflow:'hidden',
    borderRadius:20,
    marginTop:10
  }
});
