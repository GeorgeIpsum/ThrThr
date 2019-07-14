import * as React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { ScreenProps } from './screen.props';
import { isNonScrolling, offsets, presets } from './screen.presets';

const isIos = Platform.OS === "ios";

const ScreenWithoutScrolling = (props: ScreenProps) => {
  const preset = presets["fixed"];
  const style = props.style || {};
  const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {};
  const Wrapper = props.unsafe ? View : SafeAreaView;

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? "padding" : null}
      keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}>
      <StatusBar barStyle={props.statusBar || "light-content"} />
      <Wrapper style={[preset.inner, style]}>{props.children}</Wrapper>
    </KeyboardAvoidingView>
  );
};

const ScreenWithScrolling = (props: ScreenProps) => {
  const preset = presets["scroll"];
  const style = props.style || {};
  const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {};
  const Wrapper = props.unsafe ? View: SafeAreaView;

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? "padding" : null}
      keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}>
      <StatusBar barStyle={props.statusBar || "light-content"} />
      <Wrapper style={[preset.outer, backgroundStyle]}>
        <ScrollView
          style={[preset.inner, backgroundStyle]}
          contentContainerStyle={[preset.inner, style]}>
          {props.children}
        </ScrollView>
      </Wrapper>
    </KeyboardAvoidingView>
  );
};

export function Screen(props: ScreenProps) {
  return isNonScrolling(props.preset)
    ? <ScreenWithoutScrolling {...props} />
    : <ScreenWithScrolling {...props} />
}