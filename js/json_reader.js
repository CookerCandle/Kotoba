const dropZone = document.getElementById('drop-zone');
const drop = document.getElementById('drop')
const output = document.getElementById('output');

function clearOutput() {
    output.innerHTML = '';
}

function createCopyButton(textToCopy) {
    const copyButton = document.createElement('button');
    copyButton.textContent = 'Скопировать';
    copyButton.className = 'copy-button';
    copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(textToCopy).then(() => {
            copyButton.textContent = 'Скопировано!';
            setTimeout(() => copyButton.textContent = 'Скопировать', 2000);
        });
    });
    return copyButton;
}

drop.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = 'green';
});

drop.addEventListener('dragleave', () => {
    dropZone.style.borderColor = '#aaa';
});

drop.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = '#aaa';

    const file = e.dataTransfer.files[0];
    if (!file || file.type !== 'application/json') {
        clearOutput();
        output.textContent = 'Пожалуйста, загрузите JSON-файл.';
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        clearOutput();
        try {
            const json = JSON.parse(event.target.result);
            if (!Array.isArray(json.subtitles)) {
                output.textContent = 'Ошибка: не найден массив subtitles';
                return;
            }

            const texts = json.subtitles.map(entry => entry.text).join('\n');
            const pre = document.createElement('pre');
            pre.textContent = texts;
            pre.className = 'json-output';

            const copyBtn = createCopyButton(texts);
            output.appendChild(copyBtn);
            output.appendChild(pre);

        } catch (err) {
            output.textContent = 'Ошибка при чтении JSON: ' + err.message;
        }
    };
    reader.readAsText(file);
});
