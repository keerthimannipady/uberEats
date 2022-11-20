import React, {Component, useEffect, useState} from 'react';
import HeaderTab from '../components/home/HeaderTab';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Divider} from 'react-native-elements';

import SearchBar from '../components/home/SearchBar';
import Categories from '../components/home/Categories';
import RestaurantItems, {
  localRestaurants,
} from '../components/home/Restaurantitem';
import BottomTabs from '../components/home/BottomTabs';

const YELP_API_KEY =
  'mpPFbpPWbFWEpr0zf_FfZReVE_-jrAn1a5K5jraNdpjJtGfG8RYwhbQSsSPsG2C43YaVKTA9G8h3-G7mlmu6IhOiyMeuHiZU4dx1iH5bYmyIuwIG99vvSYFF-0M5Y3Yx';

export default function Home({navigation}) {
  const [restaurantData, setRestaurantData] = useState(localRestaurants);
  const [city, setCity] = useState('San Francisco');
  const [activeTab, setActivetab] = useState('Delivery');

  const getRestaurantsFromYelp = () => {
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;

    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    };

    return fetch(yelpUrl, apiOptions)
      .then(res => res.json())
      .then(json => {
        setRestaurantData(
          json.businesses.filter(business =>
            business.transactions.includes(activeTab.toLowerCase())
          )
        );
      });
  };
  useEffect(() => {
    getRestaurantsFromYelp();
  }, [city, activeTab]);

  return (
    <SafeAreaView style={{backgroundColor: '#eee', flex: 1}}>
      <View style={{padding: 15, backgroundColor: 'white'}}>
        <HeaderTab activeTab={activeTab} setActivetab={setActivetab} />
        <SearchBar />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <RestaurantItems
          restaurantData={restaurantData}
          navigation={navigation}
        />
      </ScrollView>
      <Divider width={2} />
      <BottomTabs />
    </SafeAreaView>
  );
}
