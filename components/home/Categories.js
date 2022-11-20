import {View, Text, ScrollView, Image} from 'react-native';
import React from 'react';

export default function Categories() {
  const items = [
    {
      image: require('../../assets/images/shopping-bag.png'),
      text: 'Pick-up',
      item: '0',
    },
    {
      image: require('../../assets/images/soft-drink.png'),
      text: 'Soft Drinks',
      item: '1',
    },
    {
      image: require('../../assets/images/bread.png'),
      text: 'Bread',
      item: '2',
    },
    {
      image: require('../../assets/images/fast-food.png'),
      text: 'Fast Food',
      item: '3',
    },
    ,
    {
      image: require('../../assets/images/deals.png'),
      text: 'Deals',
      item: '4',
    },
    ,
    {
      image: require('../../assets/images/coffee.png'),
      text: 'Cofee and Tea',
      item: '5',
    },
    {
      image: require('../../assets/images/desserts.png'),
      text: 'Deserts',
      item: '6',
    },
  ];
  return (
    <View
      style={{
        marginTop: 5,
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingLeft: 20,
      }}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items.map((item, index) => (
          <View style={{alignItems: 'center', marginRight: 30}} key={item.item}>
            <Image
              source={item.image}
              style={{width: 50, height: 40, resizeMode: 'contain'}}
            />
            <Text style={{fontSize: 13, fontWeight: '900'}}>{item.text}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
