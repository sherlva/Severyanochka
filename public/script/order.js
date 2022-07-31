const dateInp = document.querySelector('.hidden_input')
const date = document.querySelector('.time_price_date')
const dateText = document.querySelector('.order_date');
const viewBtn = document.querySelector('.view_more_btn');
const hideCards = document.querySelector('.hide_cards');

dateInp.addEventListener('click', () => {
    // dateText.innerHTML = dateInp
    console.log(dateInp.value);
})



viewBtn.addEventListener('click', () => {
    hideCards.style.position = 'unset'
    viewBtn.style.display = 'none'
})
