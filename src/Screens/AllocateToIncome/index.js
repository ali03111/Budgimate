import { View, Text, ImageBackground, TextInput } from 'react-native';
import React, { memo } from 'react';
import { LoginBg } from '../../Assets';
import { HeaderComponent } from '../../Components/HeaderComp';
import ThemeButton from '../../Components/ThemeButton';
import { TextComponent } from '../../Components/TextComponent';
import { styles } from './styles';
import { hp, wp } from '../../Hooks/useResponsive';
import { formatPrice } from '../../Services/GlobalFunctions';
import useAllocateToIncomeScreen from './useAllocateToIncome';

const AllocateToIncome = ({ navigation, route }) => {
  const { onChangeVal, inputPrice, inputWidth, setInputWidth, addAllocate } =
    useAllocateToIncomeScreen(navigation, route);
  return (
    <ImageBackground source={LoginBg} style={{ flex: 1 }}>
      <HeaderComponent headerTitle={'Allocate Leftover to Income'} isBack />
      <ThemeButton
        title={`Leftover: ${formatPrice(route?.params)}`}
        isTransparent
        style={styles.themeButton}
        textStyle={styles.themeButtonText}
      />
      <TextComponent
        text={`Add leftover amount of ${formatPrice(
          route?.params,
        )} or less, from “Last cycle” to your “Current Cycle” income`}
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
              onChangeVal('inputPrice', text);
              setInputWidth(Math.max(20, text.length * 22)); // dynamic width
            }}
            style={{
              fontSize: hp('4.5'),
              color: 'black',
              width: inputWidth,
            }}
            value={inputPrice}
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
        onPress={addAllocate}
      />
    </ImageBackground>
  );
};

export default memo(AllocateToIncome);
