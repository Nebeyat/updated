import { Tabs } from "expo-router";
import TaskProvider  from "../contexts/taskContexts"

import Ionicons from '@expo/vector-icons/Ionicons';



export default function Layout() {
  return (
    <TaskProvider>
    <Tabs screenOptions={{
      tabBarStyle:{
        backgroundColor:'#2d056d',
        setOffset:0,
        borderTopWidth:0,
      },
      tabBarActiveTintColor:'#fff',
      tabBarInactiveTintColor:'#007784',
    }} >
      <Tabs.Screen name="index" options={{
         headerShown: false,
         tabBarIcon:() => <Ionicons name='home-outline' size={24} color='gray'/>, }} />
      <Tabs.Screen name="focustime" options={{ 
        headerShown: false,
        tabBarIcon:() => <Ionicons name='timer-outline'size={24} color='gray'/>, }} />
        <Tabs.Screen name="setting" options={{
          headerShown: false,
          tabBarIcon: () => <Ionicons name='settings-outline'size={24} color='gray'/>,
        }}/>
    </Tabs>
    </TaskProvider>
  )
}