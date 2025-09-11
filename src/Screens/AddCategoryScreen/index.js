import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Image,
  TextInput,
  Switch,
} from 'react-native';
import React, { memo } from 'react';
import { arrRight, arrRightPurple, LoginBg } from '../../Assets';
import { HeaderComponent } from '../../Components/HeaderComp';
import { TextComponent } from '../../Components/TextComponent';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';
import { styles } from './styles';
import useAddCategoryScreen from './useAddCategoryScreen';
import { MultiView } from '../../Components/MultiView';
import ThemeButton from '../../Components/ThemeButton';
import ListViewScreen from '../../Components/ListViewComp';
import BtnModalComponent from '../../Components/BtnModalComp';
import { Touchable } from '../../Components/Touchable';

const AddCategoryScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    errors,
    onSubmit,
    inputWidth,
    setInputWidth,
    catData,
    modalState,
    setModalState,
    onChangeVal,
    isBudgmetLimit,
    isOverSpend,
    selectedCat,
    priceInput,
  } = useAddCategoryScreen();

  const bottomView = [
    {
      title: '75% of budget exceeded',
      rightChilderView: (
        <Switch
          trackColor={{
            false: Colors.grayFaded,
            true: 'transparent',
          }}
          thumbColor={isBudgmetLimit ? Colors.primaryColor : '#EAF6ED'}
          ios_backgroundColor="#EAF6ED"
          onValueChange={e => onChangeVal('isBudgmetLimit', e)}
          value={isBudgmetLimit}
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
          thumbColor={isOverSpend ? Colors.primaryColor : '#EAF6ED'}
          ios_backgroundColor="#EAF6ED"
          onValueChange={e => onChangeVal('isOverSpend', e)}
          value={isOverSpend}
          style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }} // Adjust the scale as needed
        />
      ),
    },
  ];

  return (
    <ImageBackground source={LoginBg} style={{ flex: 1 }}>
      <HeaderComponent headerTitle={'Add Categories'} isBack />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: wp('2'),
          paddingTop: hp('2'),
        }}
        showsVerticalScrollIndicator={false}
      >
        <TextComponent
          text={'Category'}
          family={'400'}
          isThemeColor
          size={'1.5'}
        />
        <Touchable
          style={styles.categoryContainer}
          onPress={() => setModalState(true)}
        >
          <TextComponent
            text={selectedCat?.name ?? 'Please select category'}
            size={'1.5'}
          />
          <Image
            source={arrRightPurple}
            resizeMode="contain"
            style={{ width: wp('3'), height: hp('2') }}
            tintColor={Colors.dkBorderColor}
          />
        </Touchable>
        <View style={styles.priceMainView}>
          <View style={styles.priceInnerView}>
            <TextComponent text={'$'} size={'2.5'} />

            <TextInput
              placeholder="0"
              onChangeText={text => {
                setInputWidth(Math.max(20, text.length * 14)); // increase width based on content
                onChangeVal('priceInput', text);
              }}
              style={{
                fontSize: hp('2.5'),
                color: 'black',
                width: inputWidth,
              }}
              placeholderTextColor={'gray'}
              keyboardType="numeric"
              value={priceInput}
            />
          </View>
          <TextComponent
            text={'Set amount limit for your category'}
            fade
            size={'1.5'}
            styles={styles.addIncomeText}
          />
        </View>
        <TextComponent
          text={'In - app notification'}
          isThemeColor
          size={'1.5'}
          styles={styles.inAppNotiText}
        />
        <MultiView
          data={bottomView}
          titleStyles={{
            fontSize: hp('1.5'),
            color: Colors.textGray,
            width: wp('85'),
          }}
        />
        <ThemeButton
          title={'Continue'}
          isTheme
          onPress={() =>
            navigation.navigate('AddExpenseToCategoryScreen', {
              catVal: selectedCat,
              price: priceInput,
            })
          }
          style={{ marginTop: hp('-5') }}
        />
      </ScrollView>
      {modalState && (
        <BtnModalComponent
          activeTags={[selectedCat]}
          allData={catData}
          //   heading={onPressKey}
          // activeTitle={'select Diet'}
          isModal={modalState}
          // onPress={() => setModalState(false)}
          // onSelect={e => {
          //   if (modalState == 1) {
          //     fetchCities(e);
          //   } else if (modalState == 2) {
          //     setSelectedCity(e);
          //     fetchAreas(e);
          //   } else if (modalState == 3) {
          //     setSelectedArea(e);
          //   }
          // }}
          onSelect={e => onChangeVal('selectedCat', e)}
          onBackPress={() => setModalState(null)}
        />
      )}
    </ImageBackground>
  );
};

export default memo(AddCategoryScreen);
