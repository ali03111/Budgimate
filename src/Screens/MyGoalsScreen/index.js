import { View, Text, ImageBackground, Image, FlatList } from 'react-native';
import React, { memo } from 'react';
import {
  emergencyImg,
  houseImg,
  LoginBg,
  repaymentImg,
  travelImg,
} from '../../Assets';
import { styles } from './styles';
import { HeaderComponent } from '../../Components/HeaderComp';
import { TextComponent } from '../../Components/TextComponent';
import { Colors } from '../../Theme/Variables';
import { hp, wp } from '../../Hooks/useResponsive';
import GoalCardComp from '../../Components/GoalCardComp';

const MyGoalsScreen = () => {
  const goals = [
    {
      title: 'Emergency fund',
      goal: 80000,
      saved: 34700,
      image: emergencyImg,
      color: Colors.orange,
      bgColor: '#FFE3D2',
    },
    {
      title: 'Down Payment fund',
      goal: 80000,
      saved: 34700,
      image: houseImg,
      color: Colors.blue,
      bgColor: '#D2E8FF',
    },
    {
      title: 'Vacation fund',
      goal: 80000,
      saved: 34700,
      image: travelImg,
      color: Colors.purple,
      bgColor: '#E6D2FF',
    },
    {
      title: 'Debt repayment',
      goal: 80000,
      saved: 34700,
      image: repaymentImg,
      color: Colors.pink,
      bgColor: '#FFD2E6',
    },
  ];

  const renderGoalItem = ({ item }) => {
    return <GoalCardComp item={item} />;
  };

  return (
    <ImageBackground source={LoginBg} style={styles.imgBg}>
      <HeaderComponent headerTitle={'My goals'} isBack />
      <FlatList
        data={goals}
        renderItem={renderGoalItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          paddingBottom: hp(4),
          paddingHorizontal: wp(4),
          paddingTop: hp('2'),
        }}
        showsVerticalScrollIndicator={false}
      />
    </ImageBackground>
  );
};

export default memo(MyGoalsScreen);
