import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-paper";
import FocusTime from "./component/FocusTime";
import { useState } from "react";

export default function App() {
  const [switchScreen, setSwitchScreen] = useState(false);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
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
          Style={styles.InputText}
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
        {tasks.map((task, index) => (
          <Text key={index} style={styles.taskText}>
            {task}
          </Text>
        ))}
        <View style={{ padding: 20 }}>
          <Text
            style={{ fontSize: 18, color: "white", fontWeight: "semi-bold" }}
          >
            1,learn js basics
          </Text>
          <Text
            style={{ fontSize: 18, color: "white", fontWeight: "semi-bold" }}
          >
            1,learn react native
          </Text>
        </View>
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
    marginTop: 20,
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
});
