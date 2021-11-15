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
    list.push( {id: uniqueId, name: nameTask, status: status, priority: priority} );
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
    list.forEach(item => (item.name === nameTask) && (item.status = newStatus));
};

function getUniqueTargets(listName, targetGroup) {
    return listName
        .map(item => item[targetGroup])
        .filter(((item, index, array) => array.indexOf(item) === index));
}

function showList(targetGroup) {
    let uniqueTargets = getUniqueTargets(list, targetGroup);
    uniqueTargets.sort((a, b) => {
        // Меняем местами a и b, чтобы отсорт. массив по убыв.названий статуса To Do -> In Progress -> Done
        (targetGroup === 'status') && ([a, b] = [b, a]);
        return (a > b) ? 1 : -1;
    });

    for (const uniqueTarget of uniqueTargets) {
        console.log(`${uniqueTarget}:`);
        list
            .filter(item => item[targetGroup] === uniqueTarget)
            .forEach(item => console.log(`    ${item.name}`));
    }
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