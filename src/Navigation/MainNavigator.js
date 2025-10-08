import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavigationService from '../Services/NavigationService';
import useReduxStore from '../Hooks/UseReduxStore';
import AuthStack from './AuthStack';
import MybottomTabs from './BottomNavigation';

function MainNavigator() {
  const { getState } = useReduxStore();
  const { onboarding } = getState('onboarding');
  const { isLogin } = getState('Auth');

  return (
    <NavigationContainer
      ref={ref => {
        NavigationService.setRef(ref);
      }}
    >
      {!isLogin ? <AuthStack onboarding={onboarding} /> : <MybottomTabs />}
    </NavigationContainer>
  );
}

export default MainNavigator;
