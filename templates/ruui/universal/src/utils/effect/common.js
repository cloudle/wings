import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import { useSafeAreaInsets, } from 'react-native-safe-area-context';

export const useDispatch = useReduxDispatch;
export const useSelector = useReduxSelector;
export const useInsets = useSafeAreaInsets;
