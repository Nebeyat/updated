import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useColors } from '../../contexts/colorContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SystemBars } from 'react-native-edge-to-edge';

import Ionicons from '@expo/vector-icons/Ionicons'; 

const Setting = () => {
  const { colors, toggleTheme, statusBarStyle, isDark } = useColors();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <SystemBars style={statusBarStyle}/>
      
      <Text style={[styles.title, { color: colors.textPrimary }]}>
        Setting Screen
      </Text>
      
      <View style={styles.buttonContainer}>
        <Pressable 
          onPress={toggleTheme}
          style={[styles.themeButton, { backgroundColor: colors.primary }]}
        >
          <Text style={[styles.buttonText, { color: colors.onPrimary }]}>
            Change Theme Color
          </Text>
          <Ionicons 
            name={isDark ? 'moon' : 'sunny'} 
            size={20} 
            color={colors.onPrimary} 
            style={styles.icon}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  title: {
    fontSize: 22, 
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
  },
  themeButton: {
    flexDirection: 'row', // Aligns text and icon side-by-side inside the button
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2, // Soft shadow for Android
    shadowColor: '#000', // Soft shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  icon: {
    marginLeft: 12,
  }
});

export default Setting;