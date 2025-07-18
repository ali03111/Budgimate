import { View, Text, ImageBackground, ScrollView, Image } from 'react-native';
import React, { memo } from 'react';
import { greenLock, HomeBg } from '../../Assets';
import { styles } from './styles';
import { TextComponent } from '../../Components/TextComponent';
import { subscriptionPoints } from '../../Utils/localDB';
import { hp, wp } from '../../Hooks/useResponsive';
import ThemeButton from '../../Components/ThemeButton';
import PremiumSuccessModal from '../../Components/PremiumSuccessModal';

const ReviewSubscriptionScreen = ({ navigation }) => {
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
          text="Unlock full access to features that simplify money management and help you stay in control."
          fade
          size="1.5"
          styles={styles.descriptionText}
        />
        <TextComponent
          text="Here's what you'll get:"
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
        <Image
          source={greenLock}
          resizeMode="contain"
          style={styles.greenLockIcon}
        />
        <TextComponent
          text="Individual Plan"
          fade
          size="1.5"
          styles={{ ...styles.descriptionText, textAlign: 'center' }}
        />
        <TextComponent
          text="($2.99/month)"
          isWhite
          size="2.5"
          styles={{
            ...styles.sectionHeader,
            textAlign: 'center',
            paddingTop: hp('1'),
          }}
        />
        <View style={styles.totalView}>
          <TextComponent fade text={'Total'} size={'1.5'} />
          <TextComponent text={'$2.99/month'} size={'1.5'} isWhite />
        </View>
        <ThemeButton
          title="Proceed to Payment"
          isTheme
          style={styles.continueBtn}
          onPress={() => navigation.navigate('AddOnScreen')}
        />
        <TextComponent
          text="Payments renew monthly. Cancel anytime from settings."
          fade
          size="1.2"
          styles={styles.footerNote}
        />
      </ScrollView>
      <PremiumSuccessModal visible={false} />
    </ImageBackground>
  );
};

export default memo(ReviewSubscriptionScreen);
