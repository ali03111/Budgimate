import { View, Text, ImageBackground, Switch } from 'react-native';
import React, { memo } from 'react';
import { aboutBlue, LoginBg } from '../../Assets';
import { HeaderComponent } from '../../Components/HeaderComp';
import { MultiView } from '../../Components/MultiView';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';

const NotificationScreen = () => {
  const viewArry = [
    {
      title: `Budget Threshold Alerts`,
      subView: "Get notified when you're close to your budget limit.",
      rightChilderView: (
        <Switch style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }} />
      ),
      onPress: () => {},
    },
    {
      title: 'Family Account Activity',
      subView: 'Receive updates when a family member adds an expense.',
      rightChilderView: (
        <Switch
          style={{
            transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
          }}
        />
      ),
      onPress: () => {},
    },
    {
      title: 'Partner Invitation Notifications',
      subView:
        'Get notified when a family member invites you to join their account.',
      rightChilderView: (
        <Switch
          style={{
            transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
          }}
        />
      ),
      onPress: () => {},
    },
    {
      title: 'Goal Completion Reminders',
      subView: "Receive reminders when you're close to completing a goal.",
      rightChilderView: (
        <Switch
          style={{
            transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
          }}
        />
      ),
      onPress: () => {},
    },
    {
      title: 'Inactive Goal Reminders',
      subView:
        'Get notified if no funds are allocated for a goal for over 60 days.',
      rightChilderView: (
        <Switch
          style={{
            transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
          }}
        />
      ),
      onPress: () => {},
    },
    {
      title: 'Recurring Expense Reminders',
      subView: 'Receive reminders for recurring expenses.',
      rightChilderView: (
        <Switch
          style={{
            transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
          }}
        />
      ),
      onPress: () => {},
    },
    {
      title: 'Recurring Income Reminders',
      subView: 'Get notified for recurring income.',
      rightChilderView: (
        <Switch
          style={{
            transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
          }}
        />
      ),
      onPress: () => {},
    },
  ];

  return (
    <ImageBackground source={LoginBg} style={{ flex: 1 }}>
      <HeaderComponent headerTitle={'Notifications'} isBack />
      <MultiView
        data={viewArry}
        viewStyle={{ width: wp('100') }}
        titleStyles={{ fontSize: hp('1.4') }}
        isDivider
        dividerStyles={{
          width: wp('100'),
          backgroundColor: Colors.primaryColor,
        }}
        itemViewStyle={{
          marginVertical: hp('1'),
          justifyContent: 'space-between',
        }}
      />
    </ImageBackground>
  );
};

export default memo(NotificationScreen);
