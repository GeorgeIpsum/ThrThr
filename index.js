/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import { StorybookUIRoot } from "./storybook";

const SHOW_STORYBOOK = false;

const RootComponent = SHOW_STORYBOOK && __DEV__ ? StorybookUIRoot : App;

AppRegistry.registerComponent(appName, () => RootComponent);
