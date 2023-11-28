(function() {
    
    let data = [
        {content: "Clean the house", doneStatus: true, id: 68}, 
        {content: "Do laundry", doneStatus: false, id: 23},
        {content: "Wash the dishes", doneStatus: false, id: 43},
        {content: "Bake cookies", doneStatus: true, id: 123},
    ];
    //создание заголовка
    function createMainHeader(name) {
        let mainHeader = document.createElement('h2');
        mainHeader.textContent = name;

        return mainHeader;
    }

    //создание формы
    function createToDoForm() {
        let mainForm = document.createElement('form');
        mainForm.classList.add('input-group', 'mb-3');

        let mainInput = document.createElement('input');
        mainInput.placeholder = 'What are you gonna do?';
        mainInput.classList.add('form-control');

        let buttonGroup = document.createElement('div');
        buttonGroup.classList.add('input-group-append');

        let submitButton = document.createElement('button');
        submitButton.classList.add('btn', 'btn-info');
        submitButton.textContent = 'Send';

        mainForm.insertAdjacentElement('beforeend', mainInput);
        buttonGroup.insertAdjacentElement('beforeend', submitButton);
        mainForm.insertAdjacentElement('beforeend', buttonGroup);

        return {
            mainForm,
            submitButton,
            mainInput
        }
    }

    //создание списка:
    function createToDoList() {
        let toDoList = document.createElement('ul');
        toDoList.classList.add('list-group');

        return toDoList;
    }

    //создание дела в список
    function createToDoItem(object, listName) {
        let toDoItem = document.createElement('li');
        toDoItem.classList.add('list-group-item', 'd-flex', 'align-items-center', 'justify-content-between', 'mb-3');
        toDoItem.textContent = object.content;
        if (object.doneStatus) {
            toDoItem.classList.add('list-group-item-success');
        }

        let buttonGroup = document.createElement('div');
        buttonGroup.classList.add('input-group-append');

        let doneButton = document.createElement('button');
        doneButton.classList.add('btn', 'btn-success', 'mr-3');
        doneButton.textContent = 'Done';

        let deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Delete';
        
        buttonGroup.insertAdjacentElement('beforeend', doneButton);
        buttonGroup.insertAdjacentElement('beforeend', deleteButton);
        toDoItem.insertAdjacentElement('beforeend', buttonGroup);

        doneButton.addEventListener('click', () => {
            toDoItem.classList.toggle('list-group-item-success');
            if (object.doneStatus) {object.doneStatus = false} else {object.doneStatus = true};
            localStorage.setItem(listName, JSON.stringify(data));
        })

        deleteButton.addEventListener('click', () => {
            if (confirm('Are you sure?')) {
                toDoItem.remove();
                for (let i = 0; i < data.length; i++) {
                    if ((data[i]).id == object.id) {
                        data.splice(i, 1); 
                        localStorage.setItem(listName, JSON.stringify(data));}
                }
            }
        })

        return {
            toDoItem,
            doneButton,
            deleteButton
        }
    }

    function createToDoApp(container, title, listName) {
        let header = createMainHeader(title); 
        let form = createToDoForm();
        let list = createToDoList();
        
        //загрузка из массива
        let fromLS = JSON.parse(localStorage.getItem(listName));
        
        if ((fromLS !== null)&&(fromLS !== '')) {data = fromLS} 
        for (let i of data) {
            let createdToDo = createToDoItem(i, listName);
            list.insertAdjacentElement('beforeend', createdToDo.toDoItem);
            localStorage.setItem(listName, JSON.stringify(data));
        }
        
                
        container.insertAdjacentElement('beforeend', header);
        container.insertAdjacentElement('beforeend', form.mainForm);
        container.insertAdjacentElement('beforeend', list);

        form.mainForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!form.mainInput.value) {return};
            let itemInfo = {
                            'content' : form.mainInput.value,
                            'doneStatus' : false,
                            'id' : Math.round(Math.random()*100),
            };
            data.push(itemInfo);
            let listItem = createToDoItem(itemInfo);
            list.insertAdjacentElement('beforeend', listItem.toDoItem);

            localStorage.setItem(listName, JSON.stringify(data));
            form.mainInput.value = '';
            
        })
    }

    window.createToDoApp = createToDoApp;

}) ();