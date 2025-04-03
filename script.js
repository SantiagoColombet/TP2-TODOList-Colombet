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

document.getElementById("minTarea").addEventListener("click", () => {
    let arrayAux = [];

    if (array.length !== 0) {
        array.forEach(element => {
            if (element.fechaTachado !== 0) { 
                arrayAux.push(element.fechaTachado - element.fechaCreacion);
            } else {
                arrayAux.push(Infinity); 
            }
        });

        let minimo = Math.min(...arrayAux);

        if (minimo !== Infinity) { 
            let id = arrayAux.indexOf(minimo);
            let tareaMin = array[id]; 
            console.log(`La tarea que menos tardó en tacharse es: "${tareaMin.nombre}", con un tiempo de ${minimo} ms.`);
        } else {
            console.log("No hay tareas tachadas.");
        }
    }
});


function tacharTarea(id) {
    let checkbox = document.getElementById(id);
    let tarea = document.querySelector(`#todoList p[data-id='${id}']`);

    if (checkbox.checked) {
        tarea.classList.add('disabled');
        let tareaObj = array.find(element => element.id === id);
        tareaObj.fechaTachado = new Date(); 
    } else {
        tarea.classList.remove('disabled');
        let tareaObj = array.find(element => element.id === id);
        tareaObj.fechaTachado = 0;
    }
}