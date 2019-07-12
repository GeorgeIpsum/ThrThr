// @ts-ignore, need to ignore this stuff since technically none of these exist in the .d.ts
import { API_KEY } from 'react-native-dotenv';

declare var process: any;

export const API: string | undefined = API_KEY;