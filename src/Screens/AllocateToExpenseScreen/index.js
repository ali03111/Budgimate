import {
  View,
  Text,
  ImageBackground,
  FlatList,
  TextInput,
  Pressable,
} from 'react-native';
import React, { memo, useCallback } from 'react';
import { LoginBg } from '../../Assets';
import { HeaderComponent } from '../../Components/HeaderComp';
import ThemeButton from '../../Components/ThemeButton';
import { TextComponent } from '../../Components/TextComponent';
import { styles } from './styles';
import ExpenseProgressCard from '../../Components/ExpenseProgressCard';
import { keyExtractor } from '../../Utils';
import ModalViewComp from '../../Components/ModalViewComp';
import useAllocateToExpenseScreen from './useAllocateToExpenseScreen';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';

const AllocateToExpenseScreen = () => {
  const { modalVisible, setModalVisible } = useAllocateToExpenseScreen();
  const renderItem = useCallback(
    (item, index) => {
      return (
        <Pressable onPress={() => setModalVisible(true)}>
          <ExpenseProgressCard key={index} />
        </Pressable>
      );
    },
    [8],
  );
  return (
    <ImageBackground source={LoginBg} style={{ flex: 1 }}>
      <HeaderComponent headerTitle={'Allocate Leftover to Expense'} isBack />
      <ThemeButton
        title={'Leftover: $250'}
        isTransparent
        style={styles.themeButton}
        textStyle={styles.themeButtonText}
      />
      <TextComponent
        text={
          'Add leftover amount of $250 or less, from “Last cycle” to your “Expense categories”.'
        }
        fade
        styles={styles.textComponent}
        size={'1.3'}
      />
      <FlatList
        data={[1, 2, 3, 4]}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
      {modalVisible && (
        <ModalViewComp
          isModal={modalVisible}
          heading={'Allocate Funds to Goal'}
          childrenComp={
            <View>
              <TextComponent text={'Expense name'} isDarkTheme size={'1.8'} />
              <View
                style={{
                  width: wp('90'),
                  paddingVertical: hp('1'),
                  paddingHorizontal: wp('2'),
                  borderRadius: 10,
                  borderWidth: 0.5,
                  borderColor: Colors.dkBorderColor,
                  marginVertical: hp('1'),
                }}
              >
                <TextInput
                  placeholder="Enter expense name"
                  placeholderTextColor={Colors.textGray}
                  style={{ flex: 1, fontSize: hp('1.5') }}
                />
              </View>
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
            </View>
          }
          btnTitle={'Save'}
          onBackPress={() => setModalVisible(false)}
          onPress={() => setModalVisible(false)}
          // onBackPress={}
        />
      )}
    </ImageBackground>
  );
};

export default memo(AllocateToExpenseScreen);
