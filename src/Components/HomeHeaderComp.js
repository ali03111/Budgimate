import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import React from 'react';
import { hp, wp } from '../Hooks/useResponsive';
import { CircleImage } from './CircleImage';
import { TextComponent } from './TextComponent';
import { notificationWhite } from '../Assets';
import { Touchable } from './Touchable';
import useReduxStore from '../Hooks/UseReduxStore';
import { imageUrl } from '../Utils/Urls';

const HomeHeaderComp = () => {
  const { getState } = useReduxStore();

  const { userData } = getState('Auth');

  return (
    <View style={styles.container}>
      {/* {userData?.profile_image && (
        <CircleImage
          image={imageUrl(userData?.profile_image)}
          uri={true}
          size={0.12}
        />
      )} */}
      <View style={styles.textContainer}>
        <TextComponent text={'Hello,'} isWhite styles={styles.greeting} />
        <TextComponent
          text={`${userData?.first_name} ${
            userData?.last_name ? userData?.last_name : ''
          }`}
          isWhite
          styles={styles.name}
        />
      </View>
      <Touchable>
        <Image
          source={notificationWhite}
          resizeMode="contain"
          style={styles.notificationIcon}
        />
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('100'),
    paddingHorizontal: wp('1'),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Platform.OS == 'ios' ? hp('6') : hp('2'),
  },
  textContainer: {
    marginLeft: wp('2'),
    width: wp('89'),
  },
  greeting: {
    fontSize: hp('2'),
    marginBottom: hp('0.5'),
  },
  name: {
    fontWeight: '600',
    fontSize: hp('2'),
  },
  notificationIcon: {
    width: wp('6'),
    height: hp('4'),
  },
});

export default HomeHeaderComp;
