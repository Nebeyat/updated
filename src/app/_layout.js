import {Drawer} from 'expo-router/drawer';
import TaskProvider from "../contexts/taskContexts";
import Ionicons from '@expo/vector-icons/Ionicons';
import ColorProvider, { useColors } from "../contexts/colorContext"; 
import { useState, useEffect } from 'react';
import { ImageBackground } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { getItems ,setItems } from "../utils/storage";
import OnBoarding from '../components/onBoarding';
import { useFonts,Righteous_400Regular } from '@expo-google-fonts/righteous';

export default function RootLayout({children}) {
  const [fontsLoaded]=useFonts({
    Righteous_400Regular
  });
const [showOnBoarding, setShowOnBoarding] = useState(false);

  const checkOnBoardingStatus = async () => {
    try {
      const onboardingCompleted = await getItems('onboardingcompleted');
       
      console.log('onboarding completed status:',onboardingCompleted);
      setShowOnBoarding(onboardingCompleted !== 'true');
    } catch (error) {
      console.error('Error checking onboarding status:', error);
    }
  };
    
  useEffect(() => {
    checkOnBoardingStatus();
  }, []);
  const DrawerContent = () => {
  const { colors, statusBarStyle } = useColors();
  return (
    <Drawer
      screenOptions={{
        drawerStyle: { backgroundColor: colors.background },
        headerStyle: { backgroundColor: colors.background,elevatione:0,borderWidth:0
         },
        headerTintColor: colors.textPrimary,
      }}
    >
      <Drawer.Screen
        name='(tabs)'
        options={{ title: 'Focus Timer',
          headerTitleStyle:{fontFamily:'righteous_400Regular',fontSize:24},
         }}
      />
    </Drawer>
  );
};
if(!fontsLoaded){
  return null;
}
if (showOnBoarding) {
  return(
    <OnBoarding onFinish={async () => {
      await setItems('onboardingcompleted', 'true');
      setShowOnBoarding(false);
    }}/>
  )
}
return (
   <ColorProvider>
   <TaskProvider>
    <DrawerContent/>
   </TaskProvider>
   </ColorProvider>



  );
}
