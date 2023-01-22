function ExpDate( Days ) {
    const UnixDay = 86400000 ;
    const Now = new Date().getTime();
    const ExpDate = ( Now + ( Days * UnixDay ) ).toString();
    return ExpDate ;
}

function Expired( ExpDate ) {
    ExpDate = parseInt( ExpDate );
    let Expired = false ;
    const Today = new Date().getTime();
    if( ExpDate < Today ) {
        Expired = true ;
    }
    return Expired ;
}

function RenewDate( ExpDate ) {
    const IRDate = new Date( parseInt( ExpDate ) ).toLocaleDateString( "fa-IR" , { timeZone : "Asia/Tehran" } );
    const IRDateList = IRDate.split("/");
    const IRNumbers = "۰۱۲۳۴۵۶۷۸۹" ;
    const Numbers = "0123456789" ;
    let RenewDate = [] ; 
    for ( let i = 0 ; i < 3 ; i++ ) {
        const IRNumber = IRDateList[ i ] ;
        let Number = "" ;
        for ( let j = 0 ; j < IRNumber.length ; j++ ) {
            const Char = IRNumber[ j ];
            for ( let k = 0 ; k < 10 ; k++ ) {
                if ( Char == IRNumbers[ k ] ) {
                    Number = Number + Numbers[ k ];
                    break ;
                }
            }
        }
        RenewDate.push( Number );
    }
    return RenewDate.join("/");
}
