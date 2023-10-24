import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  Text,
  Pressable,
} from 'react-native';
import EscPosPrinter, {
  IPrinter,
  getPrinterSeriesByName,
} from 'react-native-esc-pos-printer';

import {Colors} from 'react-native/Libraries/NewAppScreen';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [printer, setPrinter] = useState<IPrinter | null>(null);
  const discoverPrinterPress = async () => {
    try {
      const printers = await EscPosPrinter.discover();
      console.log({printers});
      if (printers[0]) {
        setPrinter(printers[0]);
      }
    } catch (e) {
      console.log('error while discovering printer', JSON.stringify(e));
    }
  };

  const printPress = async () => {
    try {
      if (printer !== null) {
        await EscPosPrinter.init({
          target: printer.target,
          seriesName: getPrinterSeriesByName(printer.name),
          language: 'EPOS2_LANG_EN',
        });

        const printing = new EscPosPrinter.printing();

        const status = await printing
          .initialize()
          .align('center')
          .size(3, 3)
          .line('DUDE!')
          .smooth(true)
          .line('DUDE!')
          .smooth(false)
          .size(1, 1)
          .text('is that a ')
          .bold()
          .underline()
          .text('printer?')
          .newline()
          .cut()
          .send();

        console.log('Success:', status);
      }
    } catch (e) {
      console.log('error while printing', JSON.stringify(e));
    }
  };

  return (
    <SafeAreaView
      style={[
        {backgroundColor: isDarkMode ? Colors.darker : Colors.lighter},
        styles.screenContainer,
      ]}>
      <Text>Print test</Text>

      <Pressable style={styles.button} onPress={discoverPrinterPress}>
        <Text style={styles.btnText}>Discover printer</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={printPress}>
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
