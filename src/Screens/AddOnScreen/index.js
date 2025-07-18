import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import React, { memo } from 'react';
import {
  goalsMode,
  grayCircleEmpty,
  greenLock,
  HomeBg,
  individaul,
  travelMode,
} from '../../Assets';
import { styles } from './styles';
import { TextComponent } from '../../Components/TextComponent';
import { subscriptionPoints } from '../../Utils/localDB';
import { hp, wp } from '../../Hooks/useResponsive';
import ThemeButton from '../../Components/ThemeButton';
import PremiumSuccessModal from '../../Components/PremiumSuccessModal';
import { Colors } from '../../Theme/Variables';
import { Touchable } from '../../Components/Touchable';

const AddOnScreen = ({ navigation }) => {
  return (
    <ImageBackground source={HomeBg} style={styles.bg}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.upperView}>
          <TextComponent text="Current Plan:" fade size="1.5" />
          <TextComponent
            text="Individual"
            size="1.5"
            styles={styles.upperGreenText}
          />
        </View>
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
        <Touchable style={styles.planContainer}>
          <Image
            source={travelMode}
            resizeMode="contain"
            style={styles.planIcon}
          />
          <View style={styles.planDetails}>
            <TextComponent text="Travel Mode" size="1.8" isWhite />
            <TextComponent
              text="Track expenses in multiple currencies automatically"
              fade
              size="1.5"
            />
            <TextComponent text="$2.99/month" size="1.5" isWhite />
          </View>
          <Image
            source={grayCircleEmpty}
            resizeMode="contain"
            style={styles.circleIcon}
          />
        </Touchable>
        <Touchable style={styles.planContainer}>
          <Image
            source={goalsMode}
            resizeMode="contain"
            style={styles.planIcon}
          />
          <View style={styles.planDetails}>
            <TextComponent text="Goals & Roll-Over" size="1.8" isWhite />
            <TextComponent
              text="Set financial goals & roll over unused budgets"
              fade
              size="1.5"
            />
            <TextComponent text="$2.99/month" size="1.5" isWhite />
          </View>
          <Image
            source={grayCircleEmpty}
            resizeMode="contain"
            style={styles.circleIcon}
          />
        </Touchable>
        <Touchable style={styles.planContainer}>
          <Image
            source={travelMode}
            resizeMode="contain"
            style={styles.planIcon}
          />
          <View style={styles.planDetails}>
            <TextComponent text="Traces" size="1.8" isWhite />
            <TextComponent
              text="Track one-time events like trips or weddings"
              fade
              size="1.5"
            />
            <TextComponent text="$2.99/month" size="1.5" isWhite />
          </View>
          <Image
            source={grayCircleEmpty}
            resizeMode="contain"
            style={styles.circleIcon}
          />
        </Touchable>
        <ThemeButton
          title="Proceed to Payment"
          isTheme
          style={styles.continueBtn}
          onPress={() => navigation.navigate('HomeScreen')}
        />
        <TextComponent
          text="Not now"
          fade
          styles={{ marginTop: hp('2'), textAlign: 'center' }}
        />
      </ScrollView>
      <PremiumSuccessModal visible={false} />
    </ImageBackground>
  );
};

export default memo(AddOnScreen);
