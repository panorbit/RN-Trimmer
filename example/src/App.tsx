import React from 'react';
import {View} from 'react-native';
import {RNTrimmer} from 'RN-Trimmer';
import TrimmerHandler from './assets/TrimmerHandler';
import TrimmerOneContent from './components/TrimmerOneContent';

type Time = number | string;

const App = () => {
  let duration = 100;
  // const [startTime, setStartTime] = useState<Time>(0);
  // const [endTime, setEndTime] = useState<Time>(duration);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <RNTrimmer
        duration={duration}
        onEndRelease={() => {}}
        onStartRelease={() => {}}
      />

      <View style={{marginTop: 80}}>
        <RNTrimmer
          duration={duration}
          onEndRelease={() => {}}
          onStartRelease={() => {}}
          trimmerHeight={80}
          style={{
            borderColor: 'red',
          }}
          leftIcon={() => (
            <View
              style={{backgroundColor: 'teal', width: 20, height: '100%'}}
            />
          )}
          rightIcon={() => (
            <View
              style={{backgroundColor: 'brown', width: 20, height: '100%'}}
            />
          )}
          Content={() => (
            <View
              style={{backgroundColor: 'yellow', width: '100%', height: '100%'}}
            />
          )}
        />
      </View>

      <View style={{marginTop: 80}}>
        <RNTrimmer
          duration={duration}
          onEndRelease={() => {}}
          onStartRelease={() => {}}
          showTimeValue={false}
          style={{
            borderColor: 'green',
            borderRadius: 0,
          }}
          leftIcon={() => <TrimmerHandler width={25} height={100} />}
          rightIcon={() => <TrimmerHandler width={25} height={100} />}
        />
      </View>
      <View style={{marginTop: 80}}>
        <RNTrimmer
          duration={duration}
          onEndRelease={() => {}}
          onStartRelease={() => {}}
          Content={() => (
            <View
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TrimmerOneContent />
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default App;
