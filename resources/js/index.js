import magazines from "../data/magazines.js";

let RssFeed = "https://api.rss2json.com/v1/api.json?rss_url=";

async function getNews() {
    try {
        const res = await Promise.all(
            magazines.map(url => fetch(RssFeed + url))
        );
        return await Promise.all(
            res.map(res => res.json)
        );
    }
    catch (e) {
        return null;
    }
}

function getAccordian({feed, items}, expanded, id) {
    const item = document.createElement('div');
    item.className = 'accordion-item';
    item.innerHTML = `
        <h2 class='accordion-header' id='heading'>
            <button class='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='${ `#collapse-${ id }` }'>
                <span>${ feed.title }</span>
            </button> 
        </h2> 
        <div id='${ `collapse-${ id }` }' class='accordion-collapse collapse ${ expanded ? 'show': '' }' data-bs-parent='#accordianId'>
            <div class='accordion-body'></div>
        </div>
    `;

    item.getElementsByClassName('accordion-body')[0].appendChild(carousel(items, id));
    return item;
}

function getCarousel() {
    const carouselElm = document.createElement('div'); 
    
    carouselElm.id = `carouselExampleControls-${ id }`;
    carouselElm.className = 'carousel slide';
    carouselElm.setAttribute('data-bs-ride', 'carousel');

    carouselElm.innerHTML = `
        <div class='carousel-inner'></div>
        <button class='carousel-control-prev' type='button' data-bs-target='${ `#carouselExampleControls-${ id }` }' data-bs-slide='prev'>
            <span class='visually-hidden'>Previous</span>
        </button>
        <button class='carousel-control-next' type='button' data-bs-target='${ `#carouselExampleControls-${ id }` }' data-bs-slide='next'>
            <span class='visually-hidden'>Next</span>
        </button>
    `;

    const carouselInner = carouselElm.firstElementChild;

    for (let { title, pubDate, author, description, enclosure, link } of slides) {
        const carouselItem = document.createElement('div');
        carouselItem.className = `carousel-item`;

        carouselItem.innerHTML = `
            <a href='${ link } target='_blank'>
                <div class='card-image'>
                    <img src=${ enclosure.link }/>
                </div>
                <div class='card-body'>
                    <div class='card-heading'>${ title }</div>
                    <div><span>${ author }</span> <span>&#10054;</span> <span>${ getDate(pubDate) }</span></div>
                    <div class='card-description mt-3'>${ card-description }</div>
                </div>
            </a>
        `;

        carouselInner.appendChild(carouselItem);
    }

    carouselInner.firstElementChild.classList.add('active');
    return carouselElm;
}

function getDate(str) {
    cont[y, m, d] = str.slice(0, 9).split("-");
    return `${d}/${m}/${y}`;
}

export { getNews, getAccordian }; 