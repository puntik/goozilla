$(function() {

    // set date in deadline
    var date = new Date().toISOString().substring(0, 10);
    $('#fld-deadline').attr('value', date);

    $('#btn-cancel').click(function() {
        // TODO: uklidit rozepsane veci do temporaty storage
        window.close();
    });

    $('#btn-submit').click(function() {

        var description = $('#fld-description').val();
        var summary = description.split('\n')[0];

        var bug = {
            "product": "TestProduct",
            "component": "TestComponent",
            "summary": "test summary",
            "description": description,
            "version": "unspecified"
        };


        if (saveBug(bug) == 0) {
            // alert('OK');
            // window.close();
        }

    });

    $('#btn-clear').click(function() {
        // chrome.browserAction.setBadgeBackgroundColor({color:[255, 0, 0, 230]});
        chrome.browserAction.setBadgeText({text: "3"});
    });
});

function saveBug(bug) {

    var _data = {
        "id": "http://bugzilla.rem.cz",
        "method": "Bug.create",
        "params": [bug]};

    return sendRequest(_data);
}

function getBug(id) {

    var _data = {
        "id": "http://bugzilla.rem.cz",
        "method": "Bug.get",
        "params": [{"ids": [id]}]};

    sendRequest(_data);
}


function getVersion() {
    var _data = {
        "id": "http://bugzilla.rem.cz",
        "method": "Bugzilla.version",
        "params": []};

    sendRequest(_data);
}

function sendRequest(_data) {

    var requestData = JSON.stringify(_data);

    $.ajax({
        "contentType": "application/json",
        "dataType": "json",
        "url": "http://bugzilla.rem.cz/jsonrpc.cgi",
        "type": "POST",
        "data": requestData,
        success: function(responseData, textStatus, jqXHR) {
            console.log(JSON.stringify(responseData));
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('KO');
        }
    });
    return 0;
}
