import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { memo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import API from '../../Utils/helperFunc';
import { Touchable } from '../../Components/Touchable';
import { arrLeft, crossWhite, searchIcon } from '../../Assets';
import { Colors } from '../../Theme/Variables';
import { hp, wp } from '../../Hooks/useResponsive';
import { styles } from './styles';
import { imageUrl } from '../../Utils/Urls';

const CatViewScreen = ({ navigation, route }) => {
  const { onSelectValue, selectedValue, urlName, isMultiSelect } =
    route?.params;

  const { data, error } = useQuery({
    queryKey: [urlName],
    queryFn: () => API.get(urlName),
  });

  const [selectedList, setSelectedList] = useState(selectedValue);

  const toggleAllergy = allergy => {
    console.log('selectedAllergies:', selectedList);
    if (isMultiSelect) {
      const foundAllergy = selectedList.find(res => res?.id === allergy?.id);

      if (foundAllergy) {
        setSelectedList(selectedList.filter(item => item?.id !== allergy?.id));
      } else {
        setSelectedList([...selectedList, allergy]);
      }
    } else if (!isMultiSelect) {
      const foundAllergy = selectedList.find(res => res?.id === allergy?.id);

      if (foundAllergy) {
        setSelectedList(selectedList.filter(item => item?.id !== allergy?.id));
      } else {
        setSelectedList([allergy]);
        navigation.goBack();
        onSelectValue(allergy);
      }
    }
  };

  console.log(
    'datadatadatadatadatadatadatadatadatadatadatadatadatadata',
    data?.data,
  );

  const [filterData, setFilterData] = useState([]);
  const [text, setText] = useState('');

  function searchFun(e) {
    var text = e;
    if (text && data?.data?.length > 0) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = data?.data.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = (item.name || '').toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      console.log('newDatanewDatanewDatanewData', newData);
      setFilterData(newData);
      setText(text);
    } else {
      setFilterData(data?.data ?? []);
      setText(text);
    }
  }

  return (
    <View style={styles.mainView}>
      <View>
        <View style={styles.headerMain}>
          <Touchable
            onPress={() => {
              navigation.goBack();
              if (isMultiSelect) onSelectValue(selectedList);
              else onSelectValue(...selectedList);
            }}
          >
            <Image
              source={arrLeft}
              style={styles.arrBack}
              tintColor={Colors.backgroundTheme}
            />
          </Touchable>
          {/* <TextComponent
            text={'Save'}
            styles={styles.saveText}
            onPress={() => {
              navigation.goBack();
              if (isMultiSelect) onSelectValue(selectedList);
              else onSelectValue(...selectedList);
            }}
          /> */}
        </View>
        <View style={styles.searchMain}>
          <Image
            source={searchIcon}
            style={styles.inputImage}
            tintColor={Colors.backgroundTheme}
          />
          <TextInput
            style={styles.inputStyle}
            placeholder={'Search'}
            placeholderTextColor={Colors.textGray}
            value={text}
            onChangeText={e => searchFun(e)}
          />
        </View>
      </View>
      <ScrollView
        contentContainerStyle={styles.btnsMain}
        showsVerticalScrollIndicator={false}
      >
        {/* <MultiSelectButton
          items={filterData.length >= 0 && text != '' ? filterData : data?.data}
          onSelectVal={(objId, item) => toggleAllergy(item)}
          objId={urlName}
          selectedAlter={selectedList}
          isMultipule={true}
          leftChildComp={
            <Image
              source={crossWhite}
              resizeMode="contain"
              style={{
                width: wp('3'),
                height: hp('5'),
                marginLeft: wp('3'),
              }}
            />
          }
        /> */}
        {data?.data != null &&
          data?.data?.length > 0 &&
          (filterData.length >= 0 && text != '' ? filterData : data?.data)?.map(
            (item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => toggleAllergy(item)}
                style={{
                  alignItems: 'center',
                  backgroundColor: Colors.white,
                  borderRadius: wp('2'),
                  marginVertical: hp('1'),
                  marginHorizontal: wp('2'),
                  width: wp('26.5'),
                  height: hp('11'),
                  alignContent: 'center',
                  justifyContent: 'center',
                  borderColor: selectedList?.some(res => res?.id === item?.id)
                    ? Colors?.primaryColor
                    : 'white',
                  borderWidth: selectedList?.some(res => res?.id === item?.id)
                    ? 1
                    : 0,
                }}
              >
                {/* Image on the left */}
                <Image
                  source={{ uri: imageUrl(item?.icon) }} // Replace with actual placeholder image
                  resizeMode="contain"
                  style={{
                    width: wp('10'),
                    height: hp('5'),
                    // marginRight: wp('3'),
                  }}
                />
                {/* Text on the right */}
                <Text
                  style={{
                    // flex: 1,
                    fontSize: wp('4'),
                    color: 'black',
                    fontWeight: '500',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    marginTop: hp(0.5),
                  }}
                  numberOfLines={3}
                >
                  {item?.name ??
                    item?.agency_name ??
                    item?.category_name ??
                    item}
                </Text>
              </TouchableOpacity>
            ),
          )}
      </ScrollView>
    </View>
  );
};

export default memo(CatViewScreen);
