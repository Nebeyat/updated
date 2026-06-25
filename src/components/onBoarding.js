
import Onboarding from 'react-native-onboarding-swiper';
import {Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import { setItems } from '../utils/storage';
export default function OnBoarding(){
  const handleDone= async ()=>{
    try {
      await setItems('onboardingcompleted','true');
      console.log('Onboarding completed status set to true');
    } catch (error){
      console.error('Error setting onboarding status:',error);
    }
  };
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
        <Onboarding
        controlStatusBar={false}
        onDone={handleDone}
        pages={[
    {
      backgroundColor: '#fff',
      image: (
        <LottieView
        autoPlay
        loop
      style={{width: 200,height:200}} 
      source={require('../../assets/animations/lottieAnimation.json')} />
    ),
      title: 'Onboarding',
      subtitle: 'Done with React Native Onboarding Swiper',
    },
    {backgroundColor: '#381414',
      image: 
      <LottieView
        autoPlay
        loop
        style={{width: 200, height: 200}}
        source={require('../../assets/animations/pro.json')}
      />
      ,
      title: 'Onboarding',
      subtitle: 'Done with React Native Onboarding Swiper',
    },
    {backgroundColor: '#230a5c',
      image: <LottieView
        autoPlay
        loop
        style={{width: 200, height: 200}}
        source={require('../../assets/animations/work.json')}
      />,
      title: 'Onboarding',
      subtitle: 'Done with React Native Onboarding Swiper',
    },

  ]}
/></SafeAreaView>

    )
}