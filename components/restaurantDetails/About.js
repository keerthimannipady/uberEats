import {StyleSheet, Image, Text, View} from 'react-native';
import React from 'react';

// const yelpRestaurantInfo = {
//   name: 'Farmhourse kitchen Thai Cisine',
//   image:
//     'https://image.shutterstock.com/image-illustration/3d-render-cafe-restaurant-bar-260nw-1947860743.jpg',
//   price: '$$',
//   reviews: '1500',
//   rating: 4.5,
//   categories: [
//     {title: 'Thai'},
//     {title: 'Chai'},
//     {title: 'Cofee'},
//     {title: 'Cold'},
//   ],
// };

const About = props => {
  const {name, image, price, reviews, rating, categories} = props.route.params;
  const formattedCategories = categories.map(cat => cat.title).join(' • ');
  const description = `${formattedCategories} ${
    price ? ' • ' + price : ''
  } • 🎫 • ${rating} ⭐ (${reviews}+)`;
  return (
    <View>
      <RestImage image={image} />
      <RestTitle name={name} />
      <Description description={description} />
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  menuStyle: {
    flexDirection: 'row',
  },
});

const RestImage = props => (
  <Image source={{uri: props.image}} style={{width: '100%', height: 180}} />
);

const RestTitle = props => (
  <Text
    style={{
      fontSize: 25,
      fontWight: '600',
      marginTop: 10,
      marginHorizontal: 15,
    }}
  >
    {props.name}
  </Text>
);

const Description = props => (
  <Text
    style={{
      fontSize: 15.5,
      fontWight: '400',
      marginTop: 10,
      marginHorizontal: 15,
    }}
  >
    {props.description}
  </Text>
);
