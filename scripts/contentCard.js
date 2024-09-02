$(document).ready(() => {
    const partials = './Partials/';
    const contactPartials = `${partials}contactUs/`;
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
        const cardDiv = '#contactInfo';
        const cardPartial = `${contactPartials}contactCard.html`;
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