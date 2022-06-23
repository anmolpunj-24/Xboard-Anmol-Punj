//import magazines from "../data/magazines.js";

const RSS2JSON = "https://api.rss2json.com/v1/api.json?rss_url=";

async function fetchNews() {
    try {
        const responses = await Promise.all(
            magazines.map(url => fetch(RSS2JSON + url))
        );
        return await Promise.all(
            responses.map(response => response.json())
        ); 
    } catch (e) {
        return null;
    }
}

function accordionItem({ feed, items }, expanded, id) {
    
    const item = document.createElement('div');
    item.className = 'accordion-item';
    item.innerHTML = `
        <h2 class='accordion-header' id='${ feed.title }'>
            <button class='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='${ `#collapse-${ id }` }' aria-controls='${ `collapse-${ id }` }'>
                <span>${ feed.title }</span>
            </button> 
        </h2>
        <div id='${ `collapse-${ id }` }' class='accordion-collapse collapse ${ expanded ? 'show': '' }' data-bs-parent='#topics'>
            <div class='accordion-body'></div>
        </div>
    `;

    item.getElementsByClassName('accordion-body')[0].appendChild(carousel(items, id));
    return item;
}

function carousel(slides, id) {
    const carouselElm = document.createElement('div'); 
    
    carouselElm.id = `carousel-${ id }`;
    carouselElm.className = 'carousel slide';
    carouselElm.setAttribute('data-bs-ride', 'carousel');

    carouselElm.innerHTML = `
        <div class='carousel-inner'></div>
        <button class='carousel-control-prev' type='button' data-bs-target='${ `#carousel-${ id }` }' data-bs-slide='prev'>
            <span class='visually-hidden'>Previous</span>
        </button>
        <button class='carousel-control-next' type='button' data-bs-target='${ `#carousel-${ id }` }' data-bs-slide='next'>
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
                    <img src=${ enclosure.link } />
                </div>
                <div class='card-body px-5'>
                    <div class='card-heading my-3'>${ title }</div>
                    <div><span>${ author }</span> <span>❆</span> <span>${ formatDate(pubDate) }</span></div>
                    <div class='description mt-3'>${ description }</div>
                </div>
            </a>
        `;

        carouselInner.appendChild(carouselItem);
    }

    carouselInner.firstElementChild.classList.add('active');
    return carouselElm;
}

function formatDate(dateStr) {
    const [y, m, d] = dateStr.slice(0, 10).split('-');
    return `${ d }/${ m }/${ y }`;
}

export { accordionItem, fetchNews };