import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet } from 'react-native';
import { Color } from 'react-native/types_generated/Libraries/Animated/AnimatedExports';
import { Colors } from '../Theme/Variables';
import { hp } from '../Hooks/useResponsive';

const Tab = createMaterialTopTabNavigator();

const TopBarNavigation = ({ screens }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIndicatorStyle: styles.tabBarIndicator,
        tabBarActiveTintColor: Colors.primaryColor,
        tabBarInactiveTintColor: '#333',
      }}
    >
      {screens.map((screen, index) => (
        <Tab.Screen
          key={index}
          name={screen.name}
          component={screen.component}
          options={{ tabBarLabel: screen.label }}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'transparent',
    // borderBottomWidth: 1,
    // borderBottomColor: '#ddd',
    // elevation: 2,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
  },
  tabBarLabel: {
    fontSize: hp('2'),
    fontWeight: '500',
    // textTransform: 'none',
  },
  tabBarIndicator: {
    backgroundColor: Colors.primaryColor,
    height: 2,
  },
});

export default TopBarNavigation;
