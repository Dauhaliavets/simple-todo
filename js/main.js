const listToDo = {
    "create a task": "In Progress",
    "make a bed": "Done",
    "write a post": "To Do",
}

function changeStatus(list, task, newStatus) {
    for (const listKey in list) {
        if (listKey === task) {
            list[listKey] = newStatus;
        }
    }
};

function addTask(list, task, status) {
    list[task] = status;
};

function deleteTask(list, task) {
    delete list[task];
}

function changeFormat(str){
    return '\t"' + str + '",\n';
}

function showList(list) {

    const toDo = 'To Do';
    const inProgress = 'In Progress';
    const done = 'Done';

    let toDoToString = '';
    let inProgressToString = '';
    let doneToString = '';

    let output = '';

    for (const listKey in list) {

        if(list[listKey] === toDo) {
            toDoToString += changeFormat(listKey);
        }
        if(list[listKey] === inProgress) {
            inProgressToString += changeFormat(listKey);
        }
        if(list[listKey] === done) {
            doneToString += changeFormat(listKey);
        }

    }

    toDoToString = toDoToString || '\t-\n';
    inProgressToString = inProgressToString || '\t-\n';
    doneToString = doneToString || '\t-\n';

    // toDoToString === '' ? toDoToString = '\t-\n' : toDoToString;
    // inProgressToString === '' ? inProgressToString = '\t-\n' : inProgressToString;
    // doneToString === '' ? doneToString = '\t-\n' : doneToString;


    output = 'Todo:\n' + toDoToString + 'In Progress:\n' + inProgressToString + 'Done:\n' + doneToString;

    return output;

}


console.log("List BEFORE: ", listToDo);
changeStatus(listToDo, "write a post", "Done");
addTask(listToDo,'have a walk', "To Do");
deleteTask(listToDo, 'have a walk');
changeStatus(listToDo, "make a bed", "To Do");
deleteTask(listToDo, 'write a post');
console.log(showList(listToDo));
console.log("List AFTER: ", listToDo);
