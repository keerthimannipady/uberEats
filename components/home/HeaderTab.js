import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
export default function HeaderTab(props) {
  return (
    <View style={{flexDirection: 'row', alignSelf: 'center', marginTop: '10%'}}>
      <HeaderButton
        text='Delivery'
        btnColor='black'
        textColor='white'
        activeTab={props.activeTab}
        setActivetab={props.setActivetab}
      />
      <HeaderButton
        text='Pickup'
        btnColor='white'
        textColor='black'
        activeTab={props.activeTab}
        setActivetab={props.setActivetab}
      />
    </View>
  );
}

const HeaderButton = props => (
  <TouchableOpacity
    style={{
      backgroundColor: props.activeTab === props.text ? 'black' : 'white',
      paddingVertical: 6,
      paddingHorizontal: 16,
      borderRadius: 30,
    }}
    onPress={() => {
      props.setActivetab(props.text);
    }}
  >
    <Text
      style={{
        color: props.activeTab === props.text ? 'white' : 'black',
        fontSize: 16,
        fontWeight: '900',
      }}
    >
      {props.text}
    </Text>
  </TouchableOpacity>
);
