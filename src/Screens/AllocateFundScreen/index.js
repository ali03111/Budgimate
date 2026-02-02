import {
  View,
  Text,
  ImageBackground,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';
import React, { memo, useCallback } from 'react';
import { HeaderComponent } from '../../Components/HeaderComp';
import { LoginBg } from '../../Assets';
import { hp, wp } from '../../Hooks/useResponsive';
import { TextComponent } from '../../Components/TextComponent';
import ThemeButton from '../../Components/ThemeButton';
import PlusCardComp from '../../Components/plusCardComp';
import { keyExtractor } from '../../Utils';
import useAllocateFundScreen from './useAllocateFundScreen';
import { formatPrice } from '../../Services/GlobalFunctions';
import AllocateCompleteModal from '../../Components/AllocateCompleteModal';
import { imageUrl } from '../../Utils/Urls';
import ModalViewComp from '../../Components/ModalViewComp';
import { Colors } from '../../Theme/Variables';
import { styles } from './styles';

const AllocateFundScreen = ({ navigation }) => {
  const {
    leftover,
    categories,

    modalVisible,
    setModalVisible,
    afterAdd,
    setAfterAdd,
    addAllocate,
    inputWidth,
    setInputWidth,
    onChangeVal,
    inputPrice,
    categories_leftover,
  } = useAllocateFundScreen(navigation);
  const renderData = useCallback(({ item, index }) => {
    return (
      <PlusCardComp
        remaining={`Remaining : ${formatPrice(item?.leftover)} of ${formatPrice(
          item?.limit_amount,
        )}`}
        category={item?.name}
        rightText={'Allocate funds'}
        img={{ uri: imageUrl(item?.icon) }}
        onPress={() => {
          if (leftover > 0) {
            navigation.navigate('AllocateSelectorScreen', {
              leftOver: item?.leftover,
              expCatId: item?.expense_category_id,
            });
          }
        }}
      />
    );
  }, []);

  return (
    <ImageBackground style={{ flex: 1 }} source={LoginBg}>
      <HeaderComponent headerTitle={'Allocate Leftover'} isBack />
      <View
        style={{
          width: wp('95'),
          borderRadius: 10,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: hp('3'),
          alignSelf: 'center',
        }}
      >
        <TextComponent
          text={`Total Leftover Amount ${formatPrice(leftover)}`}
          size={'1.8'}
          family={'bold'}
        />
        <TextComponent
          text={`Your leftover amount is ${formatPrice(
            leftover,
          )}, from last cycle. You can allocate all funds to your income, goals, traces and increase spending limits.`}
          fade
          size={'1.3'}
          styles={{ width: wp('75'), textAlign: 'center', marginTop: hp('1') }}
        />
        {leftover > 0 && (
          <ThemeButton
            title={'Allocate all'}
            isTheme
            style={{ width: wp('40'), marginTop: hp('3'), height: hp('4') }}
            textStyle={{ fontSize: hp('1.5') }}
            onPress={() =>
              navigation.navigate('AllocateSelectorScreen', {
                leftOver: leftover,
              })
            }
          />
        )}
      </View>
      <TextComponent
        text={'Leftover from Last Cycle'}
        size={'1.8'}
        family={'600'}
        styles={{ marginTop: hp('3'), marginLeft: wp('3') }}
      />
      <FlatList
        data={categories}
        keyExtractor={keyExtractor}
        renderItem={renderData}
        contentContainerStyle={{ alignSelf: 'center', paddingBottom: hp('5') }}
        //   contentContainerStyle={{ flex: 1 }}
      />

      {Boolean(modalVisible != null) && (
        <ModalViewComp
          isModal={Boolean(modalVisible != null)}
          heading={'Allocate Funds to Expense'}
          childrenComp={
            <View>
              <TextComponent text={'Expense name'} isDarkTheme size={'2'} />

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
            </View>
          }
          btnTitle={'Save'}
          onBackPress={() => setModalVisible(null)}
          onPress={() => {
            setModalVisible(null);
            addAllocate(modalVisible);
          }}
          // onBackPress={}
        />
      )}
    </ImageBackground>
  );
};

export default memo(AllocateFundScreen);
