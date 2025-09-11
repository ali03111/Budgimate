import {
  View,
  Text,
  ImageBackground,
  FlatList,
  Pressable,
  TextInput,
} from 'react-native';
import React, { memo, useCallback } from 'react';
import { LoginBg } from '../../Assets';
import { HeaderComponent } from '../../Components/HeaderComp';
import ThemeButton from '../../Components/ThemeButton';
import { TextComponent } from '../../Components/TextComponent';
import { styles } from './styles';
import GoalCardComp from '../../Components/GoalCardComp';
import { keyExtractor } from '../../Utils';
import { hp, wp } from '../../Hooks/useResponsive';
import useAllocateToGoalsScreen from './useAllocateToGoalsScreen';
import BtnModalComponent from '../../Components/BtnModalComp';
import ModalViewComp from '../../Components/ModalViewComp';

const AllocateToGoalsScreen = () => {
  const { modalVisible, setModalVisible } = useAllocateToGoalsScreen();

  const renderItem = useCallback((item, index) => {
    return (
      <Pressable>
        <GoalCardComp
          key={index}
          mainView={{ marginVertical: hp('1') }}
          isDisable
        />
      </Pressable>
    );
  }, []);

  return (
    <ImageBackground source={LoginBg} style={{ flex: 1 }}>
      <HeaderComponent headerTitle={'Allocate Leftover to Goal'} isBack />
      <ThemeButton
        title={'Total Leftover: $250'}
        isTransparent
        style={styles.themeButton}
        textStyle={styles.themeButtonText}
      />
      <TextComponent
        text={
          'Add leftover amount of $250 or less, from “Last cycle” to your “Goals”.'
        }
        fade
        styles={styles.textComponent}
        size={'1.3'}
      />
      <FlatList
        data={[1, 2, 3]}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
      {modalVisible && (
        <ModalViewComp
          isModal={modalVisible}
          heading={'Allocate Funds to Goal'}
          childrenComp={
            <View>
              <TextComponent text={'Emergency fund'} />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  marginTop: hp('2'),
                }}
              >
                <TextComponent
                  text={'$34,700 raised'}
                  size={'1.3'}
                  family={'500'}
                />
                <TextComponent
                  text={'$45,300 left of $80,000'}
                  size={'1.3'}
                  family={'500'}
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
          btnTitle={'Add funds'}
          onBackPress={() => setModalVisible(false)}
          onPress={() => setModalVisible(false)}
          // onBackPress={}
        />
      )}
    </ImageBackground>
  );
};

export default memo(AllocateToGoalsScreen);
