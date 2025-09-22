import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { TextComponent } from './TextComponent';
import { Touchable } from './Touchable';
import { hp, wp } from '../Hooks/useResponsive';
import { Colors } from '../Theme/Variables';
import { infoCircle } from '../Assets';

const ActiveAndInactiveCardComp = ({
  isActive,
  onPress,
  title,
  subtitle,
  image,
}) => {
  return (
    <Touchable
      onPress={onPress}
      style={[
        styles.card,
        { borderColor: isActive ? Colors.primaryColor : Colors.gray },
        { backgroundColor: isActive ? Colors.lightBlueBgColor : Colors.white },
      ]}
    >
      <Image source={image} resizeMode="contain" style={styles.icon} />
      <TextComponent
        text={title || 'Add Icon'}
        family={'500'}
        // fade={!isActive}
        size={'2'}
      />
      <TextComponent
        text={subtitle || 'Add income to expense more'}
        family={'300'}
        size={'1.8'}
      />
    </Touchable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: wp('92'),
    borderRadius: 10,
    borderWidth: 0.5,
    paddingVertical: hp('2.5'),
    paddingHorizontal: wp('3'),
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: hp('0.5') },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 2,
    gap: hp('1'),
  },
  icon: {
    width: wp('15'),
    height: hp('6'),
  },
});

export default ActiveAndInactiveCardComp;
