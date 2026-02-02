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
import { formatPrice } from '../../Services/GlobalFunctions';
import AllocateCompleteModal from '../../Components/AllocateCompleteModal';

const AllocateToGoalsScreen = ({ navigation, route }) => {
  const {
    modalVisible,
    setModalVisible,
    onChangeVal,
    inputPrice,
    inputWidth,
    setInputWidth,
    addAllocate,
    goalList,
    afterAdd,
    setAfterAdd,
  } = useAllocateToGoalsScreen(navigation, route);

  const renderItem = useCallback(({ item, index }) => {
    return (
      <Pressable onPress={() => setModalVisible(item?.id)}>
        <GoalCardComp
          key={index}
          item={item}
          mainView={{ marginVertical: hp('1') }}
          type={route?.params?.type}
          isDisable
          onViewDetail={true}
        />
      </Pressable>
    );
  }, []);

  return (
    <ImageBackground source={LoginBg} style={{ flex: 1 }}>
      <HeaderComponent headerTitle={'Allocate Leftover to Goal'} isBack />
      <ThemeButton
        title={`Total Leftover: ${formatPrice(route?.params?.leftOver)}`}
        isTransparent
        style={styles.themeButton}
        textStyle={styles.themeButtonText}
      />
      <TextComponent
        text={`Add leftover amount of ${formatPrice(
          route?.params?.leftOver,
        )} or less, from “Last cycle” to your “Goals”.`}
        fade
        styles={styles.textComponent}
        size={'1.3'}
      />
      <FlatList
        data={goalList}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={{ paddingBottom: hp('10') }}
      />
      {Boolean(modalVisible != null) && (
        <ModalViewComp
          isModal={Boolean(modalVisible != null)}
          heading={'Allocate Funds to Goal'}
          childrenComp={
            <View>
              <TextComponent text={'Emergency fund'} />
              {/* <View
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
              </View> */}
              <View
                style={{
                  ...styles.traceNameBox,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <TextInput
                  placeholder="Enter amount"
                  placeholderTextColor={'gray'}
                  style={styles.traceNameInput}
                  keyboardType="numeric"
                  value={inputPrice}
                  onChangeText={e => onChangeVal('inputPrice', e)}
                />
                <TextComponent text={'$'} />
              </View>
              {/* <View style={styles.priceMainView}>
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
              </View> */}
            </View>
          }
          btnTitle={'Add funds'}
          onBackPress={() => setModalVisible(null)}
          onPress={() => {
            addAllocate(modalVisible);
            setModalVisible(null);
          }}
          // onBackPress={}
        />
      )}
      <AllocateCompleteModal
        isModal={afterAdd}
        onClose={() => setAfterAdd(false)}
      />
    </ImageBackground>
  );
};

export default memo(AllocateToGoalsScreen);
