import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import React from 'react';
import { hp, wp } from '../Hooks/useResponsive';
import { CircleImage } from './CircleImage';
import { TextComponent } from './TextComponent';
import { notificationWhite } from '../Assets';
import { Touchable } from './Touchable';
import useReduxStore from '../Hooks/UseReduxStore';

const HomeHeaderComp = () => {
  const { getState } = useReduxStore();

  const { userData } = getState('Auth');
  return (
    <View style={styles.container}>
      <CircleImage
        image={
          'https://images.pexels.com/photos/15157857/pexels-photo-15157857.jpeg'
        }
        uri={true}
        size={0.12}
      />
      <View style={styles.textContainer}>
        <TextComponent text={'Hello,'} isWhite styles={styles.greeting} />
        <TextComponent
          text={`${userData?.first_name} ${userData?.last_name}`}
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
    width: wp('75'),
  },
  greeting: {
    fontSize: hp('1.5'),
    marginBottom: hp('0.5'),
  },
  name: {
    fontWeight: '600',
    fontSize: hp('1.8'),
  },
  notificationIcon: {
    width: wp('6'),
    height: hp('4'),
  },
});

export default HomeHeaderComp;
