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
import {
  formatDateToLong,
  getCustom12HourTime,
} from '../../Services/GlobalFunctions';
import DatePicker from 'react-native-date-picker';

const AddIncomeScreen = ({ navigation, route }) => {
  const {
    control,
    handleSubmit,
    errors,
    onSubmit,
    inputWidth,
    setInputWidth,
    currentDate,
    toggleDate,
    datePicker,
  } = useAddIncomeScreen(navigation, route);

  const arryView = [
    { title: 'One-time', id: 'One_time' },
    { title: 'Daily', id: 'daily' },
    { title: 'Weekly', id: 'weekly' },
    { title: 'Monthly', id: 'monthly' },
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

  console.log('errorserrorserrorserrorserrorserrorserrorserrorserrors', errors);

  return (
    <ImageBackground source={LoginBg} style={styles.ImgBg}>
      <HeaderComponent isBack headerTitle={'Add Income'} />
      <KeyBoardWrapper styles={{ paddingBottom: hp('10') }}>
        <View style={styles.priceMainView}>
          <View style={styles.priceInnerView}>
            {/* <TextComponent text={'$'} size={'2.5'} /> */}
            <Controller
              control={control}
              name="incomePrice"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="0"
                  onChangeText={text => {
                    onChange(text); // increase width based on content
                  }}
                  style={{
                    fontSize: hp('3.5'),
                    color: 'black',
                    width: wp('85'),
                    alignSelf: 'center',
                    textAlign: 'center',
                    // backgroundColor: 'red',
                  }}
                  value={value}
                  placeholderTextColor={'gray'}
                  keyboardType="numeric"
                />
              )}
            />
          </View>
          <TextComponent
            text={'Add income amount'}
            fade
            size={'2'}
            styles={styles.addIncomeText}
          />
          <Controller
            control={control}
            name="incomeType"
            render={({ field: { onChange, value } }) => (
              <View style={styles.priceTimeView}>
                <MultiSelectButton
                  items={arryView}
                  selectedAlter={{ id: value }} // currently selected
                  onSelectVal={(i, val) => onChange(val?.id)} // update form field
                  // btnStyle={styles.priceMultiView}
                  isPrimaryColorStyle
                  // textStyle={{
                  //   fontSize: hp('1.2'),
                  //   color: Colors.primaryColor,
                  // }}
                />
              </View>
            )}
          />
        </View>
        <TitleInputView
          title={'Income source*'}
          errorName={errors['incomeSource']}
          innerLeftView={
            <Controller
              control={control}
              name="incomeSource"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.inputStyle}
                  placeholder="Enter income source"
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
          title={'Starting period*'}
          errorName={errors['startingPeriod']}
          centerInnerView={
            <>
              <Controller
                control={control}
                name="startingPeriod"
                render={({ field: { onChange, value } }) => (
                  <Touchable
                    style={styles.textTouchBtn}
                    onPress={() => toggleDate('startingPeriod')}
                  >
                    <TextComponent
                      // text={'DD / MM / YYYY'}
                      text={formatDateToLong(value) ?? 'DD / MM / YYYY'}
                      styles={styles.textStyle}
                      size={'1.5'}
                    />
                    <Image
                      source={calendar}
                      resizeMode="contain"
                      style={styles.calenderIcon}
                    />
                  </Touchable>
                )}
              />
              {errors['startingPeriod']?.message && (
                <TextComponent
                  text={errors['startingPeriod']?.message}
                  styles={styles.errorText}
                />
              )}
            </>
          }
        />
        <TitleInputView
          title={'Ending period*'}
          errorName={errors['endingPeriod']}
          centerInnerView={
            <>
              <Controller
                control={control}
                name="endingPeriod"
                render={({ field: { onChange, value } }) => (
                  <Touchable
                    style={styles.textTouchBtn}
                    onPress={() => toggleDate('endingPeriod')}
                  >
                    <TextComponent
                      text={formatDateToLong(value) ?? 'DD / MM / YYYY'}
                      // text={formatDateToLong(value ?? currentDate)}
                      styles={styles.textStyle}
                      size={'1.5'}
                    />
                    <Image
                      source={calendar}
                      resizeMode="contain"
                      style={styles.calenderIcon}
                    />
                  </Touchable>
                )}
              />
              <TextComponent
                text={errors['endingPeriod']?.message}
                styles={styles.errorText}
              />
            </>
          }
        />
        <ThemeButton
          title={'Save income'}
          isTheme
          style={styles.saveBtn}
          textStyle={{ fontSize: hp('1.5') }}
          onPress={handleSubmit(onSubmit)}
        />
      </KeyBoardWrapper>
      {datePicker.alertVal && (
        <Controller
          control={control}
          name={datePicker.stateName}
          render={({ field: { onChange, value } }) => {
            return (
              <DatePicker
                mode={'date'}
                open={datePicker?.alertVal ? datePicker.alertVal : false}
                date={value ?? currentDate}
                is24hourSource="locale"
                locale="en"
                onCancel={() => toggleDate(null)}
                modal
                onConfirm={e => {
                  const timeFormatted = getCustom12HourTime(e); // 'HH:mm'
                  onChange(e);
                  toggleDate(null);
                }}
              />
            );
          }}
        />
      )}
    </ImageBackground>
  );
};

export default memo(AddIncomeScreen);
