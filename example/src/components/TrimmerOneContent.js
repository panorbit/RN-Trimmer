import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const TrimmerOneContent = () => {
  let images = [
    require('../assets/frames/ezgif-frame-001.jpg'),
    require('../assets/frames/ezgif-frame-002.jpg'),
    require('../assets/frames/ezgif-frame-003.jpg'),
    require('../assets/frames/ezgif-frame-004.jpg'),
    require('../assets/frames/ezgif-frame-005.jpg'),
    require('../assets/frames/ezgif-frame-006.jpg'),
  ];

  return (
    <View style={{flexDirection: 'row'}}>
      {images.map((imagePath, i) => (
        <Image
          key={i}
          source={imagePath}
          style={{
            width: 35,
            height: 50,
            marginRight: 2,
          }}
          resizeMode="cover"
        />
      ))}
    </View>
  );
};

export default TrimmerOneContent;

const styles = StyleSheet.create({});
