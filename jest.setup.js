global.__DEV__ = true;

jest.mock("react-native-gesture-handler", () => {
  const { View, TouchableOpacity } = require("react-native");
  return {
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    ScrollView: View,
    Slider: View,
    Switch: View,
    TextInput: View,
    ToolbarAndroid: View,
    ViewPagerAndroid: View,
    DrawerLayoutAndroid: View,
    WebView: View,
    NativeViewGestureHandler: View,
    TapGestureHandler: View,
    FlingGestureHandler: View,
    ForceTouchGestureHandler: View,
    LongPressGestureHandler: View,
    PanGestureHandler: View,
    PinchGestureHandler: View,
    RotationGestureHandler: View,
    RawButton: View,
    BaseButton: View,
    RectButton: View,
    BorderlessButton: View,
    FlatList: View,
    gestureHandlerRootHOC: (comp) => comp,
    GestureHandlerRootView: View,
    Directions: {},
    TouchableOpacity,
    TouchableHighlight: View,
    TouchableNativeFeedback: View,
    TouchableWithoutFeedback: View,
  };
});

jest.mock("react-native-screens", () => ({
  enableScreens: jest.fn(),
  Screen: require("react-native").View,
  ScreenContainer: require("react-native").View,
}));
