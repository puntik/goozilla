var NOTIFICATION_TIMEOUT = 5000;

$(function() {

    // set date in deadline
    getConfigValue('bg_days_to_add');

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
            "summary": summary,
            "description": description,
            "version": "unspecified"
        };

        var estimate = $('#fld-estimated_time').val();
        bug["estimated_time"] = estimate;

        var deadline = $('#fld-deadline').val();
        bug["deadline"] = deadline;

        if (saveBug(bug) == 0) {
            // alert('OK');
            // window.close();
        }
    });

    $('#btn-clear').click(function() {
        $('#fld-description').val("");
        $('#alert_placeholder').remove();

        var params = {
            "title": "Goozilla - bugzilla connector",
            "message": "Your issue was successfuly filed with id 12345. You can solve it on your bugzilla account.",
            "type": "basic",
            "iconUrl": "../images/icon48.png"
        };

        var notId = '123';
        chrome.notifications.create(notId, params, callback);
    });
});

function callback(notId) {
    console.log('Notification ' + notId + ' started');
    setTimeout(function() {
        console.log('Notification ' + notId + ' clear');
        chrome.notifications.clear(notId, function(wasCleared) {
            console.log('Notification ' + notId + ' cleared: ' + wasCleared);
        });
    }, NOTIFICATION_TIMEOUT);

}

function saveBug(bug) {

    var _data = {
        "id": "http://bugzilla.rem.cz",
        "method": "Bug.create",
        "params": [bug]};

    var resp = sendRequest(_data);

    return 0;

}

function getBug(id) {

    var _data = {
        "id": "http://bugzilla.rem.cz",
        "method": "Bug.get",
        "params": [{"ids": [id]}]};

    sendRequest(_data);
    return;

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
        $('#alertdiv').remove();
    }, NOTIFICATION_TIMEOUT);
}

function sendRequest(_data) {

    showAlert('info', 'Sending data');

    var ret = 0;
    var requestData = JSON.stringify(_data);
    var _responseData;

    $.ajax({
        "contentType": "application/json",
        "dataType": "json",
        "url": "http://bugzilla.rem.cz/jsonrpc.cgi",
        "type": "POST",
        "data": requestData,
        success: function(responseData, textStatus, jqXHR) {

            $('#alertdiv').remove();
            console.log(JSON.stringify(responseData));

            if (responseData['error'] != null) {
                var errorCode = responseData['error']['code'];
                if (errorCode > 0) {
                    showAlert('danger', "Bug was not filed with error code " + errorCode + ".");
                }
            } else {
                var id = responseData['result']['id'];
                showAlert('success', "Bug was filed with id " + id + ".");
                // $('#fld-description').val("");
            }


        },
        error: function(jqXHR, textStatus, errorThrown) {
        }
    });
}

function formatDate(date) {

    var day = date.getDate().toString();
    var month = (date.getMonth() + 1).toString();
    var year = (date.getYear() + 1900).toString();

    var ret = year + "-" + ((month.length > 1) ? month : "0" + month) + "-" + ((day.length > 1) ? day : "0" + day);
    return ret;

}

function getConfigValue(name) {

    // simply load config
    chrome.storage.sync.get({
        'bg_days_to_add': 7},
    function(items) {
        var deadline = new Date();
        deadline.setDate(deadline.getDate() + parseInt(items.bg_days_to_add));
        $('#fld-deadline').attr('value', deadline.toISOString().substring(0, 10));
    });

}