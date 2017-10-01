/*Otra forma de validar cuando se carga el document*/


var pos = 0; // vairable que indica la psoicion de la imagen del slider
var intv ; // variable que llevara los intervaslos del slide

$(document).on('ready', function(){
    /*LLamando la funcion*/
    init();


});

/*Seleccionado al wundow detectara el evneo resisze que indica cambio de tamaño y se dispara la funcion initi, haciendo recarga la pagina*/
$(window).on('resize',init);

/*addEcenlistener a la funcion que qieramos
Para es caso agrega el evento oriantionchange que permite detectar cuando se gira el dispositivo se ejecutara la funcion, para este caso se recargara la pagina*/
window.addEventListener('orientationchange',init);


function init(){

    
    /*Invocando a la libreria stellar para realizar el efecto parallax*/
    $.stellar({
        'horizontalScrolling': false,   // para que no haga efectos horizontales
        hideDistantElements: false  // para que no lo oculte los elemntos
    });
    
    
    /*Animacion al hacer scroll tambien baja el texto*/
    var sc = $.scrollorama({  // invoco a la libreria
       blocks: '.fullScreen',   // le indico el bloque de clases a la que se va a aplicar
        enablePin:false
    });
    sc.animate('.mensajePrincipal',{ // infico al objeto que se va a aplicar la animacion
        delay: 700,  // cantidad en pixeles donde empiza a funcionar
        duration: 500,  // duracion en milisegundos
        property: 'top', //propiedad css
        end: 500 // valores de la anmacion css
    });
       sc.animate('.mensajePrincipal',{ // infico al objeto que se va a aplicar la animacion
        delay: 700,  // cantidad en pixeles donde empiza a funcionar
        duration: 200,  // duracion en milisegundos
        property: 'opacity', //propiedad css
        end: 0 // valores de la anmacion css
    });
    
    
    
    /*Seleccionando a la barra de navegacion*/
    $('#navegacionPrincipal').localScroll(); // a todo el ul se le habilita la animacion con el pluggin 
    

    //cuando se precio el li de controles dispara la funcion handleClick()
    $('.slider_controls li').on('click', handleClick);

    /*Funcion que saigna el ancho del slide a cada elemento*/
    var width = $('.slider-container').width();
    //RECORRERA CADA ELEMENTO CON EL EACH
    // I es indice
    // E es el elemento como tal
    $('.slide').each(function(i,e){
        var url = $(e).data('background'); // captura de la url por cada elemento
        $(e).css('width',width + 'px'); // asiganacion de ancho a cada elemento
        $(e).css('background-image',"url("+(url+".jpg")+")"); // asigno el fondo de acuerdo a lo sque contrnga el data (url) de cada elemento

    });
    
    
    $('.image_food').on('click',changeViewport); // cuando se de click sobre el elemento con clase .image_food se ejecutara la funcion 
    
    /*llamando la funcion que pondra las iamgenes en la galaeria*/
    $('.image_food').each(function(i,e){   /*esta funcion iterara en cada elemento de calase iamge_food*/
       addBackground(e,false);  // e es el elemento en cuestion para caso es .image_food
        if($(e).hasClass('viewport')) return true;  // hasclass de vuelve true si el elemento contiene la clase
        $(e).data('top',(i)*100);  //i es el indice
                                    // le añado a cada elemento 1 a uno la data top con un valor de acuerdo al indice
        $(e).css({
           'top':$(e).data('top')+'px' 
        });
    });
    

    /*Intervalo del slide*/
    clearInterval(intv);// limpio el intervalo y le paso la variable que lelva el intervalo
    intv = setInterval(handleClick,3000);// invoca a la funcion y le paso por 2 parametro el tiempo


    /*******Efectos para el giro de la rajeta********/
    //seleccionamos primero el document y luego la etqiueta como delegacion de eventos
    $(document).on('click','.ver-mas',flipElement); // se ejecutara la funcion flipElement


};

/*Funcion encargada de añadir el background en la galareia de imagenes*/
function addBackground(element,width,setSize){
    if(!width) width = $('html').width();
    if(setSize){
        $(element).css({
            'width': width,
            height: $('html').height()
        });
    }
    var imagen = $(element).data('background'); /*obteniendo la data de la imagen*/
    $(element).css({ /*Modicicando el background del css*/
        backgroundImage: 'url("'+ imagen +'.jpg")'
    })
}

