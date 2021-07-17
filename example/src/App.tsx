import React, {useState} from 'react';
import {Text} from 'react-native';
import {View} from 'react-native';
import {RNTrimmer} from 'RN-Trimmer';

type Time = number | string;

const App = () => {
  let duration = 100;
  const [startTime, setStartTime] = useState<Time>(0);
  const [endTime, setEndTime] = useState<Time>(duration);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <RNTrimmer
        duration={duration}
        onEndRelease={time => setStartTime(time)}
        onStartRelease={time => setEndTime(time)}
      />
      <Text>{startTime}</Text>
      <Text>{endTime}</Text>
    </View>
  );
};

export default App;
