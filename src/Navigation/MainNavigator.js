import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavigationService from '../Services/NavigationService';
import useReduxStore from '../Hooks/UseReduxStore';
import AuthStack from './AuthStack';
import MybottomTabs from './BottomNavigation';
import BioVerficationScreen from '../Screens/BioVerficationScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Screens from '../Screens/index';

function MainNavigator() {
  const { getState } = useReduxStore();
  const { onboarding } = getState('onboarding');
  const { isLogin } = getState('Auth');
  const { isBioMatricScreen } = getState('isBioMatricScreen');
  const { isBioMatric } = getState('isBioMatric');

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer
      ref={ref => {
        NavigationService.setRef(ref);
      }}
    >
      {!isLogin ? (
        <AuthStack onboarding={onboarding} />
      ) : Boolean(isBioMatric && !isBioMatricScreen) ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="BioVerficationScreen"
            component={Screens.BioVerficationScreen}
          />
        </Stack.Navigator>
      ) : (
        <MybottomTabs />
      )}
    </NavigationContainer>
  );
}

export default MainNavigator;
