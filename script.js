const textareaElement = document.getElementById('data-input');
const bodyElement = document.documentElement;
const textContainer = document.querySelector('.js-data-list');

let textArray = JSON.parse(localStorage.getItem('arraylist'));

let counterId = JSON.parse(localStorage.getItem('counter'));

if (!textArray) {
    textArray = [{
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque facere expedita, sint in tenetur qui soluta iusto mollitia dolorum ipsum doloribus? Illum possimus eligendi est sunt, provident culpa. Quidem, placeat?
        Suscipit repellendus rerum necessitatibus voluptas! Deleniti doloremque minima voluptatum sunt, totam porro necessitatibus, dolore exercitationem deserunt repudiandae excepturi. Quia in cumque, praesentium impedit laudantium iusto porro dicta saepe placeat autem.`,
        id: 1
    }]
}

window.addEventListener('click', (event) => {
    if (event.target.matches('textarea')) {
        return;
    } else if (event.target.matches('.js-plus-sign')) {
        bodyElement.toggleAttribute('plus');
    } else if (event.target.matches('#save-btn')) {
        passData();
    } else if (event.target.matches('.outer-shell')) {
        bodyElement.toggleAttribute('plus')
    }
});

function passData() {
    const data = textareaElement.value;

    if (!data) {
        return;
    } else {
        textArray.unshift({
            content: data,
            id: counterId += 1
        });
    
        displayData();
    
        saveToStorage('counter', counterId);
    
        textareaElement.value = '';

        bodyElement.toggleAttribute('plus');
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
                console.log(id);
            })
        });
}

displayData();