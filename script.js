const add_button = document.getElementById("add_task");
const task = document.getElementById("task")
const listDiv = document.getElementById("list");
let tasks = [];
let current_index = 0


document.addEventListener("DOMContentLoaded", function() {
    load_tasks();
})


add_button.addEventListener("click", function() {
    create_task(current_index, task.value, false)
    save_tasks()
    task.value = "";
    current_index++;
});


function create_task(index, text, done) {
    const taskDiv = document.createElement("div");
    const check_box = document.createElement("input");
    check_box.type = "checkbox";
    check_box.checked = done;

    const input = document.createElement("input");
    input.type = "text";
    input.value = text;

    const delete_button = document.createElement("button");
    delete_button.textContent = "Delete";

    taskDiv.appendChild(check_box);
    taskDiv.appendChild(input);
    taskDiv.appendChild(delete_button);
    listDiv.appendChild(taskDiv);

    const task_index = index;
    tasks.push({index: index, text: input.value, done: done});
    console.log(tasks[tasks.length - 1]);

    delete_button.addEventListener("click", function() {
        const i = tasks.findIndex(t => t.index === task_index);
        if (i !== -1) tasks.splice(i, 1);
        listDiv.removeChild(taskDiv);
        save_tasks();
    });

    check_box.addEventListener("change", function() {
        const i = tasks.findIndex(t => t.index === task_index);
        if (i !== -1) tasks[i]["done"] = this.checked;
        save_tasks();
    });
};


function save_tasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

function load_tasks() {
    let loaded_tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    for(let i = 0; i < loaded_tasks.length; i++) {
        let task_data = loaded_tasks[i];
        create_task(current_index, task_data["text"], task_data["done"]);
        current_index++;
    };
};