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
    let uniqueId = getUniqueRandomIdInRange(1, 100, idList);
    list.push({id: uniqueId, name: nameTask, status, priority});
}

function getUniqueRandomIdInRange(minId, maxId, existId) {
    let randomNumberInRange = Math.floor(Math.random() * (maxId - minId) + minId);
    return existId.includes(randomNumberInRange) ? getUniqueRandomIdInRange(minId, maxId, existId) : randomNumberInRange;
}

function deleteTask(nameTask) {
    let index = list.findIndex((item) => item.name === nameTask);
    return (index !== -1) && list.splice(index, 1);
}

function changeStatus(nameTask, newStatus) {
    list.forEach(item => {
        if (item.name === nameTask) {
            item.status = newStatus;
        }
    });
};

function showList(targetGroup) {
    let sortList = list.sort((a, b) => {
        // Меняем местами a и b, чтобы отсортировать массив по убыванию названий статуса To Do -> In Progress -> Done
        if (targetGroup === 'status') {
            [a, b] = [b, a];
        }
        return (a[targetGroup] > b[targetGroup]) ? 1 : -1;
    })

    let output = sortList.map((elem, index, array) => {
        return (index > 0 && (elem[targetGroup] === array[index - 1][targetGroup]))
            ? `\n\t${elem.name}`
            : `\n${elem[targetGroup]}:\n\t${elem.name}`
        }).join().trim();

    console.log(output);
}

addTask('test 6', 'To Do', 'low');
addTask('sport', 'To Do', 'high');
changeStatus('sport', 'In Progress');
deleteTask('test 6');
addTask('driving', 'Done', 'high');

console.log('=================== showList( \'priority\' ) ======================================');
showList('priority');
console.log('=================== showList( \'status\' ) ======================================');
showList('status');
console.log('=================== showList( \'id\' ) ======================================');
showList('id');