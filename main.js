const date_picker_element = document.querySelector('.date-picker');
const data_element = document.querySelector('.data');
const date_element = document.querySelector('.dates');
const but = document.querySelector('.butt');

const luna_element = document.querySelector('.luna_curenta');
const prev_m_element = document.querySelector('.prev');
const next_m_element = document.querySelector('.next');
const zile_element = document.querySelector('.zile');
const luni = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];

let date = new Date();
let zi = date.getDate();
let luna_n = date.getMonth();
let an = date.getFullYear();

let data_selectata = date;
let zi_selectata = zi;
let luna_selectata = luna_n;
let an_selectat = an;

let min = -4;

luna_element.textContent = luni[luna_n] + ' ' + an;
data_element.textContent = formatDate(date);
add_date();

date_picker_element.addEventListener('click', toggleDatePicker);
next_m_element.addEventListener('click', next_m);
prev_m_element.addEventListener('click', prev_m);
but.addEventListener('click', resetmth);

function resetmth(e) {
    zi = date.getDate();
    luna_n = date.getMonth();
    an = date.getFullYear();
    data_selectata = date;
    zi_selectata = zi;
    luna_selectata = luna_n;
    an_selectat = an;
    luna_element.textContent = luni[luna_n] + ' ' + an;
    data_element.textContent = formatDate(date);
    add_date(2, -2);
}

function toggleDatePicker(e) {
    let ok = 0;
    for (let i = 0; i < 5; i++) {
        if (e.path[i].classList && e.path[i].classList.contains('dates')) {
            ok = 1;
        }
    }
    if (ok == 0)
        date_element.classList.toggle('active');
}

function next_m(e) {
    lp = luna_n;
    luna_n++;
    if (luna_n > 11) {
        luna_n = 0;
        an++;
    }
    luna_element.textContent = luni[luna_n] + ' ' + an;
    add_date(lp, 1);
}

function prev_m(e) {
    luna_n--;
    if (luna_n < 0) {
        luna_n = 11;
        an--;
    }
    luna_element.textContent = luni[luna_n] + ' ' + an;
    add_date(luna_n, -1);
}

function add_date(lp, dir, e) {
    zile_element.innerHTML = '';
    let nr_zile = 31;
    if (luna_n == 1) {
        nr_zile = 28;
    }
    if (luna_n == 1 && (an % 100 === 0) ? (an % 400 === 0) : (an % 4 === 0)) {
        nr_zile = 29;
    }
    if (luna_n == 3 || luna_n == 5 || luna_n == 8 || luna_n == 10)
        nr_zile = 30;
    if (lp == 3 || lp == 5 || lp == 8 || lp == 10)
        lp = 2;
    else
    if (lp == 1 && ((an % 100 == 0) ? (an % 400 == 0) : (an % 4 == 0)))
        lp = 1;
    else
    if (lp == 1)
        lp = 0;
    else
        lp = 3;
    if (dir == 1) {
        min -= lp;
        if (min < -6)
            min += 7;
    }
    if (dir == -1) {
        min += lp;
        if (min > 0)
            min -= 7;
    }
    if (dir == -2)
        min = -4;
    for (let i = min; i < nr_zile; i++) {
        const zi_element = document.createElement('div');
        zi_element.classList.add('zi');
        if (i + 1 >= 1) {
            zi_element.textContent = i + 1;

            if (zi_selectata == (i + 1) && an_selectat == an && luna_selectata == luna_n) {
                zi_element.classList.add('selected');
            }
        }

        zi_element.addEventListener('click', function() {
            data_selectata = new Date(an + '-' + (luna_n + 1) + '-' + (i + 1));
            zi_selectata = (i + 1);
            luna_selectata = luna_n;
            an_selectat = an;

            data_element.textContent = formatDate(data_selectata);
            data_element.dataset.value = data_selectata;

            add_date();
        });

        zile_element.appendChild(zi_element);
    }
}

function formatDate(d) {
    let zi = d.getDate();
    if (zi < 10)
        zi = '0' + zi;
    let luna = d.getMonth() + 1;
    if (luna < 10)
        luna = '0' + luna;
    let an = d.getFullYear();
    return zi + ' / ' + luna + ' / ' + an;
}