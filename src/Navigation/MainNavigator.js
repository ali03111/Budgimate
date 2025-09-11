import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigationService from '../Services/NavigationService';
import * as Screens from '../Screens/index';
import useReduxStore from '../Hooks/UseReduxStore';
import MybottomTabs from './BottomNavigation';

const Stack = createNativeStackNavigator();

function MainNavigator() {
  const { getState } = useReduxStore();
  const { onboarding } = getState('onboarding');
  const { isLogin, userData, token } = getState('Auth');
  console.log('tokentokentokentokentokentoken', token, userData);
  return (
    <NavigationContainer
      ref={ref => {
        NavigationService.setRef(ref);
        // const p = NavigationService.getCurrentRoute(ref.getCurrentRoute());
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerTransparent: true,
          headerTitle: null,
          headerShown: false,
        }}
      >
        {!isLogin && (
          <>
            {!onboarding && (
              <Stack.Screen
                name="OnBoardScreen"
                component={Screens.OnBoardScreen}
              />
            )}
            {/* <Stack.Screen
              name="EventsDetailScreen"
              component={Screens.EventsDetailScreen}
            /> */}
            <Stack.Screen name="LoginScreen" component={Screens.LoginScreen} />
            <Stack.Screen
              name="RegisterScreen"
              component={Screens.RegisterScreen}
            />
            {/* <Stack.Screen
              name="OnStepScreen"
              component={Screens.OnStepScreen}
            /> */}

            {/* <Stack.Screen
              name="ForgotPasswordScreen"
              component={Screens.ForgotPasswordScreen}
            /> */}
          </>
        )}
        {isLogin && (
          <>
            <Stack.Screen name="MybottomTabs" component={MybottomTabs} />
            <Stack.Screen
              name="MyGoalsScreen"
              component={Screens.MyGoalsScreen}
            />
            <Stack.Screen
              name="AllocateToExpenseScreen"
              component={Screens.AllocateToExpenseScreen}
            />
            <Stack.Screen
              name="AllocateToGoalsScreen"
              component={Screens.AllocateToGoalsScreen}
            />
            <Stack.Screen
              name="AllocateToIncome"
              component={Screens.AllocateToIncome}
            />
            <Stack.Screen
              name="AllocateFundScreen"
              component={Screens.AllocateFundScreen}
            />
            <Stack.Screen
              name="AllocateSelectorScreen"
              component={Screens.AllocateSelectorScreen}
            />
            <Stack.Screen
              name="AllGoalScreen"
              component={Screens.AllGoalScreen}
            />
            <Stack.Screen
              name="AddExpenseToTraceScreen"
              component={Screens.AddExpenseToTraceScreen}
            />
            <Stack.Screen
              name="CreateNewTraceScreen"
              component={Screens.CreateNewTraceScreen}
            />
            <Stack.Screen
              name="AllTraceScreen"
              component={Screens.AllTraceScreen}
            />
            <Stack.Screen
              name="GoalDetailScreen"
              component={Screens.GoalDetailScreen}
            />
            <Stack.Screen
              name="SetAGoalScreen"
              component={Screens.SetAGoalScreen}
            />
            <Stack.Screen
              name="AddGoalScreen"
              component={Screens.AddGoalScreen}
            />
            <Stack.Screen
              name="AddExpenseToCategoryScreen"
              component={Screens.AddExpenseToCategoryScreen}
            />
            <Stack.Screen
              name="AddIncomeScreen"
              component={Screens.AddIncomeScreen}
            />
            <Stack.Screen
              name="AddCategoryScreen"
              component={Screens.AddCategoryScreen}
            />
            <Stack.Screen name="HomeScreen" component={Screens.HomeScreen} />

            <Stack.Screen
              name="EditPersonalInformationScreen"
              component={Screens.EditPersonalInformationScreen}
            />
            <Stack.Screen
              name="IncomeVsExpenseScreen"
              component={Screens.IncomeVsExpenseScreen}
            />
            <Stack.Screen
              name="ExpenseCategory"
              component={Screens.ExpenseCategory}
            />
            <Stack.Screen
              name="SettingScreen"
              component={Screens.SettingScreen}
            />
            {/* <Stack.Screen name="LoginScreen" component={Screens.LoginScreen} /> */}

            <Stack.Screen name="AddOnScreen" component={Screens.AddOnScreen} />
            <Stack.Screen
              name="ReviewSubscriptionScreen"
              component={Screens.ReviewSubscriptionScreen}
            />
            <Stack.Screen
              name="SubscriptionScreen"
              component={Screens.SubscriptionScreen}
            />

            <Stack.Screen
              name="AddExpenseScreen"
              component={Screens.AddExpenseScreen}
            />
          </>
        )}
        {/* <Stack.Screen
          name="RegisterScreen"
          component={Screens.RegisterScreen}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigator;
