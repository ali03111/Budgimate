import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Screens from '../Screens/index';

const Stack = createNativeStackNavigator();

export default function AuthStack({ onboarding }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!onboarding && (
        <Stack.Screen name="OnBoardScreen" component={Screens.OnBoardScreen} />
      )}
      <Stack.Screen name="LoginScreen" component={Screens.LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={Screens.RegisterScreen} />
    </Stack.Navigator>
  );
}
