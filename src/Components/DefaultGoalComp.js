import { View, Image, StyleSheet } from 'react-native'; // Removed Text as it's not directly used
import React from 'react';
import { hp, wp } from '../Hooks/useResponsive';
import { Colors } from '../Theme/Variables';
import { homeBlue } from '../Assets';
import { TextComponent } from './TextComponent';
import { Touchable } from './Touchable';

const DefaultGoalComp = ({
  icon,
  title,
  subTitle,
  isSelected,
  onSelected,
  selectedIcon,
}) => {
  return (
    <Touchable style={styles.container(isSelected)}>
      <Image
        source={isSelected ? selectedIcon : icon}
        resizeMode="contain"
        style={styles.image}
      />
      <View>
        <TextComponent text={title} size={'1.8'} styles={styles.titleText} />
        <TextComponent text={subTitle} size={'1.4'} fade />
      </View>
    </Touchable>
  );
};

export default DefaultGoalComp;

const styles = StyleSheet.create({
  container: isSelected => ({
    width: wp('95'),
    paddingVertical: hp('2'),
    paddingHorizontal: wp('2'),
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: isSelected ? Colors.primaryColor : Colors.grayBorder,
    borderWidth: isSelected ? 1 : 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: hp('1'),
  }),
  image: {
    width: wp('10'),
    height: hp('5'),
    marginRight: wp('2'),
  },
  titleText: {
    fontWeight: 'bold',
  },
});
