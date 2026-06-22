import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, ScrollView, Pressable } from "react-native";
import { SystemBars } from 'react-native-edge-to-edge';
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-paper";
import { router } from "expo-router";
import { useTasks } from '../contexts/taskContexts';
import { useColors } from '../contexts/colorContext'

export default function App() {
  const { task, setTask, tasks, setTasks, setSelectedTask } = useTasks();
  const { colors ,statusBarStyle}= useColors();

  const addTask = () => {
    const trimmed = task.trim();
    if (trimmed.length > 0) {
      setTasks((prev) => [...prev, trimmed]);
      setTask("");
      setSelectedTask(trimmed);
      router.push({ pathname: '/focustime' });
    }
  };

  const focusOnExistingTask = (existingTask) => {
    setSelectedTask(existingTask);
    router.push({ pathname: '/focustime' });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background,}]}>
      <SystemBars style="dark" />
      <View style={[styles.inputcontainer ,{backgroundColor: colors.background}]}>
        <TextInput
          placeholder="what would you like to focus..."
          style={styles.InputText}
          mode={"outlined"}
          label="Focus"
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity style={[styles.fabButton,{backgroundColor : colors.background}]} onPress={addTask}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.focusedTasks}>
        <Text style={[styles.focusTitle,{color:colors.textPrimary}]}>things we have focused on:</Text>
        <ImageBackground style={styles.taskBackground} source={require('../../assets/image.jpg')}>
          <ScrollView style={{ padding: 20 }} contentContainerStyle={{ gap: 10, marginTop: 10 }} resizeMode='cover'>
            {tasks.map((t, index) => (
              <Pressable key={index} onPress={() => focusOnExistingTask(t)}>
                <Text key= {index} style={[styles.taskText,{color:colors.textPrimary}]}>-{t}</Text>
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
   
  },
  inputcontainer: {
    flexDirection: "row",
    padding: 20,
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
    padding: 10,
    flex: 1,
  },
  focusTitle: {
    fontWeight: "bold",
    fontSize: 26,
    marginLeft: 10,
    color: "white",
  },
  taskText: {
    fontWeight: "600",
    fontSize: 18,
    color: "white",
    padding: 10,
  },
  taskBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: 'cover',
    overflow: 'hidden',
    borderRadius: 20,
    marginTop: 10,
  },
});