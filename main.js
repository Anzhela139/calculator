/* Значения из текстовых инпутов */

const totalCost = document.getElementById('total-cost'),
    anInitialFee = document.getElementById('an-initial-fee'),
    creidtTerm = document.getElementById('credit-term');

/* Значения из range инпутов */

const totalCostRange = document.getElementById('total-cost-range'),
    anInitialFeeRange = document.getElementById('an-initial-fee-range'),
    creidtTermRange = document.getElementById('credit-term-range');

/* Итоговые значения */

const totalAmountOfCredit = document.getElementById('amount-of-credit'),
    totalMonthlyPayment = document.getElementById('monthly-payment'),
    totalRecommendedIncome = document.getElementById('recommended-income');


/* Все range : */
const inputsRange = document.querySelectorAll('.input-range');

/* Все кнопки с процентной ставкой : */
const bankBtns = document.querySelectorAll('.bank');

const assignValue = () => {
    totalCost.value = totalCostRange.value;
    anInitialFee.value = anInitialFeeRange.value;
    creidtTerm.value = creidtTermRange.value;
}

assignValue();

const banks = [
    {
        name: 'alfa',
        precents: 8.7
    },
    {
        name: 'sberbank',
        precents: 8.4
    },
    {
        name: 'pochta',
        precents: 7.9
    },
    {
        name: 'tinkoff',
        precents: 9.2
    },
]

let currentPrecent = banks[0].precents;
console.log(banks[0].precents);