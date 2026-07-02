import { useEffect } from "react";
import { Animated, StyleSheet, View } from "react-native";

export function ShimmerLoader() {
  const shimmerAnim = new Animated.Value(0);

  useEffect(() => {
    const shimmer = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    );
    shimmer.start();
    return () => shimmer.stop();
  }, [shimmerAnim]);

  const opacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.skeleton, { opacity }]}>
        <View style={styles.info}>
          <View style={styles.number} />
          <View style={styles.name} />
        </View>
        <View style={styles.badges}>
          <View style={styles.badge} />
          <View style={styles.badge} />
        </View>
        <View style={styles.description} />
        <View style={styles.sizes}>
          <View style={styles.weight} />
          <View style={styles.height} />
        </View>
        <View style={styles.stats} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },

  skeleton: {
    backgroundColor: "#E0E0E0",
    borderRadius: 16,
    padding: 24,
    marginTop: 80,
  },

  info: {
    alignItems: "center",
  },

  number: {
    width: 150,
    height: 30,
    backgroundColor: "#D0D0D0",
    borderRadius: 8,
    marginBottom: 8,
  },

  name: {
    width: 150,
    height: 30,
    backgroundColor: "#D0D0D0",
    borderRadius: 8,
    marginBottom: 16,
  },

  badges: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
    justifyContent: "center",
  },

  badge: {
    height: 30,
    width: 80,
    backgroundColor: "#D0D0D0",
    borderRadius: 20,
  },

  description: {
    height: 50,
    backgroundColor: "#D0D0D0",
    borderRadius: 8,
    marginBottom: 16,
  },

  sizes: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },

  weight: {
    flex: 1,
    height: 55,
    backgroundColor: "#D0D0D0",
    borderRadius: 8,
  },

  height: {
    flex: 1,
    height: 55,
    backgroundColor: "#D0D0D0",
    borderRadius: 8,
  },

  stats: {
    height: 200,
    backgroundColor: "#D0D0D0",
    borderRadius: 8,
  },
});
