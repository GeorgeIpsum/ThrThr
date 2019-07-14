import { Platform } from 'react-native';

export const typography = {
  primary: Platform.select({ ios: 'System', android: 'Roboto' }),
  secondary: Platform.select({ ios: 'Georgia', android: 'notoserif' })
};