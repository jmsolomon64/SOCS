$(document).ready(() => {
    const dataDir = './Data/';
    const partials = './Partials/';
    
    renderHeader();
    renderFooter();
    renderEvents();

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
    function renderEvents(){
        const dataPath = `${dataDir}events.json`;
        const div = '#cards';

        readData(dataPath, div);
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
    function readData(dataPath, div) {
        $.ajax({
            url: dataPath, 
            type: 'GET', 
            success: (data) => {
                let html = createEventsList(data);
                $(div).html(html);
            },
            error: (xhr, status, error) => {
                console.error('Error fetching JSON:', error);
                $(div).html(createErrorHtml('events'));
            }
        });
    }

    function createEventsList(data) {
        html = '';
        data.forEach(item => {
            html += `

            <div style="width: fit-content; margin: 15px;"  class="card shadow p-3 mb-5 rounded eventCard">
            <div class="card-body">
                <h5 class="card-title"><strong>${item.title}</strong></h5>
                <hr/>
                <p class="card-text">${item.description}</p>
                <p>
                    <strong>When:</strong> ${item.date} @ ${item.time}
                </p>
                <p>
                    <strong>Where: </strong>
                    <a href="${item.locationLink}">${item.location}</a>
                </p>
            </div>
            </div>
            `;
            html += '\n';
        });
        return html;
    }

    function createErrorHtml(location) {
        return `<span>Error loading data for ${location}</span>`;
    }
});