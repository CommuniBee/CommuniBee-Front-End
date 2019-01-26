export class ArrBuff {

  constructor() { }

  static arrayBufferToBase64( buffer ) {
    let binary = '';
    const bytes = new Int8Array( buffer );
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
    }
    return binary;
  }



  static base64ToArrayBuffer(base64) {
    const binary_string = base64;
    const len = binary_string.length;
    const bytes = new Int8Array( len );
    for (let i = 0; i < len; i++)        {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
  }
}
