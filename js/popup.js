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
        $('#fld-description').val("");
        $('#alert_placeholder').remove();
    });
});

function saveBug(bug) {

    var _data = {
        "id": "http://bugzilla.rem.cz",
        "method": "Bug.create",
        "params": [bug]};

    sendRequest(_data);

    var alertType = 'success';
    var message = 'Inserted';

    showAlert(alertType, message);

    return 0;

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

/**
 * 
 * @param {type} alertType
 * @param {type} message
 * @returns {undefined}
 */
function showAlert(alertType, message) {

    $('#alert_placeholder').append('<div id="alertdiv" class="alert alert-' + alertType + '"><span>' + message + '</span></div>');
    setTimeout(function() {
        $('#alert_placeholder').remove();
    }, 3000);
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
