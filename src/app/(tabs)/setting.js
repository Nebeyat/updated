import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useColors } from '../../contexts/colorContext';
import { SystemBars } from 'react-native-edge-to-edge';
import Ionicons from '@expo/vector-icons/Ionicons';

const Setting = () => {
  const { colors, toggleTheme, statusBarStyle, isDark } = useColors();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SystemBars style={statusBarStyle} />

      <View style={[styles.header, { backgroundColor: colors.background }]}>

        {/* Appearance Row */}
        <Pressable
          onPress={toggleTheme}
          style={[styles.row, { backgroundColor: colors.surface }]}
        >
          <Ionicons
            name={isDark ? 'moon' : 'sunny'}
            size={20}
            color={colors.onPrimary}
            style={styles.icon}
          />
          <View>
            <Text style={{ color: colors.textPrimary, fontSize: 16 }}>
              Appearance
            </Text>
            <Text style={{ color: colors.textSecondary, fontSize: 12 }}>
              Dark mode
            </Text>
          </View>
        </Pressable>

        {/* Notifications Row */}
        <Pressable
          onPress={() => {}}
          style={[styles.row, { backgroundColor: colors.surface }]}
        >
          <Ionicons
            name="notifications-circle-outline"
            size={20}
            color={colors.onPrimary}
            style={styles.icon}
          />
          <View>
            <Text style={{ color: colors.textPrimary, fontSize: 16 }}>
              Notifications
            </Text>
            <Text style={{ color: colors.textSecondary, fontSize: 12 }}>
              Manage Notifications
            </Text>
          </View>
        </Pressable>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    padding: 16,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  icon: {
    marginRight: 4,
  },
});

export default Setting;