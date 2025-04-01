let btn = document.getElementById("btn")
let array = []
let todoInput
let todoList
let contador = 1

btn.addEventListener("click", (e) => {
    scrollContainer = document.getElementById("scroll")
    if(document.getElementById("todoInput").value)
    {
        scrollContainer.innerHTML = ""
        AgregarTarea()
        array.forEach(element => {
            scrollContainer.innerHTML += `
            <li id="todoList">
                <div class="todo-container">
                <p data-id="${element.id}">${element.nombre}</p>
                <input type="checkbox" class="todo-checkbox" id="${element.id}} onclick="tacharTarea(element.id)""     
                </div>
            </li>
            `;
        });
    }

})

function AgregarTarea (){
    todoInput = document.getElementById("todoInput")
    array.push({
        nombre: todoInput.value,
        id: contador,
        fechaCreacion: new Date(),
        fechaTachado: 0
    });
    console.log(array)
    contador++
    todoInput.value = ""
}

document.getElementById("deleteButton").addEventListener("click", () =>{
    array = []
    scrollContainer.innerHTML = " "
})

document.getElementById("minTarea").addEventListener("click", () =>
{
    arrayAux = []
    if(array.length != 0)
    {
        let fechaAux = new Date()
        array.forEach(element => {
            arrayAux.push(fechaAux - element.fechaCreacion)
        });
        let minimo = Math.min(...arrayAux);
        let id = arrayAux.indexOf(minimo)
        console.log(arrayAux)
    }
})

function tacharTarea(id) {
    let checkbox = document.getElementById(id);
    let tarea = document.querySelector(`#todoList p[data-id='${id}']`);

    if (checkbox.checked) {
        tarea.classList.add('disabled');
        array.find(element => element.id === id).fechaTachado = new Date();
        tarea.classList.remove('disabled');
        array.find(element => element.id === id).fechaTachado = 0;
    }
}