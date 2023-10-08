import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  Text,
  Pressable,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView
      style={[
        {backgroundColor: isDarkMode ? Colors.darker : Colors.lighter},
        styles.screenContainer,
      ]}>
      <Text>Print test</Text>

      <Pressable style={styles.button}>
        <Text style={styles.btnText}>Discover printer</Text>
      </Pressable>

      <Pressable style={styles.button}>
        <Text style={styles.btnText}>Print</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    gap: 15,
  },
  button: {backgroundColor: 'white', padding: 15},
  btnText: {color: 'black'},
});

export default App;
