import { View, Text, ImageBackground, FlatList } from 'react-native';
import React, { memo } from 'react';
import {
  cardBlueBg,
  homeBlue,
  homeBlueBg,
  LoginBg,
  payOfDebtBlue,
  planBlueBg,
  plusBlue,
  vacationBlue,
} from '../../Assets';
import { styles } from './styles';
import { HeaderComponent } from '../../Components/HeaderComp';
import { TextComponent } from '../../Components/TextComponent';
import DefaultGoalComp from '../../Components/DefaultGoalComp';
import { hp, wp } from '../../Hooks/useResponsive';

const SetAGoalScreen = () => {
  return (
    <ImageBackground source={LoginBg} style={styles.ImgBg}>
      <HeaderComponent headerTitle={'Set a goal'} />
      <TextComponent
        text={'What are you saving for?'}
        size={'2.5'}
        styles={styles.headingStyle}
      />
      <DefaultGoalComp
        title={'Saving for a Down Payment'}
        subTitle={'Save for a home'}
        icon={homeBlue}
        isSelected
        selectedIcon={homeBlueBg}
      />
      <DefaultGoalComp
        title={'Paying off Debt'}
        subTitle={'Pay off credit card debt'}
        icon={payOfDebtBlue}
        selectedIcon={cardBlueBg}
      />
      <DefaultGoalComp
        title={'Vacation'}
        subTitle={'Save for a trip'}
        icon={vacationBlue}
        selectedIcon={planBlueBg}
      />
      <DefaultGoalComp
        title={'Custom Goal'}
        subTitle={'Set your own goal'}
        icon={plusBlue}
      />
      {/* <FlatList /> */}
    </ImageBackground>
  );
};

export default memo(SetAGoalScreen);
