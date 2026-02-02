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
import { formatPrice } from '../../Services/GlobalFunctions';

const AllocateSelectorScreen = ({ navigation, route }) => {
  return (
    <ImageBackground style={styles.container} source={LoginBg}>
      <HeaderComponent headerTitle={'Allocate Leftover'} isBack />
      <ThemeButton
        title={`Leftover: ${formatPrice(route?.params?.leftOver)}`}
        isTransparent
        style={styles.themeButton}
        textStyle={styles.themeButtonText}
      />
      <TextComponent
        text={`Your leftover amount is ${formatPrice(
          route?.params?.leftOver,
        )}, from “Last cycle”. You can allocate this or less amount to:`}
        fade
        styles={styles.textComponent}
        size={'1.3'}
      />
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <ActiveAndInactiveCardComp
          onPress={() =>
            navigation.navigate('AllocateToIncome', {
              leftOver: route?.params?.leftOver,
              expCatId: route?.params?.expCatId,
            })
          }
          title="Allocate to current cycle income"
          subtitle="Allocate funds to income and expense more"
          image={incomeCircle}
        />
        <ActiveAndInactiveCardComp
          onPress={() =>
            navigation.navigate('AllocateToGoalsScreen', {
              leftOver: route?.params?.leftOver,
              expCatId: route?.params?.expCatId,
            })
          }
          title="Allocate to goals"
          subtitle="Add your expenses to manage"
          image={targetCircle}
        />
        <ActiveAndInactiveCardComp
          onPress={() =>
            navigation.navigate('AllocateTraceScreen', {
              leftOver: route?.params?.leftOver,
              expCatId: route?.params?.expCatId,
            })
          }
          title="Allocate to trace"
          subtitle="Trace your budget by adding income"
          image={noteCircle}
        />
        <ActiveAndInactiveCardComp
          onPress={() =>
            navigation.navigate('AllocateTraceScreen', {
              isPro: true,
              leftOver: route?.params?.leftOver,
              expCatId: route?.params?.expCatId,
            })
          }
          title="Allocate to pro trace"
          subtitle="Trace your budget by adding income"
          image={noteCircle}
        />
        <ActiveAndInactiveCardComp
          onPress={() =>
            navigation.navigate('AllocateToExpenseScreen', {
              leftOver: route?.params?.leftOver,
              expCatId: route?.params?.expCatId,
            })
          }
          title="Rollover to current cycle categories"
          subtitle="Add your expenses to manage"
          image={targetCircle}
        />

        <TextComponent
          text={'Do Nothing'}
          styles={{ textAlign: 'center', marginTop: hp('3') }}
          onPress={() => navigation.goBack()}
        />
      </ScrollView>
    </ImageBackground>
  );
};

export default memo(AllocateSelectorScreen);
