import { LinkingOptions } from '@react-navigation/native'

export type ScreenParamList = {
  Home: undefined
}

export const linking: LinkingOptions<ScreenParamList> = {
  prefixes: ['https://card.stormgate.io'],
  config: {
    screens: {
      Home: '/',
    },
  },
}
