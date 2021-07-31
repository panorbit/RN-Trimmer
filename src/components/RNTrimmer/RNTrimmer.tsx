import React, { Component } from 'react'
import { TextStyle, View, ViewStyle } from 'react-native'
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import { RNTrimmerProps } from '../config/Interface'
import LeftTrimmer from './LeftTrimmer'
import RightTrimmer from './RightTrimmer'
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler'
import { endTime, startTime } from '../config/constants'

export const RNTrimmer: React.FC<RNTrimmerProps> = ({
  duration,
  onStartRelease,
  onEndRelease,
  bothSwipe = true,
  leftHandlerStyle = {},
  rightHandlerStyle = {},
  style,
  leftIcon,
  rightIcon,
  Content,
  durationFormat = 'clockStandard',
  trimmerHeight = 60,
  showTimeValue = true,
  timeTextStyle,
  inactiveShadow = false,
}) => {
  const startVal = useSharedValue(0)
  const endVal = useSharedValue(0)

  const maxVal = 250

  const handleGesture = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { startX: number; endX: number }
  >({
    onStart: (_, ctx) => {
      ctx.startX = startVal.value
      ctx.endX = endVal.value
    },
    onActive: (event, ctx) => {
      const transValEnd = event.translationX + ctx.endX
      const transValStart = event.translationX + ctx.startX

      if (event.translationX > 0) {
        if (transValEnd < 0) {
          endVal.value = transValEnd
        } else {
          endVal.value = 0
        }

        if (transValStart < maxVal) {
          startVal.value = transValStart
        }
      } else {
        if (event.translationX < 0) {
          if (transValEnd > -maxVal) {
            endVal.value = transValEnd
          }

          if (transValStart > 0) {
            startVal.value = transValStart
          } else {
            startVal.value = 0
          }
        }
      }
    },
    onEnd: () => {
      let startTextTime = startTime(
        startVal.value,
        duration,
        maxVal,
        durationFormat
      )
      let endTextTime = endTime(endVal.value, duration, maxVal, durationFormat)
      runOnJS(onStartRelease)(startTextTime)
      runOnJS(onEndRelease)(endTextTime)
    },
  })

  const animValStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      left: interpolate(
        startVal.value,
        [0, maxVal],
        [0, maxVal - 20 - (leftHandlerStyle.width || 25)],
        Extrapolate.CLAMP
      ),
      right: interpolate(
        endVal.value,
        [0, -maxVal],
        [0, maxVal - 20 - (rightHandlerStyle.width || 25)],
        Extrapolate.CLAMP
      ),
    }
  })

  const defaultStyle: ViewStyle = {
    height: trimmerHeight,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
  }

  const defaultTimeTextStyle: TextStyle = {
    fontSize: 18,
    color: 'green',
    position: 'absolute',
    top: -40,
    width: 60,
    textAlign: 'center',
  }

  const leftShadowStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      zIndex: 10,
      left: 5,
      height: defaultStyle.height,
      borderRadius: style ? style.borderRadius : defaultStyle.borderRadius,
      width: interpolate(
        startVal.value,
        [0, maxVal],
        [0, maxVal - (leftHandlerStyle.width || 25)],
        Extrapolate.CLAMP
      ),
      backgroundColor: 'rgba(0,0,0,0.6)',
    }
  })

  const rightShadowStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      zIndex: 10,
      right: 5,
      height: defaultStyle.height,
      borderRadius: style ? style.borderRadius : defaultStyle.borderRadius,
      width: interpolate(
        endVal.value,
        [0, -maxVal],
        [0, maxVal - (rightHandlerStyle.width || 25)],
        Extrapolate.CLAMP
      ),
      backgroundColor: 'rgba(0,0,0,0.6)',
    }
  })

  return (
    <View
      style={{
        width: maxVal,
        height: trimmerHeight,
        backgroundColor: Content ? 'transparent' : 'rgba(0,0,0,0.3)',
        borderRadius: style ? style.borderRadius : defaultStyle.borderRadius,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {Content && (
        <View
          style={{
            width: maxVal - 15,
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <Content />
        </View>
      )}
      <LeftTrimmer
        start={startVal}
        end={endVal}
        maxVal={maxVal}
        duration={duration}
        onRelease={onStartRelease}
        customStyle={leftHandlerStyle}
        icon={leftIcon}
        durationFormat={durationFormat}
        height={trimmerHeight}
        borderRadius={style ? style.borderRadius : defaultStyle.borderRadius}
        showTimeValue={showTimeValue}
        timeTextStyle={timeTextStyle ? timeTextStyle : defaultTimeTextStyle}
      />
      {bothSwipe ? (
        <PanGestureHandler onGestureEvent={handleGesture}>
          <Animated.View
            style={[
              style ? { ...defaultStyle, ...style } : defaultStyle,
              animValStyle,
            ]}
          />
        </PanGestureHandler>
      ) : (
        <Animated.View style={animValStyle} />
      )}
      {inactiveShadow && (
        <>
          <Animated.View style={leftShadowStyle}></Animated.View>
          <Animated.View style={rightShadowStyle}></Animated.View>
        </>
      )}
      <RightTrimmer
        end={endVal}
        start={startVal}
        maxVal={maxVal}
        duration={duration}
        onRelease={onEndRelease}
        customStyle={rightHandlerStyle}
        icon={rightIcon}
        durationFormat={durationFormat}
        height={trimmerHeight}
        borderRadius={style ? style.borderRadius : defaultStyle.borderRadius}
        showTimeValue={showTimeValue}
        timeTextStyle={timeTextStyle ? timeTextStyle : defaultTimeTextStyle}
      />
    </View>
  )
}
