import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ImageTest = () => {
  const articleImages = {
    steroids: require('../assets/steroids.png'),
    depression: require('../assets/depression.png'),
    burgers: require('../assets/burgers.png'),
    'social-anxiety': require('../assets/social-anxiety.png'),
    hugging: require('../assets/hugging.png'),
  };

  return (
    <View style={styles.container}>
      <Image source={articleImages.steroids} style={styles.image} />
      <Image source={articleImages.depression} style={styles.image} />
      <Image source={articleImages.burgers} style={styles.image} />
      <Image source={articleImages['social-anxiety']} style={styles.image} />
      <Image source={articleImages.hugging} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
});

export default ImageTest;
