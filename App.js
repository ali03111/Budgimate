import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  ImageBackground,
  LogBox,
  Platform,
  AppState,
} from 'react-native';
import MainNavigator from './src/Navigation/MainNavigator';
import { splash2 } from './src/Assets';
import { hp, wp } from './src/Hooks/useResponsive';
import useReduxStore from './src/Hooks/UseReduxStore';
import Overlay from './src/Components/Overlay';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { bioVerifyFalse } from './src/Redux/Action/BioScreenAction';
import { useFocusEffect } from '@react-navigation/native';
import useAppState from 'react-native-appstate-hook';

const App = () => {
  const { getState, dispatch } = useReduxStore();

  const { appState } = useAppState({
    onChange: newAppState => {
      if (newAppState != 'active') dispatch(bioVerifyFalse());
    },
    onForeground: () => console.warn('App went to Foreground'),
    onBackground: () => console.warn('App went to background'),
  });

  // useEffect(() => {
  //   const subscription = AppState.addEventListener('change', nextAppState => {
  //     if (nextAppState != 'active') dispatch(bioVerifyFalse());
  //   });

  //   return () => subscription.remove();
  // }, [AppState.currentState]);

  const [isVisible, setIsVisible] = useState(true);

  const { isloading } = getState('isloading');

  const Hide_Splash_Screen = () => {
    setIsVisible(false);
  };

  // console.log('load', isloading);
  const time = () => {
    return 3000;
  };

  useEffect(async () => {
    (async () => {
      GoogleSignin.configure({
        offlineAccess: true,
        iosClientId:
          '570827920614-n5vf20ksknpq82dvvhg007tttgf425me.apps.googleusercontent.com',
        webClientId:
          Platform.OS == 'ios'
            ? '570827920614-n5vf20ksknpq82dvvhg007tttgf425me.apps.googleusercontent.com'
            : '570827920614-9u4r3dksnamgfem5u4grno27s2i66o7f.apps.googleusercontent.com',
      });
      LogBox.ignoreLogs([
        'VirtualizedLists should never be nested',
        'ViewPropTypes will be removed from React Native',
        'Settings is not yet supported on Android',
        'ViewPropTypes will be removed',
        "exported from 'deprecated-react-native-prop-types'.",
        'Sending...',
        'Non-serializable values were found in the navigation state',
      ]);
      LogBox.ignoreAllLogs(true);
    })();
    // await logOutFirebase();
    setTimeout(function () {
      Hide_Splash_Screen();
    }, time());
  }, []);

  // let Splash_Screen = (
  //   <View style={styles.SplashScreen_RootView}>
  //     <Image source={splash} style={styles.image}></Image>
  //   </View>
  // );

  let Splash_Screen = (
    <ImageBackground
      source={splash2}
      style={styles.SplashScreen_RootView}
    ></ImageBackground>
  );

  return (
    <>
      {isVisible === true ? Splash_Screen : <MainNavigator />}
      {isloading && <Overlay />}
      {/* {modalType && <ImagePreviewComp visible={modalType} images={image} />}
      {isloading &&
        Boolean(getNameFunc?.getCurrentRoute()?.name != 'AllEventsScreen') &&
        Boolean(getNameFunc?.getCurrentRoute()?.name != 'HomeScreen') && (
          <Overlay />
        )} 
      {/* <StackNavigatior />; */}
    </>
  );
};

const styles = StyleSheet.create({
  SplashScreen_RootView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  image: {
    width: wp('35'),
    resizeMode: 'contain',
    height: hp('35'),
  },
});

export default App;
