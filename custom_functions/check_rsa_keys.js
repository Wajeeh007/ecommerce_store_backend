const path = require('path')
const {readFile, writeFile, access} = require('fs').promises
const {mkdirSync, existsSync} = require('fs')
const crypto = require('crypto')
const sendEmail = require('./send_email')

async function checkKeys() {
    const directoryPath = './rsa_keys'
    
    if(!existsSync(directoryPath)) {
        mkdirSync(directoryPath)
        await createKeys(directoryPath)
    
    } else {
        try {
            if(existsSync(path.join(directoryPath, '/private.pem')) && existsSync(path.join(directoryPath, '/public.pem'))) {
    
                global.publicKey = await readFile(path.join(directoryPath, '/public.pem'))
                global.privateKey = await readFile(path.join(directoryPath, '/private.pem'))
                }
        
        } catch (err) {
            // await sendEmail({subject: 'Failure Reading Keys', to: 'wajeeh.gillani335@gmail.com', message: `Server has encountered error while reading keys from the directory.\nThe error is: ${err}`})
            process.exit(0)
        }
    }
}

async function createKeys (directoryPath) {

    crypto.generateKeyPair('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem',
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
        },
      }, async (err, publicKey, privateKey) => {
        if(!err) { 
            try{
               await writeFile(`${directoryPath}/private.pem`, privateKey, 'utf8')
                await writeFile(`${directoryPath}/public.pem`, publicKey, 'utf8')
                global.publicKey = publicKey
                global.privateKey = privateKey
            } catch (err) {
                // await sendEmail({subject: 'Key Generation Failure', to: 'wajeeh.gillani335@gmail.com', message: `Server has encountered error while writing keys to the directory.\nThe error is: ${err}`})
                process.exit(0)
            }
        }
    });
}

module.exports = checkKeys