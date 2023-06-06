// Очистить окно нового напитка

function clearCreateDrinkModal() {
    const modal = document.getElementById('create-drink-modal');
    modal.querySelector('form').classList.remove('was-validated');
    document.getElementById('create-drink-modal')
        .querySelectorAll('input')
        .forEach(input => input.value = '');
}

// Добавить напиток

function createDrink(event) {
    const form = event.target;
    event.preventDefault();
    event.stopPropagation();

    const drink = {
        name: form.querySelector('#drink-name-create').value,
        price: parseInt(form.querySelector('#drink-price-create').value),
        quantity: parseInt(form.querySelector('#drink-quantity-create').value)
    };

    if (form.checkValidity()) {
        fetch('/Home/CreateDrink', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(drink)
        })
            .then(response => {
                if (response.ok) {
                    let table = document.getElementById('admin-drinks-list');
                    let tableBody = table.querySelector('tbody');

                    let newRow = document.createElement('tr');
                    newRow.innerHTML = `
                        <td>${drink.name}</td>
                        <td>${drink.price}</td>
                        <td>${drink.quantity}</td>
                        <td><img src="/icons/pencil.svg" onclick="showUpdateDrinkModal(event)"></td>
                        <td><img src="/icons/trash.svg" onclick="showDeleteDrinkModal(event)"></td>
                    `;
                    tableBody.appendChild(newRow);
                }
                else {
                    console.log('Ошибка при создании напитка');
                }
                
                $('#create-drink-modal').modal('hide');
            });
    }

    form.classList.add('was-validated')
}

// Изменить напиток

function updateDrink(event) {
    const form = event.target;
    event.preventDefault();
    event.stopPropagation();

    const drink = {
        id: parseInt(form.dataset.drinkId),
        price: parseInt(form.querySelector('#drink-price-update').value),
        quantity: parseInt(form.querySelector('#drink-quantity-update').value)
    };

    if (form.checkValidity()) {
        fetch('/Home/UpdateDrink', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(drink)
        })
            .then(response => {
                if (response.ok) {
                    let table = document.getElementById('admin-drinks-list');
                    let tableBody = table.querySelector('tbody');
                    let currentDrinkRow = tableBody.querySelector(`tr[data-drink-id="${drink.id}"]`);
                    let currentDrinkRowCells = currentDrinkRow.querySelectorAll('td');

                    currentDrinkRowCells[1].textContent = drink.price;
                    currentDrinkRowCells[2].textContent = drink.quantity;
                }
                else {
                    console.log('Ошибка при изменении данных напитка');
                }

                $('#update-drink-modal').modal('hide');
            });
    }

    form.classList.add('was-validated')
}

// Показать модальное окно удаления напитка

function showDeleteDrinkModal(event) {
    const deletedDrinkRow = event.target.closest('tr');

    const deleteModal = document.getElementById('delete-drink-modal');
    let deleteButton = deleteModal.querySelector('.btn-primary');
    deleteButton.dataset.drinkId = deletedDrinkRow.dataset.drinkId;
    let modalTitle = deleteModal.querySelector('.modal-title');
    modalTitle.textContent = deletedDrinkRow.querySelector('td:first-child').textContent;
    $('#delete-drink-modal').modal('show');
}

// Удалить напиток

function deleteDrink(event) {
    fetch('Home/DeleteDrink', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: parseInt(event.target.dataset.drinkId)
    })
        .then(response => {
            if (response.ok) {
                let table = document.getElementById('admin-drinks-list');
                let tableBody = table.querySelector('tbody');
                let currentDrinkRow = tableBody.querySelector(`tr[data-drink-id="${event.target.dataset.drinkId}"]`);
                if (currentDrinkRow != null) {
                    tableBody.removeChild(currentDrinkRow);
                }
            }
            else {
                console.log('Ошибка при удалении напитка');
            }

            $('#delete-drink-modal').modal('hide');
        })
}

// Показать модальное окно изменения напитка

function showUpdateDrinkModal(event) {
    const parentRow = event.target.closest('tr');
    const drinkFields = parentRow.querySelectorAll('td');
    const editModal = document.getElementById('update-drink-modal');

    let form = editModal.querySelector('form');
    form.dataset.drinkId = parentRow.dataset.drinkId;

    let modalTitle = editModal.querySelector('.modal-title');
    modalTitle.textContent = drinkFields[0].textContent;

    let priceField = editModal.querySelector('#drink-price-update');
    priceField.value = drinkFields[1].textContent;

    let quantityField = editModal.querySelector('#drink-quantity-update');
    quantityField.value = drinkFields[2].textContent;

    new bootstrap.Modal(document.getElementById('update-drink-modal')).show();
}

// Проверка на ввод только чисел + значимых кнопок

function inputNumbersCheck(event) {
    if (event.key === 'Delete'
        || event.key === 'Backspace'
        || event.key === 'Tab'
        || (event.keyCode >= 48 && event.keyCode <= 57) // числа на клавиатуре
    ) {

    } else {
        event.preventDefault();
    }
}

// Изменить блокировку монеты
function showChangeStateModal(event) {
    const changeStateModal = document.getElementById('change-state-modal');
    const parentRow = event.target.closest('tr');
    let modalTitle = changeStateModal.querySelector('.modal-title');
    modalTitle.textContent = parentRow.querySelector('td:first-child').textContent;
    let blockUnblock = changeStateModal.querySelector('.block-unblock');
    let changeBlockButton = changeStateModal.querySelector('.btn-primary');
    changeBlockButton.dataset.coinId = parentRow.dataset.coinId;

    if (parentRow.dataset.coinIsBlocked === 'True') {
        blockUnblock.textContent = 'разблокировать';
    }
    else {
        blockUnblock.textContent = 'заблокировать';
    }

    $('#change-state-modal').modal('show');
}

// Изменяем состояние блокировки монеты

function changeBlockState(event) {
    fetch('Home/UpdateCoin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: parseInt(event.target.dataset.coinId)
    })
        .then(response => {
            if (response.ok) {
                let table = document.getElementById('admin-coins-list');
                let tableBody = table.querySelector('tbody');
                let currentDrinkRow = tableBody.querySelector(`tr[data-coin-id="${event.target.dataset.coinId}"]`);
                let currentImg = currentDrinkRow.querySelector('img');
                currentImg.src = changeBlockIcon(currentImg.src);
            }
            else {
                console.log('Ошибка при изменении статуса блокировки монеты');
            }

            $('#change-state-modal').modal('hide');
        })
}

// Просто меняем иконку блокировки
function changeBlockIcon(src) {
    let path;
    if (src.includes('/x.svg')) path = '/icons/check.svg';
    else path = '/icons/x.svg';
    return path;
}
