function setTable(data) {
    // заполнение таблицы
    let body = document.getElementById('body');
    document.getElementById('body').innerHTML = ''
    data.map(element => {
        let tr = document.createElement('tr');
        let td = ''
        Object.values(element).map((val) => {
            td += `<td>${val}</td>`
        })
        tr.innerHTML = td;
        body.appendChild(tr);
    })
}
function sortTable(param, direction) {
    let data = document.getElementById('body');
    let daraArray = Array.from(data.rows)
        .map(row => Array.from(row.cells)
            .map(cell =>
                isNaN(cell.innerHTML) ? cell.innerHTML : parseInt(cell.innerHTML)
            ));
    const sortedData = direction === 'asc'
        ? [...daraArray].sort(function (a, b) {
            if (a[param] < b[param]) {
                return -1;
            }
            if (a[param] > b[param]) {
                return 1;
            }
            return 0;
        })
        : [...daraArray].sort(function (a, b) {
            if (b[param] < a[param]) {
                return -1;
            }
            if (b[param] > a[param]) {
                return 1;
            }
            return 0;
        });
    setTable(sortedData);
}
function l(ev) {
    if(ev.target.getAttribute("data-dir") === "desc") {
        sortTable(ev.target.cellIndex, "desc");
        ev.target.setAttribute("data-dir", "asc");
    } else {
        sortTable(ev.target.cellIndex, "asc");
        ev.target.setAttribute("data-dir", "desc");
    }

}
function searchData(ev, data) {
    let searchText = new RegExp(ev.target.value, 'i');
    let flag = false;
    if(ev.target.value.length >= 3) {
        let searchedData = [];
        document.getElementById('body').innerHTML = '';
        for (let i = 0; i < data.length; i++) {
            flag = false;
            for(let key in data[i]) {
                flag = searchText.test(data[i][key]);
                if(flag) break;
            }
            if(flag) {
                searchedData.push(data[i]);
            }
        }
        setTable(searchedData);
    } else {
        setTable(data);
    }
}

async function getData() {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if(response.ok) {
        return await response.json();
    }
}

getData().then(res => {
    let event;
    setTable(res);
    [...document.querySelectorAll('th')].map(th => th.addEventListener("click", function (e) {
        l(e)
    }))
    document.getElementById('search-input').addEventListener('keyup', (e) => searchData(e, res) )
});




