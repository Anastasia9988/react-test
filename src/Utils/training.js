const items = [
    { color: 'red' },
    { color: 'green' },
    { color: 'red' },
];

function countByColor(arr) {
  return arr.reduce((acc, x) => {
      const color = x.color;
      acc[color] = (acc[color] || 0) + 1;
      return acc;
  }, []);
}

console.log(countByColor(items));

const products = [
    { id: 1, name: 'Pizza', category: 'food' },
    { id: 2, name: 'Cola', category: 'drink' },
    { id: 3, name: 'Burger', category: 'food' },
];

function filterByCategory(arrProducts, category) {
return arrProducts.filter(product => product.category === category)
}

console.log(filterByCategory(products, 'food'));

const arr = [{ id: 1, name: 'A' }, { id: 2, name: 'B' }]

function mapArrayToObjectById(arr) {
    return arr.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
    }, {})
}

console.log(mapArrayToObjectById(arr));

function debounce(fn, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    }
}

const search = debounce((value) => {
    console.log("Ищу по:", value);
}, 300);

document.querySelector("input").addEventListener("input", (e) => {
    search(e.target.value);
});

function throttle(fn, delay) {
    let lastCall = 0;

    return function (...args) {
        const now = Date.now();

        if (now - lastCall >= delay) {
            lastCall = now;
            fn.apply(this, args);
        }
    };
}


const onScroll = throttle(() => {
    console.log("Скроллю:", window.scrollY);
}, 200);

window.addEventListener("scroll", onScroll);