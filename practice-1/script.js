function openModal() {
    let modal = document.getElementById('modal-window');
    modal.classList.add('modal-window_open');
}

function closeModal() {
    let modal = document.getElementById('modal-window');
    modal.classList.remove('modal-window_open');
}

function handleFileSelect (evt) {
    for (const file of evt.target.files) {
        let img = document.createElement('img');
        img.classList.add('photo__block__select-photo');
        const src = URL.createObjectURL(file)
        img.setAttribute('src', src );
        img.setAttribute('id', 'show-img' );
        document.getElementById('photo-block').appendChild(img);
    }
}

function handleSelectFile () {
    document.getElementById('select-file').click();
}

function deleteFile () {
    console.log(event)
    if(document.getElementById('show-img')) {
        let img = document.getElementById('show-img');
        img.removeAttribute('src');
        img.remove();
    }
}
function submitForm() {
    alert('Форма отправлена !!!!!!!!!!!!');
    closeModal();
}

document.addEventListener("DOMContentLoaded", function () {
    let eventCallBack = function (e) {
        let el = e.target,
            clearVal = el.dataset.phoneClear,
            pattern = el.dataset.phonePattern,
            matrix_def = "+7(___) ___-__-__",
            matrix = pattern ? pattern : matrix_def,
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = e.target.value.replace(/\D/g, "");
        if (clearVal !== 'false' && e.type === 'blur') {
            if (val.length < matrix.match(/([\_\d])/g).length) {
                e.target.value = '';
                return;
            }
        }
        if (def.length >= val.length) val = def;
        e.target.value = matrix.replace(/./g, function (a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
        });
    }
    let phone_inputs = document.querySelectorAll('[data-phone-pattern]');
    for (let elem of phone_inputs) {
        for (let ev of ['input', 'blur', 'focus']) {
            elem.addEventListener(ev, eventCallBack);
        }
    }
});

