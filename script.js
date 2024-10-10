const textareaElement = document.getElementById('data-input');
const bodyElement = document.documentElement;
const textContainer = document.querySelector('.js-data-list');
const saveButton = document.getElementById('save-btn');


let textArray = JSON.parse(localStorage.getItem('arraylist')) || [];

let counterId = JSON.parse(localStorage.getItem('counter')) || 0;

document.addEventListener('click', (event) => {
    if (event.target.matches('textarea')) {
        return;
    } else if (event.target.matches('.js-plus-sign')) {
        toggleSomething();
    } else if (event.target.matches('#save-btn')) {
        passData();
    } else if (event.target.matches('.outer-shell')) {
        toggleSomething();
        textareaElement.value = '';
        saveButton.setAttribute('data-id', '')
    } else if (event.target !== event.target.matches('.js-menu-icon')) {
        removeMenu();
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
            if (content.id === Number(id)) {
                matchingId = content;
            }
        });

        if (matchingId) {
            matchingId.content = data;
            saveToStorage('arraylist', textArray)
            toggleSomething();


            displayData();
            textareaElement.value = '';
            saveButton.setAttribute('data-id', '')
        } else {
            textArray.unshift({
                content: data,
                id: counterId += 1
            });
        
            displayData();
        
            saveToStorage('counter', counterId);
            saveToStorage('arraylist', textArray)
        
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

    textArray.forEach((textcontent, index) => {
        textHTML += `
            <div id="list-item-container" class="list-item-container" data-id=${textcontent.id}>
                <div class="list-item">
                ${textcontent.content}
                </div>
                <div class="menu-icon js-menu-icon" data-id=${textcontent.id}>...</div>
                <div class="menu-list menu-list-${textcontent.id}">
                    <ul>
                        <li data-id=${textcontent.id}>Open note</li>
                        <li class="delete-btn" data-id=${index}>Delete note</li>
                    </ul>
                </div>
            </div>
        `;
    });

    textContainer.innerHTML = textHTML;

    document.querySelectorAll('.list-item-container')
        .forEach((container) => {
            container.addEventListener('click', () => {
                const {id} = container.dataset;
                
                editText(Number(id));
            });
        });
    
    const dotElement = document.querySelectorAll('.js-menu-icon');

    dotElement.forEach((dot) => {
        dot.addEventListener('click', (event) => {
            removeMenu();

            const {id} = dot.dataset;
            event.stopPropagation();
            
            const currentSelector = document.querySelector(`.menu-list-${id}`);
            currentSelector.style.opacity = '1';
            currentSelector.style.pointerEvents = 'all';
            currentSelector.style.transform = 'translateY(0px)';
        });
    });

    const deleteButton = document.querySelectorAll('.delete-btn');

    deleteButton.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.stopPropagation();

            const {id} = link.dataset;
            textArray.splice(id, 1);
            saveToStorage('arraylist', textArray);
            displayData();
        });
    });

}

function removeMenu() {
    const currentSelector = document.querySelectorAll(`.menu-list`);

    currentSelector.forEach((selector) => {
        selector.style.opacity = '';
        selector.style.pointerEvents = '';
        selector.style.zIndex = '';
        selector.style.transform = '';
    })
}

function editText(id) {
    const data = textArray.find((textcontent) => {
        return textcontent.id === id;
    });

    toggleSomething();

    textareaElement.value = data.content;

    saveButton.setAttribute('data-id', id)
}

function toggleSomething() {
    bodyElement.toggleAttribute('plus');
}

displayData();