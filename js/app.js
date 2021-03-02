//Seleccion de elementos
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//Nombres clases
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Fecha actual
const options = {weekday : "long", month : "short", day : "numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//añadir funcion ToDo
function addToDo(toDo){
    const item = `
                <li class="item">
                    <i class="fa fa-circle-thin co" job="complete" id="0"></i>
                    <p class="text">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="0"></i>
                </li>
                `;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

//Prueba con ToDo forzado
//addToDo("Play Spotify");

//Añadir item a la listaa cuando el usuario presiona ENTER
