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
import useAddGoalScreen from './useAddGoalScreen';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialIcons'; // or Feather, Ionicons, etc.
import { Touchable } from '../../Components/Touchable';
import ThemeButton from '../../Components/ThemeButton';
import KeyBoardWrapper from '../../Components/KeyBoardWrapper';
import {
  formatDateToLong,
  getCustom12HourTime,
  uploadFromCamera,
  uploadFromGalary,
} from '../../Services/GlobalFunctions';
import DatePicker from 'react-native-date-picker';

const AddGoalScreen = ({ navigation }) => {
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
    createGoalFun,
  } = useAddGoalScreen();

  const arryView = [
    {
      id: `Income`,
      title: `Income`,
    },
    {
      id: 'Savings',
      title: `Savings`,
    },
    {
      id: 'Weekly',
      title: `Weekly`,
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
      <HeaderComponent isBack headerTitle={'Set a goal'} />
      <KeyBoardWrapper styles={{ paddingBottom: hp('10') }}>
        <View style={styles.priceMainView}>
          <View style={styles.priceInnerView}>
            <TextComponent text={'$'} size={'2.5'} />
            <Controller
              control={control}
              name="goalPrice"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="0"
                  onChangeText={text => {
                    onChange(text); // increase width based on content
                  }}
                  style={{
                    fontSize: hp('2.5'),
                    color: 'black',
                    // width: value ?? inputWidth,
                  }}
                  value={value}
                  placeholderTextColor={'gray'}
                  keyboardType="numeric"
                  maxLength={10}
                />
              )}
            />
          </View>
          <TextComponent
            text={'Set amount for your goal allocate from'}
            fade
            size={'1.5'}
            styles={styles.addIncomeText}
          />
          <Controller
            control={control}
            name="goalType"
            render={({ field: { onChange, value } }) => (
              <View style={styles.priceTimeView}>
                <MultiSelectButton
                  items={arryView}
                  selectedAlter={value} // currently selected
                  onSelectVal={(i, val) => onChange(val)} // update form field
                  btnStyle={styles.priceMultiView}
                  isPrimaryColorStyle={true}
                />
              </View>
            )}
          />
        </View>
        <TitleInputView
          title={'Goal name'}
          //   errorName={errors['eventTitle']}
          innerLeftView={
            <Controller
              control={control}
              name="goalName"
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
          title={'Target completion date'}
          //   errorName={errors['eventTitle']}
          centerInnerView={
            <Controller
              control={control}
              name="targetCompleteDate"
              render={({ field: { onChange, value } }) => (
                <Touchable
                  style={styles.textTouchBtn}
                  onPress={() => toggleDate('targetCompleteDate')}
                >
                  <TextComponent
                    // text={'DD / MM / YYYY'}
                    text={formatDateToLong(value) ?? 'DD / MM / YYYY'}
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
          mainViewStyles={{ marginTop: hp('-1'), paddingBottom: hp('2') }}
          title={'Notes'}
          //   errorName={errors['specialNotes']}
          centerInnerView={
            <Controller
              control={control}
              name="note"
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputView}>
                  <TextInput
                    style={{
                      overflow: 'scroll',
                      alignSelf: 'flex-start',
                      color: 'black',
                      fontSize: hp('1.5'),
                    }}
                    placeholder="Write here..."
                    maxLength={50}
                    placeholderTextColor={'gray'}
                    value={value}
                    onChangeText={onChange}
                  />
                </View>
              )}
            />
          }
        />
        <Controller
          control={control}
          name="eventImg"
          render={({ field: { onChange, value } }) => (
            <TitleInputView
              title={'Upload Receipt'}
              //   errorName={errors['eventTitle']}
              centerInnerView={
                <Controller
                  control={control}
                  name="eventStartDate"
                  render={({ field: { onChange, value } }) =>
                    value?.uri ? (
                      <Image
                        source={{
                          uri: value?.isEdit
                            ? imageUrl(value?.uri)
                            : value?.uri,
                        }}
                        style={{
                          width: wp('90'),
                          height: hp('20'),
                          borderRadius: 15,
                        }}
                      />
                    ) : (
                      <View
                        style={{
                          ...styles.textTouchBtn,
                          height: 'auto',
                          paddingHorizontal: wp('10'),
                        }}
                      >
                        <Touchable
                          onPress={async () => {
                            const imgData = await uploadFromGalary();
                            onChange(imgData);
                          }}
                        >
                          <Image
                            source={uploadPhoto}
                            resizeMode="contain"
                            style={styles.uploadImg}
                          />
                        </Touchable>
                        <Touchable
                          onPress={async () => {
                            const imgData = await uploadFromCamera();
                            onChange(imgData);
                          }}
                        >
                          <Image
                            source={takePhoto}
                            resizeMode="contain"
                            style={styles.uploadImg}
                          />
                        </Touchable>
                      </View>
                    )
                  }
                />
              }
            />
          )}
        />
        <ThemeButton
          title={'Set goal'}
          isTheme
          style={styles.saveBtn}
          textStyle={{ fontSize: hp('1.5') }}
          // onPress={handleSubmit(createGoalFun)}
          onPress={() => navigation.goBack()}
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

export default memo(AddGoalScreen);
