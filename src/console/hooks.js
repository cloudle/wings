import { useContext, } from 'react';
import { StdoutContext, } from 'ink';

export const useStdout = () => useContext(StdoutContext).stdout;
