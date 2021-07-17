import React, { Component, ReactNode } from 'react'
import { TextStyle, ViewProps, ViewStyle } from 'react-native'
import Animated from 'react-native-reanimated'

interface HandlerStyleProps {
  width?: number
  alignItems?: string
  justifyContent?: string
  backgroundColor?: string
  borderTopLeftRadius?: number
  borderTopRightRadius?: number
  borderBottomRightRadius?: number
  borderBottomLeftRadius?: number
}

export interface TrimmerProps {
  start: Animated.SharedValue<number>
  end: Animated.SharedValue<number>
  maxVal: number
  duration: number
  onRelease(time: number | string): void
  customStyle: HandlerStyleProps
  icon?: ReactNode
  durationFormat?: 'round' | 'clockStandard' | 'decimal'
  height?: number
  borderRadius?: number
  showTimeValue?: Boolean
  timeTextStyle?: TextStyle
}

export interface RNTrimmerProps {
  duration: number
  onEndRelease(time: number | string): void
  onStartRelease(time: number | string): void
  bothSwipe?: Boolean
  leftHandlerStyle?: HandlerStyleProps
  rightHandlerStyle?: HandlerStyleProps
  style?: ViewStyle
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  Content?: React.FC
  durationFormat?: 'round' | 'clockStandard' | 'decimal'
  trimmerHeight?: number
  showTimeValue?: Boolean
  timeTextStyle?: TextStyle
}
