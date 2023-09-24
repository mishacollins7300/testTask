function setTable(data) {
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
function sortTable(data, param, direction) {
    document.getElementById('body').innerHTML = '';
    const sortedData = direction === 'asc'
        ? [...data].sort(function (a, b) {
            if (a[param] < b[param]) {
                return -1;
            }
            if (a[param] > b[param]) {
                return 1;voluptatum
            }
            return 0;
        })
        : [...data].sort(function (a, b) {
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

function searchData(ev) {
    let table = document.getElementById('body');
    let searchText = new RegExp(ev.target.value, 'i');
    let flag = false;
    if(ev.target.value.length >= 3) {
        for (let i = 0; i < table.rows.length; i++) {
            flag = false;
            for (let j = table.rows[i].cells.length - 1; j >= 0; j--) {
                flag = searchText.test(table.rows[i].cells[j].innerHTML);
                console.log(table.rows[i].cells[j].innerHTML)
                if (flag) break;
            }
            if (flag) {
                table.rows[i].style.display = "";
            } else {
                table.rows[i].style.display = "none";
            }

        }
    } else {
        for (let i = 0; i < table.rows.length; i++) {
            table.rows[i].style.display = "";
        }
    }

}

async function getData() {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if(response.ok) {
        return await response.json();
    }
}

function l(ev, data) {
    if(ev.target.getAttribute("data-dir") === "desc") {
        sortTable(data, ev.target.textContent, "desc");
        ev.target.setAttribute("data-dir", "asc");
    } else {
        sortTable(data, ev.target.textContent, "asc");
        ev.target.setAttribute("data-dir", "desc");
    }

}
getData().then(res => {
    setTable(res);
    [...document.querySelectorAll('th')].map(th => th.addEventListener("click", function (e) {
        l(e, res)
    }))
    document.getElementById('search-input').addEventListener('keyup', (e) => searchData(e) )
});




