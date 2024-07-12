// CustomImage.js
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const CustomImage = ({ source, style, defaultImage, width, height }) => {
  const handleError = (e) => {
    console.log('Error loading image:', e.nativeEvent.error);
  };

  return (
    <View style={[styles.imageContainer, style]}>
      <Image
        source={source ? source : defaultImage}
        style={styles.image}
        onError={handleError}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    paddingBottom:40
  },
  image: {
    // width: '100%',
    // height: '100%',
    resizeMode: 'cover',
  
  },
});

export default CustomImage;
