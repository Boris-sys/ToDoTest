window.addEventListener('load', () => {
    registerSW();
  });
  
  async function registerSW() {
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('./sw.js');
      } catch (e) {
        console.log(`SW registration failed`);
      }
    }
  }

//Seleccion de elementos
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//Nombres clases
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Variables
//let LIST = []
//    , id = 0;
let LIST, id;

//Traer item de almacenamiento local
let data = localStorage.getItem("TODO");

//Comprobar que data no esten vacio
if(data)
{
    LIST = JSON.parse(data);
    id = LIST.length; //setear el id al ultimo elemento de la lista
    loadList(LIST); //Cargar la lista a la interfaz del usuario
}
else
{
    //Si data no esta vacio
    LIST = [];
    id = 0;
}

//Cargar los items en la interfaz del usuario
function loadList(array)
{
    array.forEach(function(item)
        {
            addToDo(item.name, item.id, item.done, item.trash);
        }
    );
}

//limpiar el almacenamiento local
clear.addEventListener("click", function()
    {
        localStorage.clear();
        location.reload();
    }
);



//Guardar item en almacenamiento local (codigo que debera ser añadido cada vez que el array LIST es actualizado)
//localStorage.setItem("TODO", JSON.stringify(LIST));

//Fecha actual
const options = {weekday : "long", month : "short", day : "numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//añadir funcion ToDo
function addToDo(toDo, id, done, trash){

    if(trash){return;}
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `
                <li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                </li>
                `;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

//Prueba con ToDo forzado
//addToDo("Play Spotify");

//Añadir item a la lista cuando el usuario presiona ENTER
document.addEventListener("keyup",function(even)
    {
        if(event.keyCode == 13)
        {
            const toDo = input.value;

            //Cuando el input no esta vacio
            if(toDo)
            {
                addToDo(toDo, id, false, false);
                LIST.push({
                    name : toDo, 
                    id : id, 
                    done : false, 
                    trash : false
                });

                //Guardar item en almacenamiento local (codigo que debera ser añadido cada vez que el array LIST es actualizado)
                localStorage.setItem("TODO", JSON.stringify(LIST));

                id++;
            }
            input.value = "";
        }
    }
);

//Prueba con ToDo finalizado
//addToDo("Play Youtube", 1, true, false);

//Completar ToDo
function completeToDo(element)
{
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//Remover ToDo
function removeToDo(element)
{
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

//Seleccionar Items creados dinamicamente
list.addEventListener("click", function(event)
    {
        //Devuelve el elemento clickeado dentro de la lista
        const element = event.target;

        //Completar o borrar
        const elementJob = element.attributes.job.value;

        if(elementJob == "complete")
        {
            completeToDo(element);
        }
        else if (elementJob == "delete")
        {
            removeToDo(element);
        }

        //Guardar item en almacenamiento local (codigo que debera ser añadido cada vez que el array LIST es actualizado)
        localStorage.setItem("TODO", JSON.stringify(LIST));

    }

);