import { View, Text, ImageBackground, TextInput } from 'react-native';
import React, { memo } from 'react';
import { LoginBg } from '../../Assets';
import { HeaderComponent } from '../../Components/HeaderComp';
import ThemeButton from '../../Components/ThemeButton';
import { TextComponent } from '../../Components/TextComponent';
import { styles } from './styles';
import { hp, wp } from '../../Hooks/useResponsive';

const AllocateToIncome = ({ navigation }) => {
  return (
    <ImageBackground source={LoginBg} style={{ flex: 1 }}>
      <HeaderComponent headerTitle={'Allocate Leftover to Income'} isBack />
      <ThemeButton
        title={'Leftover: $250'}
        isTransparent
        style={styles.themeButton}
        textStyle={styles.themeButtonText}
      />
      <TextComponent
        text={
          'Add leftover amount of $250 or less, from “Last cycle” to your “Current Cycle” income $5,460'
        }
        fade
        styles={styles.textComponent}
        size={'1.3'}
      />
      <View style={styles.priceMainView}>
        <View style={styles.priceInnerView}>
          <TextComponent text={'$'} size={'4.5'} />

          <TextInput
            placeholder="0"
            onChangeText={text => {
              // onChange(Math.max(20, text.length * 14)); // increase width based on content
            }}
            style={{
              fontSize: hp('4.5'),
              color: 'black',
              width: 30,
            }}
            // value={value}
            placeholderTextColor={'gray'}
            keyboardType="numeric"
          />
        </View>
        <TextComponent
          text={'Add income amount'}
          fade
          size={'1.5'}
          styles={styles.addIncomeText}
        />
      </View>
      <ThemeButton
        title={'Allocate'}
        isTheme
        style={{ width: wp('95'), marginTop: hp('10'), alignSelf: 'center' }}
        onPress={() => navigation.goBack()}
      />
    </ImageBackground>
  );
};

export default memo(AllocateToIncome);
