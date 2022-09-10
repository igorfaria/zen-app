import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import ZenScroll from './component/ZenScroll'
import { RootSiblingParent } from 'react-native-root-siblings';

export const AppZen: React.FC = () : JSX.Element => {
    // Hides the top bar in the mobile device
    React.useEffect(() => StatusBar.setHidden(true), [])
    // Return to the main component in App.tsx
    return (
      <RootSiblingParent>
        <ZenScroll />
      </RootSiblingParent>
    )  
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  