function changeViewport(){
    var e = $('.viewport'); //selecciono la imagen en grande
    e.css('top',$(e).data('top')); // le modificamos al elemento e el top para que deje de ser viewport
    e.removeClass('viewport'); // remueve la clase viewport
    $(this).addClass('viewport');
    $(this).css('top',0);
}




/*******Funcion para el giro de la tarjetas***********/
var flippedElement; /*Contendra el elemento girado para saber que se debe regresar*/
/*Arreglo en formato JSON*/
var opcionesHoteles = [
    {
        "TipoPaquete":"Paquete Basico",
        "op1":"Baño",
        "op2":"Cocina",
        "op3":"Yacussi",
        "costo":300
    },
    {
        "TipoPaquete":"Paquete Medio",
        "op1":"Baño y sauna",
        "op2":"Cocina",
        "op3":"Yacussi Pleno",
        "costo":900
    },
    {
        "TipoPaquete":"Paquete Premium",
        "op1":"Baño con sala",
        "op2":"Cocina con todos",
        "op3":"Yacussi sauna full",
        "costo":1110
    }
];

function flipElement(){


    // validando si la tarjeta esta volteada
    if(flippedElement != null){
        $(flippedElement ).revertFlip();
        flippedElement  = null;
    }
    $(flippedElement).remove();


    //seleccionamos al padre del enlace seleccionado
    var padre = $(this).parent();
    flippedElement = padre;
    // seleccionamos al apadre y le pasamos el evento o funcion de girar con los respectivos parametros

    /*Variable que contendra todo el HTML*/
    var contenido = "";
    /*Utilizo un arreglo tipo JSOn para jalar la informacion , tomando como posicion el data de cada enlace espichado*/
    contenido+="<div>";
    contenido+="<div class='ribbon'></div>";
    contenido+="<h3>"+ opcionesHoteles[$(this).data("number")].TipoPaquete +"</h3>";
    contenido+="<p><strong>Contenido del paquete</strong></p>";
    contenido+="<ol>";

    contenido+="<li>"+ opcionesHoteles[$(this).data("number")].op1 +"</li>";
    contenido+="<li>"+ opcionesHoteles[$(this).data("number")].op2 +"</li>";
    contenido+="<li>"+ opcionesHoteles[$(this).data("number")].op3 +"</li>";

    contenido+="</ol>";
    contenido+="<p class='costo'>"+ opcionesHoteles[$(this).data("number")].costo +"</p>";
    contenido+="<a  id='regresar-ventana'>Regresar</a>";
    contenido+="</div>";


    $(padre).flip({
        direction: 'rl', //
        speed: 500,
        content: contenido,/*Le paso la variable contenido con el HTML*/
        color: '#f7f7f7',
        onEnd: function(){ //onEnd, indica la funcion
            $('#regresar-ventana').on('click',function(){
                $(flippedElement ).revertFlip();
                flippedElement  = null; 
            });
        }

    })

}


/***** Fucnion para detectar la posicion del slider *****/
function  handleClick(){
    var slide_target = 0;

    // con tihis toma el boton donde se dio clicj
    // parent accedemos a todo el contenedor padre
    // hasClass , indica que este tenga la clase entre ()
    // de esta forma se sabe q el evento se disparo por oprimir boton
    if($(this).parent().hasClass('slider_controls')){
        slide_target = $(this).index();
        console.log("Posicion de slider = " + slide_target); //mostramos la posicon que se espicha de acuerdo al boton

        pos = slide_target;  // se actualiza la psocion con lo qie tenga slide target
        clearInterval(intv);  // limpiamos el intervalo
    }else{
        /*Evalua que se cambio a travez de intervalo*/
        pos++; // ira aumentando en 1 la posicion
        slide_target = pos;   // le asigamos el valor a slide target

        /*Condicional que validara cuantod slide hay y cuando llegue al tope, reseteara a 0 la varaible pos de posicion*/
        if(pos >= $('.slide').length){
            pos = 0;
        }


    }

    //fadeOut funcion de JQuery que oculta el elemento haciendolo negro
    // recibe por parametro la velodicad y luego la funcion que se ejecutara cuando esta termine de ocultarlo
    $('.slideContainer').fadeOut('slow',function(){
        $(this).animate({
            //animara cada movimineto haciendo el siguiente calculo
            // toma la posion iniical con slide target
            // lo motulpica por el ancho de su padre slider-container tomando como valor el ancho
            // y al ser negativo hara que se desplace
            'margin-left': -(slide_target * $('.slider-container').width())+'px'
        }, 'slow', function(){ // lo que se ejcutara despues
            $(this).fadeIn();  // para volverlo a mostrar
        } )
    })



}





