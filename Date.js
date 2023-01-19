const UnixDay = 86400000 ;

function ExpDate( Days ) {
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

function Remaining( ExpDate ) {
    ExpDate = parseInt( ExpDate );
    const Today = new Date().getTime();
    const Days =  Math.trunc( ( ExpDate - Today ) / UnixDay );
    return Days ;
}
