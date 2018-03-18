export default class Crypt {
    static encrypt(text, key, iv) {
        let cipher = forge.cipher.createCipher('AES-CBC', key);
        cipher.start({iv: iv});
        cipher.update(forge.util.createBuffer(text));
        cipher.finish();
        let encrypted = cipher.output;
        return encrypted.toHex();
    }

    static decrypt(encryptedHex, key, iv) {
        let decipher = forge.cipher.createDecipher('AES-CBC', key);
        decipher.start({iv: forge.util.hexToBytes(iv)});
        decipher.update(forge.util.createBuffer(forge.util.hexToBytes(encryptedHex)));
        let bunny = decipher.finish();  // if the secret key is invalid it returns false
        if(!bunny) {
            window.location.href("/secret/");
        }
        return decipher.output.data;
    }
}