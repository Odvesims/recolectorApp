import {
  BluetoothEscposPrinter,
  BluetoothManager,
} from 'react-native-bluetooth-escpos-printer';

export function enableBT() {
  return new Promise((resolve, reject) => {
    !BluetoothManager.isBluetoothEnabled().then(() => {
      BluetoothManager.enableBluetooth().then(enabled => {
        this.setState({bleOpend: true});
      });
    });
    resolve(true);
  });
}

export function connectBluetooth(printer_name, printer_address) {
  return new Promise((resolve, reject) => {
    BluetoothManager.connect(printer_address).then(
      s => {
        resolve(true);
      },
      e => {
        reject(false);
      },
    );
  });
}

export function printingTest() {
  return new Promise((resolve, reject) => {
    BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
    BluetoothEscposPrinter.printText('SUCCESFUL PRINTING 0, 0 \r\n\r\n\r\n', {
      encoding: 'GBK',
      codepage: 0,
      widthtimes: 0,
      heigthtimes: 0,
      fonttype: 1,
    });
    BluetoothEscposPrinter.printColumn(
      [26, 8, 8],
      [
        BluetoothEscposPrinter.ALIGN.LEFT,
        BluetoothEscposPrinter.ALIGN.LEFT,
        BluetoothEscposPrinter.ALIGN.RIGHT,
      ],
      ['', '', 'Quantity'],
      {fonttype: 1},
    );
    resolve(true);
  });
}

export async function printText(printArray) {
  /*Array format:
        0: Text to print
        1: Width
        2: Height
        3: Alignment
        4: Format Type (normal, no-format, columns)
        5: Break line after
    */
  return new Promise((resolve, reject) => {
    printArray.invoice.map(line => {
      switch (line[3]) {
        case 'left':
          BluetoothEscposPrinter.printerAlign(
            BluetoothEscposPrinter.ALIGN.LEFT,
          );

          break;
        case 'center':
          BluetoothEscposPrinter.printerAlign(
            BluetoothEscposPrinter.ALIGN.CENTER,
          );

          break;
        case 'right':
          BluetoothEscposPrinter.printerAlign(
            BluetoothEscposPrinter.ALIGN.RIGHT,
          );

          break;
      }
      let textToPrint = line[0][1];
      if (line[0][0] === 0) {
        textToPrint = global.translate(line[0][1]);
      }
      switch (line[4]) {
        case 'no-format':
          BluetoothEscposPrinter.printText(`${textToPrint} \r\n`, {});
          break;
        case 'normal':
          BluetoothEscposPrinter.printText(`${textToPrint} \r\n`, {
            encoding: 'GBK',
            codepage: 0,
            widthtimes: line[1],
            heigthtimes: line[2],
            fonttype: 1,
          });
          break;
        case 'column':
          if (line[0][0] === 0) {
            BluetoothEscposPrinter.printColumn(
              [18, 6, 8, 8],
              [
                BluetoothEscposPrinter.ALIGN.LEFT,
                BluetoothEscposPrinter.ALIGN.RIGHT,
                BluetoothEscposPrinter.ALIGN.RIGHT,
                BluetoothEscposPrinter.ALIGN.RIGHT,
              ],
              [
                global.translate(line[0][1]),
                global.translate(line[0][2]),
                global.translate(line[0][3]),
                global.translate(line[0][4]),
              ],
              {fonttype: 1},
            );
          } else {
            BluetoothEscposPrinter.printColumn(
              [18, 6, 8, 8],
              [
                BluetoothEscposPrinter.ALIGN.LEFT,
                BluetoothEscposPrinter.ALIGN.RIGHT,
                BluetoothEscposPrinter.ALIGN.RIGHT,
                BluetoothEscposPrinter.ALIGN.RIGHT,
              ],
              [line[0][1], line[0][2], line[0][3], line[0][4]],
              {fonttype: 1},
            );
          }
          break;
      }
      if (line[5]) {
        BluetoothEscposPrinter.printText('\r\n', {});
      }
    });
    BluetoothEscposPrinter.printText('\r\n\r\n\r\n\r\n\r\n', {
      encoding: 'GBK',
      codepage: 0,
      widthtimes: 0,
      heigthtimes: 0,
      fonttype: 1,
    });
    resolve(true);
  });
}
