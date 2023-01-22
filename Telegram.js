main.js :

const TELEGRAM = require( "./TELEGRAM.js" );

const BotToken = "5621724957:AAEkEzEvslgub3Erb6JZg2LKlecBkE4prfo" ;

TELEGRAM.Bot( BotToken );


TELEGRAM.js :

const https = require( "node:https" );

function HandleUpdate( Update ) {
    console.log( Update[ "message" ][ "text" ] );
}

async function GetUpdates( BotURL ) {
    const Resolve = function( resolve ) {
        const TelReq = https.get( BotURL , ( TelRes ) => {
            let UpdateStr = "" ;
            TelRes.on( "data" , ( chunk ) => {
                UpdateStr = UpdateStr + chunk.toString();
            });
            TelRes.on( "end" , ( ) => {
                const UpdateObj = JSON.parse( UpdateStr );
                resolve( UpdateObj[ "result" ] );
            });
        });
        TelReq.end();
    }
    return new Promise( Resolve );
}

exports.Bot = async function( BotToken ) {
    const BotURL = "https://api.telegram.org/bot" + BotToken + "/getUpdates" ;
    let LatestUpdate = 0 ;
    setInterval( async ( ) => {
        const UpdatesList = await GetUpdates( BotURL );
        for( let i = 0 ; i < UpdatesList.length ; i++ ) {
            const UpdateId = UpdatesList[ i ][ "update_id" ];
            if( UpdateId > LatestUpdate ) {
                HandleUpdate( UpdatesList[ i ] );
                LatestUpdate = UpdateId ;
            }
        }
    } , 1000 );
}
