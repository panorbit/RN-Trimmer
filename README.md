<!-- [![Build Status](https://travis-ci.org/jacklam718/react-native-modals.svg?branch=master)](https://travis-ci.org/jacklam718/react-native-modals)
[![npm](https://img.shields.io/npm/dm/react-native-modals.svg)]()
[![npm](https://img.shields.io/npm/v/react-native-modals.svg)]() -->

##### _For Development _

##### Clone the project **run yarn install** in root folder then cd into example folder again **yarn install**. Then from example folder **yarn start** and **yarn android**

<br>
<br>

##### _This is will be after publishing to npm_

## RN-Trimmer

React Native Trimmer Library For Trim Values And Smooth Animation Experience

<br>

#### How To Get Started ?

##### To Use This Library You Need To Setup [react-natvie-reanimated](https://docs.swmansion.com/react-native-reanimated/docs/installation/) and [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/docs/)

<br>
<br>

## Installation

```
npm install --save RN-Trimmer
# OR
yarn add RN-Trimmer
```

## Examples

```jsx
import { RNTrimmer } from 'RN-Trimmer'

const App = () => {
  return (
    <RNTrimmer
      duration={duration}
      onEndRelease={(time) => setStartTime(time)}
      onStartRelease={(time) => setEndTime(time)}
    />
  )
}
```

| Props            | Type     | Default | Note | Required |
| ---------------- | -------- | ------- | ---- | -------- |
| `duration`       | Number   | 0       |      | Yes      |
| `onEndRelease`   | Function |         |      | Yes      |
| `onStartRelease` | Function |         |      | Yes      |
| `bothSwipe`      | Boolean  | true    |      | No       |

## Development

`yarn`

`yarn run build`

`yarn test`
