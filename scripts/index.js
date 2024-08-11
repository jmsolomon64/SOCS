$(document).ready(() => {
    const partials = '../Partials/';
    const indexPartials = `${partials}Index/`;
    renderHeader();
    renderFooter();
    renderCards();

    function renderHeader() {
        const headDiv = '#header';
        const headPartial = `${partials}header.html`;
        getPartial(headPartial, headDiv);
    }
    function renderFooter() {
        const footDiv = '#footer';
        const footPartial = `${partials}footer.html`;
        getPartial(footPartial, footDiv);
    }
    function renderCards() {
        const cardDiv = '#cards';
        const cardPartial = `${indexPartials}indexCards.html`;
        getPartial(cardPartial, cardDiv);
    }
    function getPartial(path, div) {
        $.ajax({
            url: path, 
            type: 'GET', 
            success: (data) => {
                $(div).html(data); 
            },
            error: (xhr, status, error) => {
                console.error('Error fetching HTML:', error);
            }
        });
    }
});