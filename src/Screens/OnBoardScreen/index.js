import React, { memo, useCallback } from 'react';
import {
  View,
  FlatList,
  Dimensions,
  Image,
  ScrollView,
  ImageBackground,
  Text,
} from 'react-native';
import useOnboardScreen from './useOnboardScreen';
import { keyExtractor } from '../../Utils';
import { hp, wp } from '../../Hooks/useResponsive';
import { TextComponent } from '../../Components/TextComponent';
import { Touchable } from '../../Components/Touchable';
import { arrow, onboardOne } from '../../Assets';
import { styles } from './styles';
import ThemeButton from '../../Components/ThemeButton';

const OnboardScreen = ({ navigation }) => {
  const {
    onBoardingData,
    currentIndex,
    onSnapToItem,
    goNext,
    flatListRef,
    getStart,
  } = useOnboardScreen(navigation);
  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <View style={styles.bannerImg} source={item?.image}>
          <Image
            source={item?.image}
            resizeMode="contain"
            style={{ width: wp('90'), height: hp('40') }}
          />
          <View style={styles.centerMainView}>
            <TextComponent
              numberOfLines={2}
              text={item?.heading}
              styles={styles.hdStyle}
            />
            <TextComponent text={item?.description} styles={styles.descStyle} />
          </View>
        </View>
      );
      // );
    },
    [currentIndex],
  );
  const renderItemDots = useCallback(
    ({ item, index }) => {
      return <View style={styles.dot(currentIndex, index)} />;
    },
    [currentIndex],
  );
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flex: 1,
        position: 'relative',
        backgroundColor: 'white',
      }}
    >
      {/* <TextComponent
        text={'Skip'}
        fade
        styles={{ top: hp('5'), textAlign: 'right', marginRight: wp('5') }}
        onPress={getStart}
      /> */}
      <FlatList
        refreshing={false}
        ref={flatListRef}
        data={onBoardingData}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        horizontal
        scrollEnabled={true}
        onMomentumScrollEnd={onSnapToItem}
        keyExtractor={keyExtractor}
        pagingEnabled={true}
        contentContainerStyle={{
          flexDirection: 'row',
          paddingBottom: 0,
          height: hp('70'),
        }}
        style={{ paddingBottom: 0 }}
      />
      <View style={styles.bottomContainer}>
        <FlatList
          data={onBoardingData} // Use the same data for the dots
          renderItem={renderItemDots}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dotList}
        />
      </View>
      <ThemeButton
        title={'Next'}
        style={styles.thmBtn}
        isTheme
        onPress={goNext}
      />
    </ScrollView>
  );
};

export default memo(OnboardScreen);
