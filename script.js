let btn = document.getElementById("btn")
let array = []
let todoInput
let todoList
let contador = 1

btn.addEventListener("click", (e) => {
    scrollContainer = document.getElementById("scroll");
    if(document.getElementById("todoInput").value) {
        scrollContainer.innerHTML = "";
        AgregarTarea();
        array.forEach(element => {
            const isChecked = element.fechaTachado !== 0 ? 'checked' : '';
            const isDisabled = element.fechaTachado !== 0 ? 'disabled' : '';
            
            scrollContainer.innerHTML += `
            <li id="todoList-${element.id}">
                <div class="todo-container">
                <p data-id="${element.id}" class="${isDisabled}">${element.nombre}</p>
                <input type="checkbox" class="todo-checkbox" id="checkbox-${element.id}" onchange="tacharTarea(${element.id})" ${isChecked}>    
                </div>
            </li>
            `;
        });
    }
});

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
    scrollContainer = document.getElementById("scroll");
    scrollContainer.innerHTML = " "
})

document.getElementById("minTarea").addEventListener("click", () => {
    let arrayAux = [];

    if (array.length !== 0) {
        array.forEach(element => {
            if (element.fechaTachado !== 0) { 
                let timeDiff = element.fechaTachado.getTime() - element.fechaCreacion.getTime();
                arrayAux.push({
                    id: element.id,
                    timeDiff: timeDiff,
                    nombre: element.nombre
                });
            }
        });

        if (arrayAux.length > 0) {
            arrayAux.sort((a, b) => a.timeDiff - b.timeDiff);
            
            let tareaMin = arrayAux[0];
            alert(`La tarea que menos tardó en tacharse es: "${tareaMin.nombre}", con un tiempo de ${tareaMin.timeDiff} ms.`);
        } else {
            alert("No hay tareas tachadas.");
        }
    } else {
        alert("No hay tareas.");
    }
});

function tacharTarea(id) {
    let checkbox = document.getElementById(`checkbox-${id}`);
    let tarea = document.querySelector(`p[data-id='${id}']`);

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