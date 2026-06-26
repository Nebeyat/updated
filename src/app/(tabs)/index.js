import { View, Text, TouchableOpacity, StyleSheet,ImageBackground,ScrollView, Pressable, } from "react-native";
import { SystemBars } from 'react-native-edge-to-edge';
import { TextInput } from "react-native-paper";
import { useState} from "react";
import {router} from "expo-router";
import {useTasks } from '../../contexts/taskContexts';
import { useColors } from '../../contexts/colorContext';
export default function App() {

  const { colors, statusBarStyle } = useColors();
  const {task,setTask,tasks,setSelectedTask }=useTasks();
  const addTask = () => {
    const trimmed = task.trim();

    if (trimmed.length > 0) {
     
      setTask("");
      setSelectedTask(trimmed);
      router.push({
        pathname:'/focustime',
        
})
    }
  }
 

 return (
  <View style={[styles.container, {backgroundColor: colors.background}]}>
    <SystemBars style={statusBarStyle}/>
    <View style={styles.header}>
      <Text style={[styles.headerTitle, {color: colors.textPrimary}]}>Focus</Text>
      <Text style={[styles.headerSubTitle, {color: colors.textSecondary}]}>What do you want to work on?</Text>
    </View>

    <View style={[styles.inputcontainer, {backgroundColor: colors.background}]}>
      <TextInput
        placeholder="What would you like to focus..."
        placeholderTextColor={colors.textSecondary}
        style={[styles.InputText, {backgroundColor: colors.surface, color: colors.textPrimary}]}
        value={task}
        onChangeText={(text) => setTask(text)}
      />
      <TouchableOpacity
        style={[styles.fabButton, {borderColor: colors.outline}]}
        onPress={() => addTask()}
      >
        <Text style={[styles.fabText, {color: colors.textPrimary}]}>+</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.focusedTasks}>
      <Text style={[styles.focusTitle, {color: colors.textPrimary}]}>
        Previous Focused Tasks:
      </Text>
      <ScrollView contentContainerStyle={{gap: 10, marginTop: 10}}>
        {tasks.map((task, index) => (
          <Pressable
            style={[styles.tasksIist, {backgroundColor: colors.surface}]}
            key={index}
            onPress={() => {
              setSelectedTask(task);
              router.push({
                pathname:'/focustime',
              })
            }}
          >
            <Text style={[styles.taskText,{color: colors.textSecondary}]}>
              {index + 1}.</Text>
            <Text style={[styles.taskText, {color: colors.textPrimary}]}>{task}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  </View>
);
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 32,
  },
  headerSubTitle: {
    fontSize: 16,
    marginTop: 4,
  },
  inputcontainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 10,
  },
  InputText: {
    flex: 1,
    fontSize: 14,
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
  },
  fabButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
  },
  fabText: {
    fontSize: 24,
  },
  focusedTasks: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  focusTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  taskText: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingLeft: 10,
    color:'white',
    textDecorationLine: 'line-through',
    
  },
  taskText1:{
    fontWeight: 'bold',
    fontSize: 20,
    paddingLeft: 10,
    color:'white',

  },
  tasksIist: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
  },
});
