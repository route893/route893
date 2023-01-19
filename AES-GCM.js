const { createHash , } = require( "node:crypto" );
const { createDecipheriv , } = require( "node:crypto" );
const { randomBytes , } = require( "node:crypto" );
const { createCipheriv , } = require( "node:crypto" );
const { Buffer } = require( "node:buffer" );

const SECRET = "DRAMA"

const Sha256 = createHash( "sha256" );
Sha256.update( SECRET );
const KEY = Sha256.digest();

const DATA = Buffer.from( "HELLO" , "utf8" );

function Decrypt( CIPHERTEXT , KEY ) {
    const NONCE = CIPHERTEXT.slice( 0 , 16 );
    const NONCEBuffer = Buffer.from( NONCE , "base64url" );
    const TAG = CIPHERTEXT.slice( -22 , );
    const TAGBuffer = Buffer.from( TAG , "base64url" );
    const ENCDATA = CIPHERTEXT.slice( 16 , -22 );
    const ENCDATABuffer = Buffer.from( ENCDATA , "base64url" );
    const AES256GCM = createDecipheriv( "aes-256-gcm" , KEY , NONCEBuffer );
    AES256GCM.setAuthTag( TAGBuffer );
    let DATABuffer = AES256GCM.update( ENCDATABuffer , null , "utf8" );
    DATABuffer = DATABuffer + AES256GCM.final( "utf8" );
    return DATABuffer
}

function Encrypt( DATABuffer , KEY ) {
    const NONCEBuffer = randomBytes( 12 );
    const NONCE = NONCEBuffer.toString( "base64url" );
    const AES256GCM = createCipheriv( "aes-256-gcm" , KEY , NONCEBuffer );
    const CIPHERBuffer = Buffer.concat( [ AES256GCM.update( DATABuffer ), AES256GCM.final( ) , AES256GCM.getAuthTag( ) ] );
    let CIPHERTEXT = CIPHERBuffer.toString( "base64url" );
    CIPHERTEXT = NONCE + CIPHERTEXT ;
    return CIPHERTEXT
}


// const x = Decrypt( "jhRGujr7QMzw_d7x4EM2jhsqEoCv2wTYLw-O_kr6pBQIg" , KEY );
// const x = Encrypt( DATA , KEY );
// console.log( x )

