import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';
import MenuItems from '../components/restaurantDetails/MenuItems';
import firebase from 'firebase';
const OrderCompleted = ({}) => {
  const [lastOrder, setLastOrder] = useState({
    items: [
      {
        title: 'Bologna',
        description: 'With butter lettuce, tomato and sauce bechamel',
        price: '$13.50',
        image:
          'https://www.modernhoney.com/wp-content/uploads/2019/08/Classic-Lasagna-14-scaled.jpg',
      },
    ],
  });
  const {items, restaurantName} = useSelector(
    state => state.cartReducer.selectedItems
  );
  const total = items
    .map(item => Number(item.price.replace('$', '')))
    .reduce((prev, curr) => prev + curr, 0);

  const totalUSD = total.toLocaleString('en', {
    style: 'currency',
    currency: 'USD',
  });

  useEffect(() => {
    const db = firebase.firestore();
    db.collection('orders')
      .orderBy('createdAt', 'desc')
      .limit(1)
      .onSnapshot(snapShot => {
        snapShot.docs.map(doc => {
          setLastOrder(doc.data());
        });
      });
    return () => unsubscribe();
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: '5%',
        alignContent: 'center',
        backgroundColor: 'white',
      }}
    >
      {/* //greencheck ✔ */}
      <LottieView
        autoPlay
        speed={0.5}
        loop={false}
        style={{height: 100, alignSelf: 'center', marginBottom: 30}}
        source={require('../assets/animations/check-mark.json')}
      />
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 20,
          fontWeight: '500',
          textAlign: 'center',
        }}
      >
        Your ordert at {restaurantName} has been placed for ${totalUSD}
      </Text>
      {/* //🍳cooking */}
      <MenuItems hideCheckbox={true} foods={lastOrder.items} />
      <LottieView
        autoPlay
        speed={0.5}
        loop={false}
        style={{height: 100, alignSelf: 'center', marginBottom: 30}}
        source={require('../assets/animations/cooking.json')}
      />
    </SafeAreaView>
  );
};

export default OrderCompleted;

const styles = StyleSheet.create({});
