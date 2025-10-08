import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Platform, Dimensions, StyleSheet, Image } from 'react-native';
import * as Screens from '../Screens/index';
import { Colors } from '../Theme/Variables';
import { hp, wp } from '../Hooks/useResponsive';
import Svg, { Mask, Path } from 'react-native-svg';
import {
  home1,
  home,
  note,
  target,
  setting,
  bluePlus,
  bottomTopBar,
} from '../Assets';
import ListViewScreen from '../Components/ListViewComp';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const { width, height } = Dimensions.get('window');
const isIOS = Platform.OS === 'ios';

const tabarComponent = (
  activeImage,
  unActiveImage,
  ImageStyle,
  title,
  notUseTint,
) => ({
  tabBarIcon: ({ focused }) => {
    const tintColor = !notUseTint
      ? {
          tintColor: focused ? Colors.primaryColor : Colors.backgroundTheme,
        }
      : {};

    return (
      <View style={styles.tabarView}>
        {focused && (
          <Image
            resizeMode="contain"
            source={bottomTopBar}
            style={styles.barStyle}
          />
        )}
        <Image
          style={{
            ...styles.imgstyle,
            ...ImageStyle,
            ...tintColor,
          }}
          source={focused ? activeImage : unActiveImage}
        />
      </View>
    );
  },
  title: title ?? '',
  tabBarLabelStyle: { ...styles.tabarTitle },
});

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={Screens.HomeScreen} />
      <Stack.Screen
        name="GoalDetailScreen"
        component={Screens.GoalDetailScreen}
      />
      <Stack.Screen
        name="AddExpenseToTraceScreen"
        component={Screens.AddExpenseToTraceScreen}
      />
      <Stack.Screen
        name="AllocateTraceScreen"
        component={Screens.AllocateTraceScreen}
      />
      <Stack.Screen
        name="AllocateToIncome"
        component={Screens.AllocateToIncome}
      />
      <Stack.Screen
        name="AllocateSelectorScreen"
        component={Screens.AllocateSelectorScreen}
      />
      <Stack.Screen
        name="AllocateFundScreen"
        component={Screens.AllocateFundScreen}
      />
      <Stack.Screen
        name="IncomeVsExpenseScreen"
        component={Screens.IncomeVsExpenseScreen}
      />
      <Stack.Screen name="ListViewScreen" component={ListViewScreen} />
      <Stack.Screen
        name="TranscritionHistoryScreen"
        component={Screens.TranscritionHistoryScreen}
      />
      <Stack.Screen name="ReportScreen" component={Screens.ReportScreen} />
      <Stack.Screen
        name="AllocateToExpenseScreen"
        component={Screens.AllocateToExpenseScreen}
      />
      <Stack.Screen
        name="AllocateToGoalsScreen"
        component={Screens.AllocateToGoalsScreen}
      />
    </Stack.Navigator>
  );
}

function TraceStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="AllBottomTraceScreen"
        component={Screens.AllTraceScreen}
      />
      <Stack.Screen name="AllTraceScreen" component={Screens.AllTraceScreen} />
      <Stack.Screen name="CatViewScreen" component={Screens.CatViewScreen} />
      <Stack.Screen
        name="CreateNewTraceScreen"
        component={Screens.CreateNewTraceScreen}
      />
      <Stack.Screen name="ReportScreen" component={Screens.ReportScreen} />
      <Stack.Screen
        name="AddExpenseToTraceScreen"
        component={Screens.AddExpenseToTraceScreen}
      />
    </Stack.Navigator>
  );
}

function AddStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AddNewScreen" component={Screens.AddNewScreen} />
      <Stack.Screen
        name="AddIncomeScreen"
        component={Screens.AddIncomeScreen}
      />
      <Stack.Screen name="AllTraceScreen" component={Screens.AllTraceScreen} />
      <Stack.Screen name="AddGoalScreen" component={Screens.AddGoalScreen} />
      <Stack.Screen
        name="TranscritionHistoryScreen"
        component={Screens.TranscritionHistoryScreen}
      />
      <Stack.Screen name="CatViewScreen" component={Screens.CatViewScreen} />
      <Stack.Screen
        name="GoalDetailScreen"
        component={Screens.GoalDetailScreen}
      />
      <Stack.Screen
        name="AddExpenseToCategoryScreen"
        component={Screens.AddExpenseToCategoryScreen}
      />
      <Stack.Screen name="AllGoalScreen" component={Screens.AllGoalScreen} />
      <Stack.Screen
        name="ExpenseCategory"
        component={Screens.ExpenseCategory}
      />
      <Stack.Screen
        name="AddCategoryScreen"
        component={Screens.AddCategoryScreen}
      />
      <Stack.Screen
        name="CreateNewTraceScreen"
        component={Screens.CreateNewTraceScreen}
      />
      <Stack.Screen name="ReportScreen" component={Screens.ReportScreen} />
      <Stack.Screen
        name="AddExpenseScreen"
        component={Screens.AddExpenseScreen}
      />
      <Stack.Screen
        name="AddExpenseToTraceScreen"
        component={Screens.AddExpenseToTraceScreen}
      />
    </Stack.Navigator>
  );
}

function GoalsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="AllBottomGoalScreen"
        component={Screens.AllGoalScreen}
      />
      <Stack.Screen name="AllGoalScreen" component={Screens.AllGoalScreen} />
      <Stack.Screen
        name="TranscritionHistoryScreen"
        component={Screens.TranscritionHistoryScreen}
      />
      <Stack.Screen
        name="CreateNewTraceScreen"
        component={Screens.CreateNewTraceScreen}
      />
      <Stack.Screen name="ReportScreen" component={Screens.ReportScreen} />
      <Stack.Screen name="MyGoalsScreen" component={Screens.MyGoalsScreen} />
      <Stack.Screen
        name="GoalDetailScreen"
        component={Screens.GoalDetailScreen}
      />
      <Stack.Screen name="SetAGoalScreen" component={Screens.SetAGoalScreen} />
      <Stack.Screen name="AddGoalScreen" component={Screens.AddGoalScreen} />
    </Stack.Navigator>
  );
}

function SettingStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SettingScreen" component={Screens.SettingScreen} />
      <Stack.Screen
        name="TwoFactorAuthScreen"
        component={Screens.TwoFactorAuthScreen}
      />
      <Stack.Screen
        name="EditPersonalInformationScreen"
        component={Screens.EditPersonalInformationScreen}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={Screens.ChangePasswordScreen}
      />
      <Stack.Screen
        name="ReviewSubscriptionScreen"
        component={Screens.ReviewSubscriptionScreen}
      />
      <Stack.Screen
        name="SubscriptionScreen"
        component={Screens.SubscriptionScreen}
      />
      <Stack.Screen name="AddOnScreen" component={Screens.AddOnScreen} />
      <Stack.Screen
        name="BiometricAuthScreen"
        component={Screens.BiometricAuthScreen}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={Screens.NotificationScreen}
      />
    </Stack.Navigator>
  );
}

function MybottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors.primaryColor,
        tabBarInactiveTintColor: 'black',
        headerShown: false,
        tabBarActiveBackgroundColor: 'transparent',
        tabBarInactiveBackgroundColor: 'transparent',
        tabBarHideOnKeyboard: true,
        swipeEnabled: true,
        animationEnabled: true,
        tabBarAllowFontScaling: true,
        tabBarItemStyle: { width: 'auto' },
        tabBarStyle: {
          borderTopWidth: 0,
          width: Dimensions.get('window').width,
          backgroundColor: 'white',
          backfaceVisibility: 'hidden',
          borderWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          paddingTop: hp('0.5'),
        },
        tabBarBackground: () => {
          return (
            <Svg
              width={Dimensions.get('window').width}
              height="93"
              viewBox="0 0 440 96"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {' '}
              <Mask id="path-1-inside-1_1449_6319" fill="white">
                {' '}
                <Path d="M425 0C433.285 0.000228827 440 6.71587 440 15V96H0.000411987V15C0.000411987 6.71573 6.71614 0 15.0004 0H184C184 19.8823 200.118 36 220 36C239.572 35.9998 255.496 20.3816 255.989 0.928711L256 0H425Z" />{' '}
              </Mask>{' '}
              <Path
                d="M425 0C433.285 0.000228827 440 6.71587 440 15V96H0.000411987V15C0.000411987 6.71573 6.71614 0 15.0004 0H184C184 19.8823 200.118 36 220 36C239.572 35.9998 255.496 20.3816 255.989 0.928711L256 0H425Z"
                fill="white"
              />{' '}
              <Path
                d="M425 0L425 -1H425V0ZM440 96V97H441V96H440ZM0.000411987 96H-0.999588V97H0.000411987V96ZM184 0H185V-1H184V0ZM220 36V37H220L220 36ZM255.989 0.928711L256.988 0.954027L256.989 0.941328L255.989 0.928711ZM256 0V-1H255.013L255 -0.0126173L256 0ZM425 0L425 1C432.732 1.00021 439 7.26818 439 15H440H441C441 6.16356 433.837 -0.999756 425 -1L425 0ZM440 15H439V96H440H441V15H440ZM440 96V95H0.000411987V96V97H440V96ZM0.000411987 96H1.00041V15H0.000411987H-0.999588V96H0.000411987ZM0.000411987 15H1.00041C1.00041 7.26801 7.26843 1 15.0004 1V0V-1C6.16386 -1 -0.999588 6.16344 -0.999588 15H0.000411987ZM15.0004 0V1H184V0V-1H15.0004V0ZM184 0H183C183 20.4345 199.566 37 220 37V36V35C200.67 35 185 19.33 185 0H184ZM220 36L220 37C240.116 36.9998 256.482 20.9478 256.988 0.954025L255.989 0.928711L254.989 0.903397C254.51 19.8154 239.028 34.9998 220 35L220 36ZM255.989 0.928711L256.989 0.941328L257 0.0126173L256 0L255 -0.0126173L254.989 0.916094L255.989 0.928711ZM256 0V1H425V0V-1H256V0Z"
                fill="#E9E9E9"
                mask="url(#path-1-inside-1_1449_6319)"
              />{' '}
            </Svg>
          );
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={tabarComponent(home1, home, {}, 'Home')}
      />
      <Tab.Screen
        name="TraceTab"
        component={TraceStack}
        options={tabarComponent(note, note, {}, 'Trace')}
      />
      <Tab.Screen
        name="AddTab"
        component={AddStack}
        options={{
          tabBarIcon: () => (
            <Image
              source={bluePlus}
              resizeMode="contain"
              style={{
                width: wp('14.5'),
                height: hp('8'),
                bottom: Platform.OS == 'android' ? hp('3') : hp('2.5'),
              }}
            />
          ),
          title: '',
        }}
      />
      <Tab.Screen
        name="GoalsTab"
        component={GoalsStack}
        options={tabarComponent(target, target, {}, 'Goals')}
      />
      <Tab.Screen
        name="SettingTab"
        component={SettingStack}
        options={tabarComponent(setting, setting, {}, 'Setting')}
      />
    </Tab.Navigator>
  );
}

export default MybottomTabs;

const styles = StyleSheet.create({
  badgeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    fontSize: hp('1.5'),
    backgroundColor: Colors.badgeColor,
  },
  tabarTitle: { fontSize: hp('1.5') },
  tabarView: (focused, last) => ({
    width: 'auto',
    backgroundColor: 'transparent',
    bottom: hp('0.5'),
  }),
  imgstyle: { resizeMode: 'contain', width: wp('6'), height: hp('5') },
  barStyle: {
    width: wp('10'),
    position: 'absolute',
    bottom: Platform.OS == 'ios' ? hp('4.3') : hp('7.5'),
    left: wp('-2'),
    zIndex: 10,
  },
});
