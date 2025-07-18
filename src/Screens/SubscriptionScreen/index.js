import {
  View,
  Text,
  ImageBackground,
  Platform,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import React, { memo } from 'react';
import { family, grayCircleEmpty, HomeBg, individaul } from '../../Assets';
import { hp, wp } from '../../Hooks/useResponsive';
import { TextComponent } from '../../Components/TextComponent';
import { subscriptionPoints } from '../../Utils/localDB';
import { Touchable } from '../../Components/Touchable';
import ThemeButton from '../../Components/ThemeButton';
import { styles } from './styles';

const SubscriptionScreen = () => {
  return (
    <ImageBackground source={HomeBg} style={styles.bg}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <TextComponent
          text="Unlock Budgimate Premium"
          isWhite
          size="2.5"
          styles={styles.headerText}
        />
        <TextComponent
          text="Take full control of your finances."
          isWhite
          size="1.8"
          styles={styles.subHeaderText}
        />
        <TextComponent
          text="Go beyond basic budgeting and unlock powerful features designed to help you save smarter, spend wisely, and achieve your financial goals faster."
          fade
          size="1.5"
          styles={styles.descriptionText}
        />
        <TextComponent
          text="What You’ll Get:"
          isWhite
          size="1.8"
          styles={styles.sectionHeader}
        />
        {subscriptionPoints.map((res, index) => (
          <TextComponent
            key={index}
            text={res}
            fade
            size="1.2"
            styles={styles.bulletPoint}
          />
        ))}

        {/* Individual Plan */}
        <Touchable style={styles.planContainer}>
          <Image
            source={individaul}
            resizeMode="contain"
            style={styles.planIcon}
          />
          <View style={styles.planDetails}>
            <TextComponent text="Individual Plan" size="1.8" isWhite />
            <TextComponent text="$2.99/month" fade size="1.5" />
          </View>
          <Image
            source={grayCircleEmpty}
            resizeMode="contain"
            style={styles.circleIcon}
          />
        </Touchable>

        {/* Family Plan */}
        <Touchable style={[styles.planContainer, styles.familyPlan]}>
          <Image source={family} resizeMode="contain" style={styles.planIcon} />
          <View style={styles.planDetails}>
            <TextComponent text="Family Plan" size="1.8" isWhite />
            <TextComponent text="$2.99/month" fade size="1.5" />
          </View>
          <Image
            source={grayCircleEmpty}
            resizeMode="contain"
            style={styles.circleIcon}
          />
        </Touchable>

        <ThemeButton title="Continue" isTheme style={styles.continueBtn} />
        <TextComponent
          text="Payments renew monthly. Cancel anytime from settings."
          fade
          size="1.2"
          styles={styles.footerNote}
        />
      </ScrollView>
    </ImageBackground>
  );
};

export default memo(SubscriptionScreen);
