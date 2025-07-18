import { View, Text, ImageBackground, ScrollView } from 'react-native';
import React, { memo } from 'react';
import {
  linkAccount,
  LoginBg,
  profileSetting,
  subscriptionSetting,
} from '../../Assets';
import { MultiView } from '../../Components/MultiView';
import { hp, wp } from '../../Hooks/useResponsive';
import { styles } from './styles';
import { TextComponent } from '../../Components/TextComponent';
import { HeaderComponent } from '../../Components/HeaderComp';

const SettingScreen = () => {
  const Account = {
    title: 'Account',
    arryView: [
      {
        title: `Personal Information`,
        leftIcon: profileSetting,
        subView: 'Manage your personal information',
      },
      {
        title: 'Subscription',
        leftIcon: subscriptionSetting,
        subView: 'Manage your subscription',
      },
      {
        title: 'Linked accounts',
        leftIcon: linkAccount,
        subView: 'Invite your partner and link their account',
      },
    ],
  };
  const Security = {
    title: 'Security & Privacy',
    arryView: [
      {
        title: `Personal Information`,
        leftIcon: profileSetting,
        subView: 'Manage your personal information',
      },
      {
        title: 'Subscription',
        leftIcon: subscriptionSetting,
        subView: 'Manage your subscription',
      },
      {
        title: 'Linked accounts',
        leftIcon: linkAccount,
        subView: 'Invite your partner and link their account',
      },
    ],
  };
  const Notifications = {
    title: 'Notifications',
    arryView: [
      {
        title: `Personal Information`,
        leftIcon: profileSetting,
        subView: 'Manage your personal information',
      },
      {
        title: 'Subscription',
        leftIcon: subscriptionSetting,
        subView: 'Manage your subscription',
      },
      {
        title: 'Linked accounts',
        leftIcon: linkAccount,
        subView: 'Invite your partner and link their account',
      },
    ],
  };
  const Support = {
    title: 'Support',
    arryView: [
      {
        title: `Personal Information`,
        leftIcon: profileSetting,
        subView: 'Manage your personal information',
      },
      {
        title: 'Subscription',
        leftIcon: subscriptionSetting,
        subView: 'Manage your subscription',
      },
      {
        title: 'Linked accounts',
        leftIcon: linkAccount,
        subView: 'Invite your partner and link their account',
      },
    ],
  };
  const Terms = {
    title: 'Terms & Conditions',
    arryView: [
      {
        title: `Personal Information`,
        leftIcon: profileSetting,
        subView: 'Manage your personal information',
      },
      {
        title: 'Subscription',
        leftIcon: subscriptionSetting,
        subView: 'Manage your subscription',
      },
      {
        title: 'Linked accounts',
        leftIcon: linkAccount,
        subView: 'Invite your partner and link their account',
      },
    ],
  };

  return (
    <ImageBackground source={LoginBg} style={{ flex: 1 }}>
      <HeaderComponent headerTitle={'Settings'} />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: wp('2'),
          paddingBottom: hp('10'),
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.upperWhiteView}>
          <TextComponent text={Account.title} styles={styles.headingText} />
          <MultiView
            data={Account.arryView}
            viewStyle={{ width: wp('100') }}
            //   dividerStyles={{ marginLeft: wp('8') }}
            leftStyles={styles.leftIconStyle}
            titleStyles={{ fontSize: hp('1.5') }}
            itemViewStyle={{ marginVertical: hp('0.5') }}
          />
        </View>
        <View style={styles.upperWhiteView}>
          <TextComponent text={Security.title} styles={styles.headingText} />
          <MultiView
            data={Security.arryView}
            viewStyle={{ width: wp('100') }}
            //   dividerStyles={{ marginLeft: wp('8') }}
            leftStyles={styles.leftIconStyle}
            titleStyles={{ fontSize: hp('1.5') }}
            itemViewStyle={{ marginVertical: hp('0.5') }}
          />
        </View>
        <View style={styles.upperWhiteView}>
          <TextComponent
            text={Notifications.title}
            styles={styles.headingText}
          />
          <MultiView
            data={Notifications.arryView}
            viewStyle={{ width: wp('100') }}
            //   dividerStyles={{ marginLeft: wp('8') }}
            leftStyles={styles.leftIconStyle}
            titleStyles={{ fontSize: hp('1.5') }}
            itemViewStyle={{ marginVertical: hp('0.5') }}
          />
        </View>
        <View style={styles.upperWhiteView}>
          <TextComponent text={Support.title} styles={styles.headingText} />
          <MultiView
            data={Support.arryView}
            viewStyle={{ width: wp('100') }}
            //   dividerStyles={{ marginLeft: wp('8') }}
            leftStyles={styles.leftIconStyle}
            titleStyles={{ fontSize: hp('1.5') }}
            itemViewStyle={{ marginVertical: hp('0.5') }}
          />
        </View>
        <View style={styles.upperWhiteView}>
          <TextComponent text={Terms.title} styles={styles.headingText} />
          <MultiView
            data={Terms.arryView}
            viewStyle={{ width: wp('100') }}
            //   dividerStyles={{ marginLeft: wp('8') }}
            leftStyles={styles.leftIconStyle}
            titleStyles={{ fontSize: hp('1.5') }}
            itemViewStyle={{ marginVertical: hp('0.5') }}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default memo(SettingScreen);
