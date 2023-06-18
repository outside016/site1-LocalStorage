let content = document.querySelector('.create')
let show = document.querySelector('.button-open')

show.addEventListener('click', () => {
    content.style.display = 'block'
    show.style.display = 'none'
});

const Post = {
    action(e) {
        const target = e.target;
        if (target.classList.contains('todo__action')) {
            const action = target.dataset.todo__action;
            const elemItem = target.closest('.data');
            elemItem.dataset.todoState = action;
            this.save();
        } else if (target.classList.contains('create__button')) {
            this.add();
            this.save();
        }
    },
    add() {
        let elemTitle = document.querySelector('.create__input-title');
        let elemText = document.querySelector('.create__input-text');

        if (elemText.disabled || !elemText.value.length) {
            return;
        }
        if (elemTitle.disabled || !elemTitle.value.length) {
            return;
        }
        document.querySelector('.data-base').insertAdjacentHTML('afterbegin', this.create(elemTitle.value, elemText.value));
        elemTitle.value = '';
        elemText.value = '';
    },
    create(title, text) {
        const date = new Date().toLocaleString().slice(0, -3)
        return `
<div class="data">
<div>
<h2 class="data__title">${title}</h2>
</div>              
<div>
<p class="data__text">${text}</p>
</div>              
<div class="data__time">
<div class="data__time-create"><p>Дата создания: ${date}</p></div>
<div class="data__time-edit"><p>Дата редактирования: ${date}</p></div>
</div>
</div>`;
    },

    init() {
        const fromStorage = localStorage.getItem('post');
        if (fromStorage) {
            document.querySelector('.data-base').innerHTML = fromStorage;
        }
        document.addEventListener('click', this.action.bind(this));
        const option = 'active';
        document.querySelector('.data-base').dataset = option;
        document.querySelector('.create__input-title').disabled = option !== 'active';
        document.querySelector('.create__input-text').disabled = option !== 'active';

    },
    save() {
        localStorage.setItem('post', document.querySelector('.data-base').innerHTML);
    }

};
Post.init();