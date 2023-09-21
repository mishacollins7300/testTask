function openModal() {
    let modal = document.getElementById('modal-window');
    modal.classList.add('modal-window_open');
}

function handleFileSelect (evt) {
    // Loop through the FileList and render image files as thumbnails.
    for (const file of evt.target.files) {

        // Render thumbnail.
        const img = document.getElementById('list')
        const src = URL.createObjectURL(file)
        img.setAttribute('src', src );
    }
}
