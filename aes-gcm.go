package main

import "crypto/sha256"
import "crypto/aes"
import "crypto/cipher"
import "crypto/rand"
import "encoding/base64"
import "fmt"

func Encrypt( DATABuffer []byte , KEY string ) string {
    KEYHASH := sha256.Sum256( []byte( KEY ) )
    AES256 , _ := aes.NewCipher( KEYHASH[ : ] )
    AES256GCM , _ := cipher.NewGCM( AES256 )
    NONCEBuffer := make( []byte , 12 )
    _ , _ = rand.Read( NONCEBuffer )
    NONCE := base64.RawURLEncoding.EncodeToString( NONCEBuffer )
    ENCDataBuffer := AES256GCM.Seal( nil , NONCEBuffer , DATABuffer , nil )
    ENCData := base64.RawURLEncoding.EncodeToString( ENCDataBuffer )
    return NONCE + ENCData
}

func Decrypt( ENCData string , KEY string ) []byte {
    KEYHASH := sha256.Sum256( []byte( KEY ) )
    AES256 , _ := aes.NewCipher( KEYHASH[ : ] )
    AES256GCM , _ := cipher.NewGCM( AES256 )
    NONCEBuffer , _ := base64.RawURLEncoding.DecodeString( ENCData[ 0 : 16 ] )
    ENCDataBuffer , _ := base64.RawURLEncoding.DecodeString( ENCData[ 16 : ] )
    DATABuffer , _ := AES256GCM.Open( nil , NONCEBuffer , ENCDataBuffer , nil )
    return DATABuffer
}

func main( ) {
    SECRET := "DRAMA"
    DATA := []byte( "HELLO" )
    EncryptedData := Encrypt( DATA , SECRET )
    // fmt.Println( EncryptedData )
    out := Decrypt( EncryptedData , SECRET )
    fmt.Printf( "%s\n" , out )
}
