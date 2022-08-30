import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { ZenScroll } from './component/ZenScroll'

export const AppZen: React.FC = () => {
    // Hides the top bar in the mobile device
    React.useEffect(() => StatusBar.setHidden(true), [])
    return <ZenScroll />  
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  