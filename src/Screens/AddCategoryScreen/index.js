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

const AddCategoryScreen = ({ navigation }) => {
  const { control, handleSubmit, errors, onSubmit, inputWidth, setInputWidth } =
    useAddCategoryScreen();

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
        <View style={styles.categoryContainer}>
          <TextComponent text={'Grocery'} size={'1.5'} />
          <Image
            source={arrRightPurple}
            resizeMode="contain"
            style={{ width: wp('3'), height: hp('2') }}
            tintColor={Colors.dkBorderColor}
          />
        </View>
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
          onPress={() => navigation.navigate('AddExpenseToCategoryScreen')}
        />
      </ScrollView>
    </ImageBackground>
  );
};

export default memo(AddCategoryScreen);
