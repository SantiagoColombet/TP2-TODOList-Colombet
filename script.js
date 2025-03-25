let btn = document.getElementById("btn")
let array = []
let todoInput
let todoList
let contador = 1

btn.addEventListener("click", () => {
    scrollContainer = document.getElementById("scroll")
    scrollContainer.innerHTML = ""
    AgregarTarea()

    array.forEach(element => {
        scrollContainer.innerHTML += `
        <li id="todoList">
            <div class="todo-container">
            <p>${element.nombre}</p>
            <input type="checkbox" class="todo-checkbox" id="${element.id}}"     
            </div>
        </li>
        `;
    });

})

function AgregarTarea (){
    todoInput = document.getElementById("todoInput")
    console.log(todoInput)
    array.push({
    nombre: todoInput.value,
    id: contador
    });
    console.log(array)
    contador++
}