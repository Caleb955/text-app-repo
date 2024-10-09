const textareaElement = document.getElementById('data-input');
const bodyElement = document.documentElement;
const textContainer = document.querySelector('.js-data-list');
const saveButton = document.getElementById('save-btn');

let textArray = JSON.parse(localStorage.getItem('arraylist')) || [];

let counterId = JSON.parse(localStorage.getItem('counter'));

window.addEventListener('click', (event) => {
    if (event.target.matches('textarea')) {
        return;
    } else if (event.target.matches('.js-plus-sign')) {
        toggleSomething();
    } else if (event.target.matches('#save-btn')) {
        passData();
    } else if (event.target.matches('.outer-shell')) {
        toggleSomething();
        textareaElement.value = '';
    }
});

function passData() {
    const data = textareaElement.value;

    if (!data) {
        return;
    } else {
        const {id} = saveButton.dataset;
        
        let matchingId;

        textArray.forEach((content) => {
            if (content.id === id) {
                matchingId = content;
            }
        });

        if (matchingId) {
            matchingId.content = data;
            toggleSomething();
            displayData();
            textareaElement.value = '';
        } else {
            textArray.unshift({
                content: data,
                id: String(counterId += 1)
            });
        
            displayData();
        
            saveToStorage('counter', counterId);
        
            textareaElement.value = '';
        
            toggleSomething();
        }
        
    }
}

function saveToStorage(name, variable) {
    localStorage.setItem(name, JSON.stringify(variable));
}

function displayData() {
    let textHTML = '';

    textArray.forEach((textcontent) => {
        textHTML += `
            <div id="list-item-container" class="list-item-container" data-id=${textcontent.id}>
                <div class="list-item">
                ${textcontent.content}
                </div>
            </div>
        `;
    });

    textContainer.innerHTML = textHTML;

    saveToStorage('arraylist', textArray);

    document.querySelectorAll('.list-item-container')
        .forEach((container) => {
            container.addEventListener('click', () => {
                const {id} = container.dataset;
                
                editText(id);
            })
        });
}

displayData();

function editText(id) {
    const data = textArray.find((textcontent) => {
        return textcontent.id === id
    });

    toggleSomething();

    textareaElement.value = data.content;
    saveButton.setAttribute('data-id', id)
}

function toggleSomething() {
    bodyElement.toggleAttribute('plus');
}