import { View, Text, ImageBackground, ScrollView, Image } from 'react-native';
import React, { memo } from 'react';
import { emergencyImg, LoginBg } from '../../Assets';
import { HeaderComponent } from '../../Components/HeaderComp';
import { TextComponent } from '../../Components/TextComponent';
import { styles } from './styles';
import { hp } from '../../Hooks/useResponsive';

const GoalDetailScreen = () => {
  const data = {
    title: 'Emergency fund',
    subtitle: 'Save up for any emergency in the family.',
    targetAmount: 8000,
    targetDate: 'January 25, 2026',
    allocated: 1500,
    notes:
      'This is a long-term goal, so I’ll be contributing a small amount each month. I’m excited to see how quickly it adds up!',
    image: emergencyImg, // Replace with your image
  };
  return (
    <ImageBackground source={LoginBg} style={{ flex: 1 }}>
      <HeaderComponent headerTitle={'Goal details'} isBack />
      <ScrollView contentContainerStyle={{ paddingBottom: hp(4) }}>
        <Image source={data.image} style={styles.goalImage} />

        <View style={styles.contentContainer}>
          <TextComponent text={data.title} family="bold" />
          <TextComponent
            text={data.subtitle}
            // size={13}
            fade
            style={{ marginTop: hp(0.5) }}
          />

          <View style={{ ...styles.detailRow, marginTop: hp('5') }}>
            <TextComponent text="Target amount:" />
            <TextComponent
              text={`$${data.targetAmount.toLocaleString()}`}
              family="bold"
            />
          </View>

          <View style={styles.detailRow}>
            <TextComponent text="Target date:" />
            <TextComponent text={data.targetDate} family="bold" />
          </View>

          <View style={styles.detailRow}>
            <TextComponent text="Allocated funds:" />
            <TextComponent text={`$${data.allocated}`} family="bold" />
          </View>

          <View style={{ marginTop: hp(2) }}>
            <TextComponent text="Notes:" family="bold" />
            <TextComponent
              text={data.notes}
              fade
              style={{ marginTop: hp(0.5) }}
            />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default memo(GoalDetailScreen);
