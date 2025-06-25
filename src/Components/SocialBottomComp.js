import { Image, StyleSheet, View } from 'react-native';
import { Touchable } from './Touchable';
import { apple, google, guest } from '../Assets';
import { hp, wp } from '../Hooks/useResponsive';
import { TextComponent } from './TextComponent';

const SocialBottomComp = ({ onSocialPress, isGuest }) => {
  return (
    <View style={styles.socialView}>
      <Touchable onPress={() => onSocialPress('Google')} style={styles.button}>
        <Image source={google} resizeMode="contain" style={styles.imageStyle} />
        <TextComponent
          text="Continue with Google"
          styles={styles.textStyle}
          variant="light" // or fontWeight="light" depending on your component
        />
      </Touchable>

      <Touchable onPress={() => onSocialPress('appleID')} style={styles.button}>
        <Image source={apple} resizeMode="contain" style={styles.imageStyle} />
        <TextComponent
          text="Continue with Apple"
          styles={styles.textStyle}
          variant="light"
        />
      </Touchable>
      {isGuest && (
        <Touchable onPress={() => onSocialPress('guest')} style={styles.button}>
          <Image
            source={guest}
            resizeMode="contain"
            style={styles.imageStyle}
          />
          <TextComponent
            text="Continue as Guest"
            styles={styles.textStyle}
            variant="light"
          />
        </Touchable>
      )}
    </View>
  );
};

export default SocialBottomComp;

const styles = StyleSheet.create({
  socialView: {
    alignSelf: 'center',
  },
  button: {
    backgroundColor: 'white',
    width: wp('90'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp('1'),
    borderRadius: wp('2'),
  },
  imageStyle: {
    width: wp('12'),
    height: hp('5'),
    marginRight: wp('3'),
  },
  textStyle: {
    fontSize: hp('1.8'),
  },
});
