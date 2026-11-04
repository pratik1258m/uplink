import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import Svg, { Defs, RadialGradient, Stop, Circle } from 'react-native-svg';
import { AppImages } from '../assets/images';
import { SphereCenterIcon } from '../assets/svgs';

interface GlowingSphereProps {
  size?: number;
}

export const GlowingSphere: React.FC<GlowingSphereProps> = ({ size = 230 }) => {
  // Levitation animation (floating up and down with precision bezier easing)
  const levitateAnim = useRef(new Animated.Value(0)).current;
  // Pulsing breath for the aura
  const pulseAnim = useRef(new Animated.Value(0)).current;
  // Emblem micro-hover
  const emblemAnim = useRef(new Animated.Value(0)).current;

  // Staggered twinkle animations for the 4 floating sparkle stars
  const twinkle1 = useRef(new Animated.Value(0.3)).current;
  const twinkle2 = useRef(new Animated.Value(0.2)).current;
  const twinkle3 = useRef(new Animated.Value(0.5)).current;
  const twinkle4 = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const smoothEase = Easing.bezier(0.42, 0, 0.58, 1);

    // 1. Butter-smooth sinusoidal levitation
    const levitate = Animated.loop(
      Animated.sequence([
        Animated.timing(levitateAnim, {
          toValue: 1,
          duration: 2400,
          easing: smoothEase,
          useNativeDriver: true,
        }),
        Animated.timing(levitateAnim, {
          toValue: 0,
          duration: 2400,
          easing: smoothEase,
          useNativeDriver: true,
        }),
      ])
    );

    // 2. Harmonized aura breathing
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2600,
          easing: smoothEase,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 2600,
          easing: smoothEase,
          useNativeDriver: true,
        }),
      ])
    );

    // 3. Inner emblem micro-hover for realistic 3D depth
    const emblemHover = Animated.loop(
      Animated.sequence([
        Animated.timing(emblemAnim, {
          toValue: 1,
          duration: 2100,
          easing: smoothEase,
          useNativeDriver: true,
        }),
        Animated.timing(emblemAnim, {
          toValue: 0,
          duration: 2100,
          easing: smoothEase,
          useNativeDriver: true,
        }),
      ])
    );

    // 4. Staggered twinkling AI sparkle particles
    const createTwinkleLoop = (anim: Animated.Value, duration: number, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: 1,
            duration: duration,
            easing: smoothEase,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0.2,
            duration: duration,
            easing: smoothEase,
            useNativeDriver: true,
          }),
        ])
      );

    const t1 = createTwinkleLoop(twinkle1, 1500, 0);
    const t2 = createTwinkleLoop(twinkle2, 1800, 350);
    const t3 = createTwinkleLoop(twinkle3, 2000, 700);
    const t4 = createTwinkleLoop(twinkle4, 1600, 200);

    levitate.start();
    pulse.start();
    emblemHover.start();
    t1.start();
    t2.start();
    t3.start();
    t4.start();

    return () => {
      levitate.stop();
      pulse.stop();
      emblemHover.stop();
      t1.stop();
      t2.stop();
      t3.stop();
      t4.stop();
    };
  }, [levitateAnim, pulseAnim, emblemAnim, twinkle1, twinkle2, twinkle3, twinkle4]);

  const translateY = levitateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-7, 7],
  });

  const auraScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.94, 1.06],
  });

  const auraOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.82, 1.0],
  });

  const emblemTranslateY = emblemAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-2, 2],
  });

  const auraSize = size * 1.65; // ~380px for a 230px sphere

  return (
    <View style={[styles.container, { width: auraSize, height: auraSize }]}>
      {/* Radiant Cyan Background Aura - Native Hardware-Accelerated SVG Radial Gradient */}
      <Animated.View
        style={[
          styles.auraWrapper,
          {
            width: auraSize,
            height: auraSize,
            transform: [{ scale: auraScale }],
            opacity: auraOpacity,
          },
        ]}>
        <Svg width={auraSize} height={auraSize} viewBox={`0 0 ${auraSize} ${auraSize}`}>
          <Defs>
            <RadialGradient id="cyanAura" cx="50%" cy="50%" rx="50%" ry="50%">
              <Stop offset="0%" stopColor="#00E5FF" stopOpacity="0.85" />
              <Stop offset="25%" stopColor="#02D1FE" stopOpacity="0.65" />
              <Stop offset="50%" stopColor="#03A9F4" stopOpacity="0.38" />
              <Stop offset="72%" stopColor="#40C4FF" stopOpacity="0.15" />
              <Stop offset="100%" stopColor="#02D1FE" stopOpacity="0" />
            </RadialGradient>
            <RadialGradient id="innerBloom" cx="50%" cy="50%" rx="50%" ry="50%">
              <Stop offset="0%" stopColor="#E0F7FA" stopOpacity="0.6" />
              <Stop offset="45%" stopColor="#02D1FE" stopOpacity="0.3" />
              <Stop offset="100%" stopColor="#02D1FE" stopOpacity="0" />
            </RadialGradient>
          </Defs>
          <Circle
            cx={auraSize / 2}
            cy={auraSize / 2}
            r={auraSize * 0.48}
            fill="url(#cyanAura)"
          />
          <Circle
            cx={auraSize / 2}
            cy={auraSize / 2}
            r={auraSize * 0.32}
            fill="url(#innerBloom)"
          />
        </Svg>
      </Animated.View>

      {/* Floating 4-Point AI Sparkle Stars */}
      <Animated.View
        style={[
          styles.sparkleStar,
          { top: auraSize * 0.16, left: auraSize * 0.22, opacity: twinkle1 },
        ]}>
        <View style={styles.starOuter}>
          <View style={styles.starCore} />
        </View>
      </Animated.View>

      <Animated.View
        style={[
          styles.sparkleStar,
          { bottom: auraSize * 0.18, left: auraSize * 0.18, opacity: twinkle2 },
        ]}>
        <View style={[styles.starOuter, { width: 14, height: 14 }]}>
          <View style={[styles.starCore, { width: 5, height: 5 }]} />
        </View>
      </Animated.View>

      <Animated.View
        style={[
          styles.sparkleStar,
          { top: auraSize * 0.28, right: auraSize * 0.14, opacity: twinkle3 },
        ]}>
        <View style={[styles.starOuter, { width: 16, height: 16 }]}>
          <View style={[styles.starCore, { width: 6, height: 6 }]} />
        </View>
      </Animated.View>

      <Animated.View
        style={[
          styles.sparkleStar,
          { bottom: auraSize * 0.15, right: auraSize * 0.24, opacity: twinkle4 },
        ]}>
        <View style={styles.starOuter}>
          <View style={styles.starCore} />
        </View>
      </Animated.View>

      {/* The Central AI Sphere with Levitation Physics */}
      <Animated.View
        style={[
          styles.sphereWrapper,
          {
            width: size,
            height: size,
            transform: [{ translateY }],
          },
        ]}>
        <Animated.Image
          source={AppImages.aiSphere}
          style={{ width: size, height: size }}
          resizeMode="contain"
        />

        {/* The Sharp UppLink Arrow Emblem with Depth Parallax */}
        <Animated.View
          style={[
            styles.emblemOverlay,
            { transform: [{ translateY: emblemTranslateY }] },
          ]}>
          <SphereCenterIcon width={size * 0.35} height={size * 0.35} />
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  auraWrapper: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sphereWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emblemOverlay: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sparkleStar: {
    position: 'absolute',
    zIndex: 5,
  },
  starOuter: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starCore: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
    shadowColor: '#00E5FF',
    shadowRadius: 4,
    shadowOpacity: 1,
  },
});
