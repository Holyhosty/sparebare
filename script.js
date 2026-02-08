function handleUpload(event) {
    event.preventDefault();
    const fileInput = document.getElementById('taxFile');
    const suggestionsSection = document.getElementById('suggestions');
    const suggestionList = document.getElementById('suggestion-list');

    // Fjern tidligere forslag
    suggestionList.innerHTML = '';

    if (!fileInput.files || fileInput.files.length === 0) {
        alert('Vennligst velg en fil før du sender inn.');
        return;
    }

    // Bygg formdata for opplasting
    const formData = new FormData();
    formData.append('taxFile', fileInput.files[0]);

    // Send filen til backend for analyse. Juster URL-en hvis serveren kjører et annet sted.
    fetch('https://sparebare-backend-1.onrender.com/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert('Feil: ' + data.error);
            return;
        }
        const suggestions = data.suggestions || [];
        suggestions.forEach(suggestion => {
            const li = document.createElement('li');
            li.textContent = `${suggestion.description} – ${suggestion.effect}`;
            suggestionList.appendChild(li);
        });
        suggestionsSection.classList.remove('hidden');
    })
    .catch(err => {
        console.error('Upload error', err);
        alert('Noe gikk galt under opplastingen.');
    });
}
