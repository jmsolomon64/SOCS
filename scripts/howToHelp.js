$(document).ready(() => {
    const dataDir = './Data/';
    const partials = './Partials/';
    
    renderHeader();
    renderFooter();
    renderUrgentlyNeeded();
    renderAlwaysNeeded();

    //----- functions to render sections of HTML
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
    function renderAlwaysNeeded() {
        const dataPath = `${dataDir}alwaysNeeded.json`;
        const div = '#alwaysNeeded';
        
        readData(dataPath, div, '');
    }
    function renderUrgentlyNeeded() {
        const itemType = 'list-group-item-danger';
        const dataPath = `${dataDir}urgentlyNeeded.json`;
        const div = '#urgentlyNeeded';

        readData(dataPath, div, itemType);
    }
    
    //--- Multipurpose Ajax requests
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
    function readData(dataPath, div, itemType) {
        $.ajax({
            url: dataPath, 
            type: 'GET', 
            success: (data) => {
                let html = createListItems(data, itemType);
                $(div).html(html);
            },
            error: (xhr, status, error) => {
                console.error('Error fetching JSON:', error);
                $(div).html(createErrorHtml('always needed'));
            }
        });
    }

    //--- Functions to create html
    function createListItems(data, itemType) {
        html = ''
        data.forEach(item => {
            html += `
                    <a class="list-group-item list-group-item-action flex-column ${itemType}">
                        <div>
                            <h5 class="mb-1">${item.title}</h5>
                        </div>
                        <p class="mb-1">${item.description}</p>
                        <small>${item.subDescription}</small>
                    </a>
                    `;
            html += '\n';
        })
        return html;
    }
    function createErrorHtml(location) {
        return `<span>Error loading data for ${location}</span>`;
    }
});