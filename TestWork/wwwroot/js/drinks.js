// Проверяем состояние блокировки + увеличиваем сумму

document.querySelectorAll('.store-coin-container').forEach(container => {
    const blockState = container.dataset.coinIsBlocked;
    if (blockState === 'False') {
        container.classList.add('active');
        container.addEventListener('click', (event) => {
            const coin = event.currentTarget.querySelector('.store-coin-denomination');
            let sumField = document.getElementById('current-money');
            sumField.value = parseInt(sumField.value) + parseInt(coin.textContent);
        });
    }
    else {
        container.style.backgroundColor = '#f59eb5';
    }
})

// Покупаем напиток

function buyDrink(event) {
    const container = event.currentTarget;

    const name = container.querySelector('.store-drink-label').textContent;
    const drinkId = parseInt(container.dataset.drinkId);

    let quantityField = container.querySelector('.store-drink-quantity');
    const quantity = parseInt(quantityField.textContent);

    let priceField = container.querySelector('.store-drink-price');
    const price = parseInt(priceField.textContent);

    let sumField = document.getElementById('current-money');
    let currentSum = parseInt(sumField.value);

    if (currentSum >= price) {
        if (quantity > 0) {
            fetch('Home/ChangeDrinkQuantity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: drinkId
            })
                .then(response => {
                    if (response.ok) {
                        quantityField.textContent = quantity - 1;
                        sumField.value = currentSum - price;
                        console.log(`Успешно куплен напиток: ${name}`);
                    }
                })
        }
        else {
            console.log(`Закончился напиток: ${name}`);
        }

    }
    else {
        console.log(`У вас недостаточно денег для покупки напитка: ${name}`);
    }
}
