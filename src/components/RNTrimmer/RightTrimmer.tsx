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
import { endTime } from '../config/constants'

Animated.addWhitelistedNativeProps({ text: true })
const AnimatedText = Animated.createAnimatedComponent(TextInput)

const RightTrimmer: React.FC<TrimmerProps> = ({
  end,
  start,
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
  const rightTextVal = useDerivedValue(() => {
    return endTime(end.value, duration, maxVal, durationFormat)
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

  const rightTrimStyle = useAnimatedStyle(() => {
    return {
      width: width || 25,
      alignItems: alignItems || 'center',
      justifyContent: justifyContent || 'center',
      backgroundColor: icon ? 'transparent' : backgroundColor || 'black',
      borderTopLeftRadius: borderTopLeftRadius || 0,
      borderTopRightRadius: borderTopRightRadius || borderRadius,
      borderBottomRightRadius: borderBottomRightRadius || borderRadius,
      borderBottomLeftRadius: borderBottomLeftRadius || 0,
      position: 'absolute',
      zIndex: 5,
      height,
      right: interpolate(
        end.value,
        [0, -maxVal],
        [0, maxVal - 20 - (width || 25)],
        Extrapolate.CLAMP
      ),
    }
  })

  const textAnimProps = useAnimatedProps(() => {
    return { text: `${rightTextVal.value}` }
  })

  let handleGesture = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number }
  >({
    onStart: (_, ctx) => {
      //   runOnJS(trimmerMoved)();
      ctx.x = end.value
    },
    onActive: (event, ctx) => {
      const transVal = event.translationX + ctx.x

      if (
        transVal < 0 &&
        transVal > -maxVal &&
        transVal > -(maxVal - start.value - (width || 25))
      ) {
        end.value = transVal
      }
      if (transVal > 0) {
        end.value = 0
      }
    },
    onEnd: () => {
      runOnJS(onRelease)(rightTextVal.value)
    },
  })

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <Animated.View style={rightTrimStyle}>
        {icon && (
          <View style={{ position: 'absolute', right: 0 }}>{icon()}</View>
        )}
        {showTimeValue && (
          <AnimatedText
            animatedProps={textAnimProps}
            editable={false}
            value={`${rightTextVal.value}`}
            style={{
              ...timeTextStyle,
            }}
          />
        )}
      </Animated.View>
    </PanGestureHandler>
  )
}

export default React.memo(RightTrimmer)
