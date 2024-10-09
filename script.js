const textareaElement = document.getElementById('data-input');
const bodyElement = document.documentElement;

const textArray = [{
    textContent: undefined,
    id:undefined
}];


textareaElement.value = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta numquam reprehenderit eligendi nisi et asperiores perspiciatis rem ratione minima sint, id repellat quia quo sequi, provident eum, nulla dolores quos.Sunt nostrum exercitationem neque amet voluptatum possimus atque quasi dolorem, quos laudantium ea deserunt dolorum necessitatibus illum temporibus magni repellendus architecto facere magnam laboriosam, minus quidem! Earum vero facilis fuga.
Nihil eius quo ad commodi! Animi doloribus dolores eius, voluptatum quod excepturi vel rerum aliquid reprehenderit esse pariatur earum! Quidem consectetur earum impedit magnam quod ea saepe animi similique ducimus?
Quia exercitationem sunt cumque sapiente minus tenetur. Consequuntur, quo dolores quam doloremque beatae aut dolorum quas laborum expedita alias fugiat animi repudiandae ipsa eaque sequi harum molestias neque autem architecto!
Dolorum, esse sed. Suscipit minima, ducimus tempora dignissimos neque magni? Tempore eaque id doloremque. Nam possimus nulla quos ullam aliquid! Modi eveniet impedit, facere perspiciatis quo voluptatibus consequuntur at quis?`;

window.addEventListener('click', (event) => {
    if (event.target.matches('textarea')) {
        return;
    } else if (event.target.matches('.js-plus-sign')) {
        console.log('ok')
        bodyElement.toggleAttribute('plus');
    } else if (event.target.matches('#save-btn')) {
        console.log(textareaElement.value);
        bodyElement.toggleAttribute('plus');
    } else if (event.target.matches('.outer-shell')) {
        bodyElement.toggleAttribute('plus')
    }
});