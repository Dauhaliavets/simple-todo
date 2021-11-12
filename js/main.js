const list = [
    {
        id: 1,
        name: 'create post',
        status: 'To Do',
        priority: 'low',
    },
    {
        id: 2,
        name: 'test',
        status: 'Done',
        priority: 'high',
    },
    {
        id: 3,
        name: 'write book',
        status: 'In Progress',
        priority: 'high',
    },
]

function addTask(nameTask, status, priority) {

    let idList = list.map(item => item.id);

    function getUniqueRandomId(minId, maxId, existId) {
        let randomNumberInRange = Math.floor(Math.random() * (maxId - minId) + minId);
        return existId.includes(randomNumberInRange) ? getUniqueRandomId(minId, maxId, existId) : randomNumberInRange;
    }

    let uniqueId = getUniqueRandomId(1, 20, idList);

    list.push({id: uniqueId, name: nameTask, status: status, priority: priority});

}

function deleteTask(nameTask) {

    let index = list.findIndex((item) => item.name === nameTask);

    return (index >= 0) && list.splice(index, 1);

    // return list.filter(item => item.name !== nameTask);
}

function changeStatus(nameTask, newStatus) {
    list.forEach(item => {
        if (item.name === nameTask) {
            item.status = newStatus;
        }
    });
};

function showList(targetGroup = 'status') {

    const sortList = list.sort((a, b) => {
        // Меняем местами a и b, чтобы отсортировать массив по убыванию названий статуса To Do -> In Progress -> Done
        if (targetGroup === 'status') {
            [a, b] = [b, a];
        }
        if (a[targetGroup] > b[targetGroup]) {
            return 1;
        }
        if (a[targetGroup] < b[targetGroup]) {
            return -1;
        }
    })

    const mappedList = sortList.map(function (elem, index, array) {
        if (index > 0 && elem[targetGroup] === array[index - 1][targetGroup]) {
            return `\n\t${elem.name}`;
        } else {
            return `\n${elem[targetGroup]}:\n\t${elem.name}`;
        }
    });

    return console.log(mappedList.join().trim());

}


console.log('=================== addTask(\'test 6\', \'Done\', \'low\') ======================================');
addTask('test 6', 'Done', 'low');
showList('status');
console.log('=================== addTask(\'sport\', \'Done\', \'low\') ======================================');
addTask('sport', 'Done', 'low');
showList('status');
console.log('=================== changeStatus(\'sport\', \'In Progress\') ======================================');
changeStatus('sport', 'In Progress');
showList('status');
console.log('=================== deleteTask(\'test 6\') ======================================');
deleteTask('test 6');
showList('status');
console.log('=================== addTask(\'sport\', \'Done\', \'low\') ======================================');
addTask('driving', 'Done', 'low');
showList('status');

console.log('=================== showList(\'priority\') ======================================');
showList('priority');
console.log('=================== showList(\'status\') ======================================');
showList('status');
console.log('=================== showList(\'id\') ======================================');
showList('id');
