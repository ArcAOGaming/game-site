import { Buffer } from 'buffer'; // Import from the package

/**
 * Convert Arweave address from Base64URL to Hex format
 * @param arweaveAddress - Arweave address string (Base64URL encoded)
 * @returns bytes32 formatted address (0x prefixed hex string)
 */
export function convertArweaveAddressToBytes32(arweaveAddress: string): `0x${string}` {
    // Manually convert from Base64URL to standard Base64 to avoid encoding errors
    const base64 = arweaveAddress.replace(/-/g, '+').replace(/_/g, '/');

    // Now, decode the standard Base64 string
    const hexString = Buffer.from(base64, 'base64').toString('hex');

    // Ensure it's exactly 64 characters (32 bytes) by padding with zeros if needed
    const paddedHex = hexString.padEnd(64, '0').substring(0, 64);

    return `0x${paddedHex}` as `0x${string}`;
}

/**
 * Example usage:
 * const arweaveAddress = '05cl5_uXbZiVRIAB17zjkDVNkop7QIsapuqrhZbulYI';
 * const hexString = convertArweaveAddressToBytes32(arweaveAddress);
 * console.log(hexString);
 * // Expected output: 0xd39725e7fb976d9895448001d7bce390354d928a7b408b1aa6eaab8596ee9582
 */
