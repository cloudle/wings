import { FC } from 'react'
import { Text, View } from 'react-native'

export const HomeScreen: FC = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome!</Text>
    </View>
  )
}

export default HomeScreen
