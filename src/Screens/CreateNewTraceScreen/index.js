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
          <TextComponent
            text={'Basic trace'}
            size={'2'}
            family={'600'}
            fade={Boolean(isSelected != 'basic')}
          />
          <TextComponent
            text={'Simple limit-based tracking'}
            size={'1.5'}
            fade
            styles={styles.textCenter}
          />
        </Touchable>
        <Touchable
          style={styles.proTraceBox(Boolean(isSelected == 'pro'))}
          onPress={() => setSelectedTrace('pro')}
        >
          <TextComponent
            text={'Pro trace'}
            size={'2'}
            family={'600'}
            fade={Boolean(isSelected != 'pro')}
          />
          <TextComponent
            text={'Advanced category-based tracking'}
            size={'1.5'}
            fade
            styles={styles.textCenter}
          />
        </Touchable>
      </View>

      {/* <View style={styles.priceMainView}>
        <View style={styles.priceInnerView}>
          <TextComponent text={'$'} size={'3.5'} />
          <TextInput
            placeholder="0"
            onChangeText={text => {
              setInputWidth(Math.max(20, text.length * 20)); // increase width based on content
              onChangeVal('inputPrice', text);
            }}
            style={[
              styles.priceInput,
              { width: inputWidth },
              // { width: wp('85'), textAlign: 'center' },
            ]}
            placeholderTextColor={'gray'}
            keyboardType="numeric"
            value={inputPrice}
          />
        </View>
        <TextComponent
          text={'Set a total spending limit (e.g., $1,000)'}
          fade
          size={'1.8'}
          styles={styles.addIncomeText}
        />
      </View> */}

      <TextComponent
        text={'Trace price*'}
        isLightThemeColor
        size={'1.8'}
        styles={{ ...styles.traceLabel, marginTop: hp('2') }}
      />

      <View
        style={{
          ...styles.traceNameBox,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <TextInput
          placeholder="Trace price"
          placeholderTextColor={'gray'}
          style={styles.traceNameInput}
          keyboardType="numeric"
          value={inputPrice}
          onChangeText={e => onChangeVal('inputPrice', e)}
        />
        <TextComponent text={'$'} />
      </View>
      <TextComponent
        text={'Name the trace'}
        isLightThemeColor
        size={'1.8'}
        styles={{ ...styles.traceLabel, marginTop: hp('2') }}
      />
      <View style={styles.traceNameBox}>
        <TextInput
          placeholder="Trace name"
          placeholderTextColor={'gray'}
          style={styles.traceNameInput}
          value={inputName}
          onChangeText={e => onChangeVal('inputName', e)}
          maxLength={31}
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
