const userNames = ['gosho', 'pesho', 'trifon', 'kalin', 'dobri'];

function filterUNames() {
    const input = document.querySelector('input');
    const data = input.value;

    let possibleUNames = [];
    if (data !== '') {
        possibleUNames = userNames.filter(x => x.includes(data));
    }

    createUL(possibleUNames);
}

function createUL(possibleUNames) {
    let existingUl = document.querySelector('ul');

    if (existingUl !== null) {
        existingUl.remove();
    }

    let ul = document.createElement('ul');

    // ul.childNodes.forEach(child => {
    //     ul.removeChild(child);
    // });

    possibleUNames.forEach(uName => {
        const li = document.createElement('li');
        li.innerText = uName;
        ul.appendChild(li);
    });

    document.body.appendChild(ul);
}