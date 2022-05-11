const contentToRestore = "";
function backUpContent(id,contentToRestore) {

    let elem = document.getElementById(id);

    contentToRestore = elem.innerHTML;
    //console.log('Content : ' + contentToRestore);
    
    sessionStorage.setItem("backinnerhtml",contentToRestore);

    return contentToRestore;
}

// Codifica mensagem digitada em textarea
function codifica(id1,id2) {
    //let objmens = document.getElementById('mens');
    var text = document.getElementById(id1).value;
    //console.log(text);

    //textarea validou : só minusculas e sem caracteres especiais
    //as vogais de mens devem ser convertidas conforme :
    //"a"->"ai" , "e"->"enter" , "i"->"imes" , "o"->"ober" , "u"->"ufat"
    //var chave = ['ai','enter','imes','ober','ufat'];

    const chave = [
    { char: 'a', schv: 'ai' },
    { char: 'e', schv: 'enter' },
    { char: 'i', schv: 'imes' },
    { char: 'o', schv: 'ober' },
    { char: 'u', schv: 'ufat' },
    ];

    var gerou = false;
    //var achou = false;
    var substr = '';
    // for não aceita LET como parametro
    for(var pmens = 0; pmens < text.length; pmens++) {
        //Usa substr porque é substr(pos, tamanho)
        var letra = text.substr(pmens,1);
        //console.log('Pos mens : ' + pmens);
        //console.log('Letra : ' + letra);
        
        //Localiza pos. chave correspondente a smens
        var pchv = chave.findIndex(chave => chave.char == letra);
        //console.log('pchv : ' + pchv);

        //Se achou 
        if(pchv >= 0) {
            //substr = substr + text.substring(pmens,1) + chave[pchv];
            substr = substr + chave[pchv].schv; 
            //text = text.substring(pmens+1);
            //console.log('Substr : ' + substr);
            //console.log('Text : ' + text); 
            //achou = true;
            //break;
        } else {
            substr = substr + letra;
        }

    }

    gerou = (substr.length > 0 ? true : false);

    //document.getElementById(id2).innerHTML = substr;
    if(gerou) {
        clearContent(id2);
        document.getElementById(id2).innerHTML = substr;
    }

    return gerou;
}

// Codifica mensagem digitada em textarea
function decodifica(id1,id2) {
    
    var text = document.getElementById(id1).value;
    
    //textarea validou : só minusculas e sem caracteres especiais
    //as vogais de mens devem ser convertidas conforme :
    //"a"->"ai" , "e"->"enter" , "i"->"imes" , "o"->"ober" , "u"->"ufat"
    const chave = [
    { char: 'a', schv: 'ai' },
    { char: 'e', schv: 'enter' },
    { char: 'i', schv: 'imes' },
    { char: 'o', schv: 'ober' },
    { char: 'u', schv: 'ufat' },
    ];

    var gerou = false;
    //var achou = false;
    var substr = '';
    // for não aceita LET como parametro
    for(var pmens = 0; pmens < text.length; pmens++) {
        //Usa substr porque é substr(pos, tamanho)
        var letra = text.substr(pmens,1);
        //console.log('Pos mens : ' + pmens);
        //console.log('Letra : ' + letra);
        
        //Localiza pos. chave correspondente a smens
        var pchv = chave.findIndex(chave => chave.char == letra);
        //console.log('pchv : ' + pchv);

        //Se achou 
        if(pchv >= 0) {
            substr = substr + chave[pchv].char; 
            //-1 pois qdo volta for pmens++ !
            pmens = pmens + chave[pchv].schv.length - 1;

            //console.log('Substr : ' + substr);
            //console.log('pmens : ' + pmens); 
          
        } else {
            substr = substr + letra;
        }

    }
    //document.getElementById(id2).innerHTML = substr;
    
    gerou = (substr.length > 0 ? true : false)

    if(gerou) {
        clearContent(id2);
        document.getElementById(id2).innerHTML = substr; 
    }

    return gerou;
}

function clearContent(id) {
    //console.log('Id : ' + id) 
    let e = document.getElementById(id);
    e.innerHTML = ""; 
}

function sendContent(id1,id2,event) {
    let e1 = document.getElementById(id1);
    //let cont = e1.innerHTML; 
    //let cont1 = e1.innerText;
    let cont2 = e1.value; // value porque é textarea
    //console.log('Html : ' + cont); 
    //console.log('Text : ' + cont1); 
    
    //console.log('Value : ' + cont2); 
    let e2 = document.getElementById(id2);
    //e2.innerHTML = cont;
    e2.innerText = cont2; 
    //e2.value = cont2; 
    
    //console.log('Cont2 : ' + cont2);
    //event.stopPropagation();
    //event.cancelBubble = true;
}

function restoreContent(id,contentToRestore) {
    let e = document.getElementById(id);
    //e.innerHTML = contentToRestore;
    let backval = sessionStorage.getItem("backinnerhtml");
    e.innerHTML = backval;
    //sessionStorage.clear();
    //console.log('Refresh : ' + contentToRestore);
    //console.log('Refresh : ' + backval);
}

/*
function transferContent(id1,id2) {
    //get content of textarea 
    oid1Value = document.getElementById(id1).value;
    // replace JavaScript line break with HTML <br>
    //odiv2Value = odiv2Value.replace(/(?:\r\n|\r|\n)/g, '<br>');
    document.getElementById(id2).innerHTML=oid1Value ;
    return false;
}
*/

function copyToClipboard(id) {
    /* pega conteudo textarea */
    var copyText = document.getElementById(id);

    /* Select the text field */
    /*copyText.select();*/
    /*copyText.value;*/
    console.log('Copied value / text : ' + copyText.value + ' / ' + copyText.textContent);

    /*copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.textContent);

    /* Alert the copied text */
    //alert("Copied the text: " + copyText.textContent);
}

function showMenu(nclass) {
    let eclass = document.getElementsByClassName(nclass);
    // display = "none" não funciona , tem que ser display = ""
    if (eclass[0].style.display == "") {
        eclass[0].style.display = "inline-block";
    } else {
        eclass[0].style.display = "";
    }
}
