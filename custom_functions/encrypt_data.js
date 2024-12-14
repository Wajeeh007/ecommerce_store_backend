const crypto = require('crypto')

function encryptData (data) {
    const encryptedData = crypto.publicEncrypt({
        key: global.publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    },
    Buffer.from(JSON.stringify(data))
    );
    
    // const decryptedData = crypto.privateDecrypt(
    // {
    //   key: global.privateKey,
    //   padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    // },
    // encryptedData
    // );
    
    // console.log("decrypted data: ", decryptedData.toString());
    return encryptedData.toString("base64");
}

module.exports = encryptData