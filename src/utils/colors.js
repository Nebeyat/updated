import { surface } from "react-native-paper"

export const darkStatusBar = 'dark'
export const lightStatusBar = 'light'
export const darkTheme = {
    background: '#0b121E',
    surface: '#192333',
    primary: '#80CAFE',
    onPrimary: '#003258',
    secondaryContainer: '#2c394b',
    outline: '#414E62',
    textPrimary: '#E0EEFF',   // ← light color for dark background
    textSecondary: '#8AAAC8', // ← lighter secondary
    success: '#4CAF50', // ← green for success
    error: '#FF5252',   // ← red for errors
    warning: '#FFC107', // ← yellow for warnings
    ripple:'rgba(128,202,255.0.12)',
}
export const lightTheme = {
    background: '#F5F7FA',
    surface: '#FFFFFF',
    primary: '#0061A4',
    onPrimary: '#FFFFFF',
    secondaryContainer: '#D1E4FF',
    outline: '#74777F',
    textPrimary: '#1A1C1E',
    textSecondary: '#44474E',
    success: '#4CAF50', // ← green for success
    error: '#FF5252',   // ← red for errors
    warning: '#FFC107', // ← yellow for warnings

};