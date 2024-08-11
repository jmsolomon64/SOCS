$(document).ready(() => {
    const partials = '../Partials/';
    const indexPartials = `${partials}Index/`;
    renderHeader();
    renderFooter();
    renderCards();


    function renderHeader() {
        const headDiv = '#header';
        const headPartial = `${partials}header.html`;
        $(headDiv).load(headPartial);
    }
    function renderFooter() {
        const footDiv = '#footer';
        const footPartial = `${partials}footer.html`;
        $(footDiv).load(footPartial);
    }
    function renderCards() {
        const cardDiv = '#cards';
        const cardPartial = `${indexPartials}indexCards.html`;
        $(cardDiv).load(cardPartial);
    }
});