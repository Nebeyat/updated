import { Tabs } from "expo-router";
import TaskProvider from "../contexts/taskContexts"
import Ionicons from '@expo/vector-icons/Ionicons';
import ColorProvider, { useColors } from "../contexts/colorContext"; 
import { SystemBars } from "react-native-edge-to-edge";

function TabLayoutContent() {
  const { colors, statusBarStyle } = useColors(); 
  
  return (
    <>
      <SystemBars style={statusBarStyle}/>
      <Tabs 
        screenOptions={{
          tabBarStyle: {
            backgroundColor: colors.background,
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textPrimary,
        }} 
      >
        <Tabs.Screen name="index" options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name='home-outline' size={24} color={color} />, 
        }} />
        <Tabs.Screen name="focustime" options={{ 
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name='timer-outline' size={24} color={color} />, 
        }} />
        <Tabs.Screen name="setting" options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name='settings-outline' size={24} color={color} />,
        }}/>
      </Tabs>
    </>
  );
}

export default function Layout() {
  return (
    <ColorProvider>
      <TaskProvider>
        <TabLayoutContent />
      </TaskProvider>
    </ColorProvider>
  );
}