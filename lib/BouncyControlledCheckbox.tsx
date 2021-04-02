import * as React from "react";
import {
  Text,
  View,
  Image,
  Animated,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import styles, { _textStyle, _iconContainer } from "./BouncyControlledCheckbox.style";

export interface ISource {
  source: string | { uri: string };
}

export interface IBouncyCheckboxProps extends TouchableOpacityProps {
  style?: any;
  size?: number;
  text?: string;
  iconStyle?: any;
  textStyle?: any;
  fillColor?: string;
  iconComponent?: any;
  unfillColor?: string;
  disableText?: boolean;
  ImageComponent?: any;
  iconImageStyle?: any;
  bounceEffect?: number;
  bounceFriction?: number;
  useNativeDriver?: boolean;
  checkIconImageSource?: ISource;
  onCheckPress?: (isChecked: boolean) => void;
  checked: boolean;
}

interface IState {
  springValue: Animated.Value;
}

const defaultCheckImage = require("./check.png");

class BouncyControlledCheckbox extends React.Component<IBouncyCheckboxProps, IState> {
  constructor(props: IBouncyCheckboxProps) {
    super(props);
    this.state = {
      springValue: new Animated.Value(1),
    };
  }

  springBounceAnimation = () => {
    const {
      useNativeDriver = true,
      bounceEffect = 1,
      bounceFriction = 3,
      checked,
    } = this.props;
    const { springValue } = this.state;
    springValue.setValue(0.7);
    Animated.spring(springValue, {
      toValue: bounceEffect,
      friction: bounceFriction,
      useNativeDriver,
    }).start();
    this.props.onCheckPress && this.props.onCheckPress(!checked);
  };

  renderCheckIcon = () => {
    const { springValue } = this.state;
    const {
      size = 25,
      iconStyle,
      iconComponent,
      iconImageStyle,
      fillColor = "#ffc484",
      ImageComponent = Image,
      unfillColor = "transparent",
      checkIconImageSource = defaultCheckImage,
      checked,
    } = this.props;
    return (
      <Animated.View
        style={[
          { transform: [{ scale: springValue }] },
          _iconContainer(size, checked, fillColor, unfillColor),
          iconStyle,
        ]}
      >
        {iconComponent ||
          (checked && (
            <ImageComponent
              source={checkIconImageSource}
              style={[styles.iconImageStyle, iconImageStyle]}
            />
          ))}
      </Animated.View>
    );
  };

  renderCheckboxText = () => {
    const { textStyle, text, disableText = false, checked } = this.props;
    return (
      !disableText && (
        <View style={styles.textContainer}>
          <Text style={[_textStyle(checked), textStyle]}>
            {text}
          </Text>
        </View>
      )
    );
  };

  render() {
    const { style } = this.props;
    return (
      <TouchableOpacity
        {...this.props}
        style={[styles.container, style]}
        onPress={this.springBounceAnimation}
      >
        {this.renderCheckIcon()}
        {this.renderCheckboxText()}
      </TouchableOpacity>
    );
  }
}

export default BouncyControlledCheckbox;
