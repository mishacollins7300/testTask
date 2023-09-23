function setTable(data) {
    // для динамичского создавания хедера таблицы
    let header = document.getElementById('head-tr');
    let headerColumn = '';
    Object.keys(data[0]).map(key => {
        headerColumn += `<th>${key}</th>`
    })
    header.innerHTML = headerColumn;

    // заполнение таблицы
    let body = document.getElementById('body');
    data.map(element => {
        let tr = document.createElement('tr');
        let td = ''
        Object.values(element).map(val => {
            td += `<td>${val}</td>`
        })
        tr.innerHTML = td;
        body.appendChild(tr);
    })
}

async function getData() {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if(response.ok) {
        return await response.json();
    }
}

getData().then(res => setTable(res));