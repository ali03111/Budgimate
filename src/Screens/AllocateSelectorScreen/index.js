import { View, Text, ImageBackground, ScrollView } from 'react-native';
import React, { memo } from 'react';
import {
  heart,
  incomeCircle,
  LoginBg,
  noteCircle,
  targetCircle,
} from '../../Assets';
import { HeaderComponent } from '../../Components/HeaderComp';
import ThemeButton from '../../Components/ThemeButton';
import { hp, wp } from '../../Hooks/useResponsive';
import { TextComponent } from '../../Components/TextComponent';
import ActiveAndInactiveCardComp from '../../Components/ActiveAndInactiveCardComp';
import { styles } from './styles';

const AllocateSelectorScreen = ({ navigation }) => {
  return (
    <ImageBackground style={styles.container} source={LoginBg}>
      <HeaderComponent headerTitle={'Allocate Leftover'} isBack />
      <ThemeButton
        title={'Leftover: $250'}
        isTransparent
        style={styles.themeButton}
        textStyle={styles.themeButtonText}
      />
      <TextComponent
        text={
          'Your leftover amount is $250, from “Last cycle”. You can allocate this or less amount to:'
        }
        fade
        styles={styles.textComponent}
        size={'1.3'}
      />
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <ActiveAndInactiveCardComp
          onPress={() => navigation.navigate('AllocateToIncome')}
          title="Allocate to current cycle income"
          subtitle="Allocate funds to income and expense more"
          image={incomeCircle}
        />
        <ActiveAndInactiveCardComp
          onPress={() => navigation.navigate('AllocateToGoalsScreen')}
          title="Allocate to goals"
          subtitle="Add your expenses to manage"
          image={targetCircle}
        />
        <ActiveAndInactiveCardComp
          onPress={() => navigation.navigate('AllocateTraceScreen')}
          title="Allocate to trace"
          subtitle="Trace your budget by adding income"
          image={noteCircle}
        />
        <ActiveAndInactiveCardComp
          onPress={() =>
            navigation.navigate('AllocateTraceScreen', { isPro: true })
          }
          title="Allocate to pro trace"
          subtitle="Trace your budget by adding income"
          image={noteCircle}
        />
        <ActiveAndInactiveCardComp
          onPress={() => navigation.navigate('AllocateToExpenseScreen')}
          title="Rollover to current cycle categories"
          subtitle="Add your expenses to manage"
          image={targetCircle}
        />
      </ScrollView>
    </ImageBackground>
  );
};

export default memo(AllocateSelectorScreen);
