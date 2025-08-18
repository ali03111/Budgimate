import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { groceryIcon } from '../../Assets'; // Replace with your grocery icon asset
import { wp, hp } from '../Hooks/useResponsive';
import { TextComponent } from './TextComponent';
import { Colors } from '../Theme/Variables';

const PlusCardComp = ({
  category = 'Food and grocery',
  remaining = 'Remaining : $120 of $230',
  onPress,
  img,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={img} resizeMode="contain" style={styles.icon} />
      <View style={styles.textContainer}>
        <TextComponent text={category} family={'600'} size={'1.5'} />
        <TextComponent
          text={remaining}
          family={'400'}
          size={'1.5'}
          styles={styles.remainingText}
        />
      </View>
      <TouchableOpacity style={styles.addButton}>
        <TextComponent
          text={'+'}
          family={'600'}
          size={'3'}
          styles={styles.addText}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('95'),
    paddingVertical: hp('1.5'),
    paddingHorizontal: wp('3'),
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginVertical: hp('0.5'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp('0.5') },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  icon: {
    width: wp('10'),
    height: hp('5'),
    marginRight: wp('2'),
  },
  textContainer: {
    flex: 1,
  },
  remainingText: {
    color: Colors.textGray,
  },
  addButton: {
    padding: wp('1'),
  },
  addText: {
    color: Colors.primaryColor,
  },
});

export default PlusCardComp;
