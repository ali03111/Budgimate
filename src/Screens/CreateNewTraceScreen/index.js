import { View, Text, ImageBackground, TextInput } from 'react-native';
import React, { memo } from 'react';
import { LoginBg } from '../../Assets';
import { HeaderComponent } from '../../Components/HeaderComp';
import { hp, wp } from '../../Hooks/useResponsive';
import { TextComponent } from '../../Components/TextComponent';
import { Colors } from '../../Theme/Variables';
import useCreateNewTraceScreen from './useCreateNewTraceScreen';
import { styles } from './styles';
import ThemeButton from '../../Components/ThemeButton';
import { Touchable } from '../../Components/Touchable';

const CreateNewTraceScreen = ({ navigation }) => {
  const {
    inputWidth,
    setInputWidth,
    isSelected,
    setSelectedTrace,
    onChangeVal,
    inputName,
    inputPrice,
    onCreateTrace,
  } = useCreateNewTraceScreen(navigation);

  return (
    <ImageBackground source={LoginBg} style={styles.bgImage}>
      <HeaderComponent headerTitle={'Create a New Trace'} isBack />
      <View style={styles.traceOptionMain}>
        <Touchable
          style={styles.basicTraceBox(Boolean(isSelected == 'basic'))}
          onPress={() => setSelectedTrace('basic')}
        >
          <TextComponent text={'Basic trace'} size={'1.5'} family={'500'} />
          <TextComponent
            text={'Simple limit-based tracking'}
            size={'1.2'}
            fade
            styles={styles.textCenter}
          />
        </Touchable>
        <Touchable
          style={styles.proTraceBox(Boolean(isSelected == 'pro'))}
          onPress={() => setSelectedTrace('pro')}
        >
          <TextComponent text={'Pro trace'} size={'1.5'} family={'500'} />
          <TextComponent
            text={'Advanced category-based tracking'}
            size={'1.2'}
            fade
            styles={styles.textCenter}
          />
        </Touchable>
      </View>

      <View style={styles.priceMainView}>
        <View style={styles.priceInnerView}>
          <TextComponent text={'$'} size={'2.5'} />
          <TextInput
            placeholder="0"
            onChangeText={text => {
              setInputWidth(Math.max(20, text.length * 14)); // increase width based on content
              onChangeVal('inputPrice', text);
            }}
            style={[styles.priceInput, { width: inputWidth }]}
            placeholderTextColor={'gray'}
            keyboardType="numeric"
            value={inputPrice}
          />
        </View>
        <TextComponent
          text={'Set a total spending limit (e.g., $1,000)'}
          fade
          size={'1.5'}
          styles={styles.addIncomeText}
        />
      </View>

      <TextComponent
        text={'Name the trace'}
        isLightThemeColor
        size={'1.5'}
        styles={styles.traceLabel}
      />

      <View style={styles.traceNameBox}>
        <TextInput
          placeholder="Trace Name"
          placeholderTextColor={'gray'}
          style={styles.traceNameInput}
          value={inputName}
          onChangeText={e => onChangeVal('inputName', e)}
        />
      </View>

      <ThemeButton
        title={'Create trace'}
        isTheme
        style={styles.createBtn}
        // onPress={() => navigation.navigate('AddExpenseToTraceScreen',{})}
        onPress={onCreateTrace}
      />
    </ImageBackground>
  );
};

export default memo(CreateNewTraceScreen);
