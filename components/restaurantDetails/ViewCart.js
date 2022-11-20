import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import OrderItem from './OrderItem';
import firebase from '../../firebase';
import LottieView from 'lottie-react-native';

export default function ViewCart({navigation}) {
  const [modalVisible, setModalVisbile] = useState(false);
  const {items, restaurantName} = useSelector(
    state => state.cartReducer.selectedItems
  );
  const [loading, setLoading] = useState(false);
  console.log('items', items);
  const total = items
    .map(item => Number(item.price.replace('$', '')))
    .reduce((prev, curr) => prev + curr, 0);
  const totalUSD = total.toLocaleString('en', {
    style: 'currency',
    currency: 'USD',
  });

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.7)',
    },
    checkoutContainer: {
      backgroundColor: 'white',
      padding: 16,
      height: 500,
      borderWidth: 1,
    },
    restaurantName: {
      textAlign: 'center',
      fontWeight: '600',
      fontSize: 18,
      marginBottom: 10,
    },
    subTotalContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 15,
    },
    subTotalText: {
      textAlign: 'left',
      fontWeight: '600',
      marginBottom: 10,
      fontSize: 15,
    },
  });
  console.log('totalUSD', totalUSD);

  const addOrderToFirebase = () => {
    setLoading(true);
    const db = firebase.firestore();
    db.collection('orders')
      .add({
        items: items,
        restaurantName: restaurantName,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setTimeout(() => {
          setLoading(false);
          navigation.navigate('OrderCompleted');
        }, 2500);
      });
  };
  const checkoutModalContent = () => {
    return (
      <View style={styles.modalContainer}>
        <View style={styles.checkoutContainer}>
          <Text style={styles.restaurantName}>{restaurantName}</Text>
          {items.map((item, index) => (
            <OrderItem key={index} item={item} />
          ))}
          <View style={styles.subTotalContainer}>
            <Text style={styles.subTotalText}>Subtotal</Text>
            <Text>{totalUSD}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity
              style={{
                marginTop: 20,
                backgroundColor: 'black',
                borderRadius: 30,
                width: 300,
                alignItems: 'center',
                padding: 13,
                borderRadius: 30,
                position: 'relative',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
              onPress={() => {
                addOrderToFirebase();

                setModalVisbile(false);
              }}
            >
              <Text style={{color: 'white', fontSize: 20}}>Checkout</Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  position: 'absolute',
                  right: 20,
                  top: 17,
                }}
              >
                {total ? `$${totalUSD}` : ''}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <Modal
        animationType='slide'
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisbile(false)}
      >
        {checkoutModalContent()}
      </Modal>
      {total ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            flexDirection: 'row',
            zIndex: 999,
            // buttom: 100,
            // bottom: 50,
            position: 'absolute',

            // position: 'absolute',
            bottom: 300,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <TouchableOpacity
              style={{
                marginTop: 20,
                backgroundColor: 'black',
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 15,
                borderRadius: 30,
                width: 300,
                padding: 13,
                position: 'relative',
                bottom: 20,
                alignItems: 'center',
                zIndex: 999,
              }}
              onPress={() => {
                setModalVisbile(true);
              }}
            >
              <Text style={{color: 'white', fontSize: 20}}>View Cart </Text>
              <Text style={{color: 'white', fontSize: 20}}> ${totalUSD}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      {loading ? (
        <View
          style={{
            backgroundColor: 'black',
            position: 'absolute',
            opacity: 0.6,
            justifyContent: 'center',
            alignItems: 'center',
            // flex: 1,
            height: '100%',
            width: '100%',
          }}
        >
          <LottieView
            style={{height: 200}}
            autoPlay
            speed={3}
            source={require('../../assets/animations/scanner.json')}
          ></LottieView>
        </View>
      ) : null}
    </>
  );
}
const styles = StyleSheet.create({});
