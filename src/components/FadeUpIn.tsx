import React, { useMemo } from 'react'
import Animated, { Easing } from 'react-native-reanimated'
import { timing } from 'react-native-redash'

const { Value } = Animated

const FadeUpIn = ({ children }: any) => {
  const _clock = useMemo(() => new Animated.Clock(), [])
  const _slideUp = useMemo(() => new Value(40), [])
  const _opacity = useMemo(() => new Value(0), [])

  return (
    <>
      <Animated.Code>
        {() =>
          Animated.block([
            Animated.set(
              _slideUp,
              Animated.interpolate(_opacity, {
                inputRange: [0, 1],
                outputRange: [40, 0]
              })
            ),
            Animated.set(
              _opacity,
              timing({
                clock: _clock,
                from: 0,
                to: 1,
                duration: 2000, //500,
                easing: Easing.out(Easing.exp)
              })
            )
          ])
        }
      </Animated.Code>
      <Animated.View
        style={[
          { flex: 1 },
          { opacity: _opacity },
          {
            transform: [
              {
                translateY: _slideUp
              }
            ]
          }
        ]}
      >
        {children}
      </Animated.View>
    </>
  )
}

export default FadeUpIn
