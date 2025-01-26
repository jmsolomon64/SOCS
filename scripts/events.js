$(document).ready(() => {
    const dataDir = './Data/';
    const partials = './Partials/';
    const anualRideDir = dataDir + "AnualRide/";

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
    function renderEvents() {
        const dataPath = `${anualRideDir}events.json`;
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
            <div style="width: fit-content; margin: auto;" id="contactCard" class="card shadow p-3 mb-5 rounded">
            <div class="card-body">
                <h5 class="card-title"><strong>${item.title}</strong></h5>
                <hr/>
                <div id="${item.contentId}">
                    <img src="${item.flyer}" style="width: 100%;height: auto;"/>
                    <br/>
                    <a href="${item.locationLink}" target="_blank">
                        <strong>Location:</strong> ${item.location}
                    </a>
                    <br/>
                    <a download href="${item.flyerFile}">Download Flyer as PDF</a>
                </div>
            </div>
            </div>`;
            html += '\n';
        });
        return html;
    }
    
    function createErrorHtml(location) {
        return `<span>Error loading data for ${location}</span>`;
    }
});