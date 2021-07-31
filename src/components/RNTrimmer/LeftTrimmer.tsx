import React from 'react'
import { TextInput, View } from 'react-native'
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated'
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler'
import { TrimmerProps } from '../config/Interface'
import { startTime } from '../config/constants'

Animated.addWhitelistedNativeProps({ text: true })
const AnimatedText = Animated.createAnimatedComponent(TextInput)

const LeftTrimmer: React.FC<TrimmerProps> = ({
  start,
  end,
  maxVal,
  duration,
  onRelease,
  customStyle,
  icon,
  durationFormat,
  height,
  borderRadius,
  showTimeValue,
  timeTextStyle,
}) => {
  const leftTextVal = useDerivedValue(() => {
    return startTime(start.value, duration, maxVal, durationFormat)
  })

  const {
    width,
    alignItems,
    justifyContent,
    backgroundColor,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomRightRadius,
    borderBottomLeftRadius,
  } = customStyle

  const leftTrimStyle = useAnimatedStyle(() => {
    return {
      width: width || 25,
      alignItems: alignItems || 'center',
      justifyContent: justifyContent || 'center',
      backgroundColor: icon ? 'transparent' : backgroundColor || 'black',
      borderTopLeftRadius: borderTopLeftRadius || borderRadius,
      borderTopRightRadius: borderTopRightRadius || 0,
      borderBottomRightRadius: borderBottomRightRadius || 0,
      borderBottomLeftRadius: borderBottomLeftRadius || borderRadius,
      position: 'absolute',
      zIndex: 5,
      height,
      left: interpolate(
        start.value,
        [0, maxVal],
        [0, maxVal - 20 - (width || 25)],
        Extrapolate.CLAMP
      ),
    }
  })

  const textAnimProps = useAnimatedProps(() => {
    return { text: `${leftTextVal.value}` }
  })

  let handleGesture = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number }
  >({
    onStart: (_, ctx) => {
      ctx.x = start.value
    },
    onActive: (event, ctx) => {
      const transVal = event.translationX + ctx.x

      if (
        transVal > 0 &&
        transVal < maxVal &&
        transVal < maxVal + end.value - (width || 25)
      ) {
        start.value = transVal
      }

      if (transVal < 0) {
        start.value = 0
      }
    },
    onEnd: () => {
      runOnJS(onRelease)(leftTextVal.value)
    },
  })

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <Animated.View style={leftTrimStyle}>
        {icon && (
          <PanGestureHandler onGestureEvent={handleGesture}>
            <Animated.View
              style={{
                position: 'absolute',
                top: -30,
                left: -10,
                height: '100%',
              }}
            >
              {icon()}
            </Animated.View>
          </PanGestureHandler>
        )}
        {showTimeValue && (
          <AnimatedText
            animatedProps={textAnimProps}
            editable={false}
            value={`${leftTextVal.value}`}
            style={{
              ...timeTextStyle,
            }}
          />
        )}
      </Animated.View>
    </PanGestureHandler>
  )
}

export default LeftTrimmer
