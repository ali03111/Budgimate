import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Image,
  Switch,
} from 'react-native';
import React, { memo, useState } from 'react';
import { calendar, LoginBg, takePhoto, uploadPhoto } from '../../Assets';
import { styles } from './styles';
import { HeaderComponent } from '../../Components/HeaderComp';
import { hp, wp } from '../../Hooks/useResponsive';
import { TextComponent } from '../../Components/TextComponent';
import { MultiView } from '../../Components/MultiView';
import { MultiSelectButton } from '../../Components/MultiSelectButton';
import { Colors } from '../../Theme/Variables';
import { Controller } from 'react-hook-form';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialIcons'; // or Feather, Ionicons, etc.
import { Touchable } from '../../Components/Touchable';
import ThemeButton from '../../Components/ThemeButton';
import KeyBoardWrapper from '../../Components/KeyBoardWrapper';
import useAddIncomeScreen from './useAddIncomeScreen';

const AddIncomeScreen = () => {
  const { control, handleSubmit, errors, onSubmit, inputWidth, setInputWidth } =
    useAddIncomeScreen();

  const arryView = [
    {
      id: 1,
      title: `One-time`,
    },
    {
      id: 1,
      title: `Daily`,
    },
    {
      id: 1,
      title: `Weekly`,
    },
    {
      id: 1,
      title: `Monthly`,
    },
  ];

  const bottomView = [
    {
      title: '75% of budget exceeded',
      rightChilderView: (
        <Switch
          trackColor={{
            false: Colors.grayFaded,
            true: 'transparent',
          }}
          // thumbColor={userData?.privacy == 1 ? Colors.primaryColor : '#EAF6ED'}
          ios_backgroundColor="#EAF6ED"
          // onValueChange={privateTheProfile}
          // value={Boolean(userData?.privacy == 1)}
          style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }} // Adjust the scale as needed
        />
      ),
    },
    {
      title: 'Budget over spend',
      rightChilderView: (
        <Switch
          trackColor={{
            false: Colors.grayFaded,
            true: 'transparent',
          }}
          // thumbColor={userData?.privacy == 1 ? Colors.primaryColor : '#EAF6ED'}
          ios_backgroundColor="#EAF6ED"
          // onValueChange={privateTheProfile}
          // value={Boolean(userData?.privacy == 1)}
          style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }} // Adjust the scale as needed
        />
      ),
    },
  ];

  const TitleInputView = ({
    title,
    onChange,
    placeHolder,
    validation,
    rightView,
    innerViewOuterStyle,
    innerExtraView,
    titleStyle,
    innerLeftView,
    centerInnerView,
    errorName,
    errorView,
  }) => {
    return (
      <View style={styles.mainView}>
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: rightView ? 'space-between' : 'flex-start',
            alignItems: 'center',
          }}
        >
          <TextComponent
            text={title}
            fade={true}
            styles={{
              ...styles.compTitle,
              ...titleStyle,
            }}
          />
          {rightView}
        </View>
        {centerInnerView ? (
          centerInnerView
        ) : (
          <>
            <View
              style={{
                ...styles.innerView,
                ...innerViewOuterStyle,
              }}
            >
              {innerLeftView}
              {innerExtraView}
            </View>
            {errorName && (
              <TextComponent
                text={errorName.message}
                styles={styles.errorText}
              />
            )}
          </>
        )}
      </View>
    );
  };

  return (
    <ImageBackground source={LoginBg} style={styles.ImgBg}>
      <HeaderComponent isBack headerTitle={'Add Income'} />
      <KeyBoardWrapper styles={{ paddingBottom: hp('10') }}>
        <View style={styles.priceMainView}>
          <View style={styles.priceInnerView}>
            <TextComponent text={'$'} size={'2.5'} />

            <TextInput
              placeholder="0"
              onChangeText={text => {
                setInputWidth(Math.max(20, text.length * 14)); // increase width based on content
              }}
              style={{
                fontSize: hp('2.5'),
                color: 'black',
                width: inputWidth,
              }}
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
          <View style={styles.priceTimeView}>
            <MultiSelectButton
              isDisable={true}
              items={arryView}
              btnStyle={styles.priceMultiView}
              textStyle={{
                fontSize: hp('1.2'),
                color: 'black',
                color: Colors.primaryColor,
              }}
            />
          </View>
        </View>
        <TitleInputView
          title={'Income source'}
          //   errorName={errors['eventTitle']}
          innerLeftView={
            <Controller
              control={control}
              name="eventTitle"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.inputStyle}
                  placeholder="Enter expense name"
                  maxLength={50}
                  placeholderTextColor={'gray'}
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          }
        />
        <TitleInputView
          title={'Starting period'}
          //   errorName={errors['eventTitle']}
          centerInnerView={
            <Controller
              control={control}
              name="eventStartDate"
              render={({ field: { onChange, value } }) => (
                <Touchable
                  style={styles.textTouchBtn}
                  onPress={
                    () => {}
                    // toggleDate('eventStartDate', 'date', null, onChange)
                  }
                >
                  <TextComponent
                    text={'DD / MM / YYYY'}
                    // text={formatDateToLong(value ?? currentDate)}
                    styles={styles.textStyle}
                    size={'1.2'}
                  />
                  <Image
                    source={calendar}
                    resizeMode="contain"
                    style={styles.calenderIcon}
                  />
                </Touchable>
              )}
            />
          }
        />
        <TitleInputView
          title={'Ending period'}
          //   errorName={errors['eventTitle']}
          centerInnerView={
            <Controller
              control={control}
              name="eventStartDate"
              render={({ field: { onChange, value } }) => (
                <Touchable
                  style={styles.textTouchBtn}
                  onPress={
                    () => {}
                    // toggleDate('eventStartDate', 'date', null, onChange)
                  }
                >
                  <TextComponent
                    text={'DD / MM / YYYY'}
                    // text={formatDateToLong(value ?? currentDate)}
                    styles={styles.textStyle}
                    size={'1.2'}
                  />
                  <Image
                    source={calendar}
                    resizeMode="contain"
                    style={styles.calenderIcon}
                  />
                </Touchable>
              )}
            />
          }
        />
        <ThemeButton
          title={'Saves income'}
          isTheme
          style={styles.saveBtn}
          textStyle={{ fontSize: hp('1.5') }}
        />
      </KeyBoardWrapper>
    </ImageBackground>
  );
};

export default memo(AddIncomeScreen);
