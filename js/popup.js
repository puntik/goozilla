$(function() {

    // set date in deadline
    var date = new Date().toISOString().substring(0, 10);
    $('#fld-deadline').attr('value', date);

    $('#btn-cancel').click(function() {
	// TODO: uklidit rozepsane veci do temporaty storage
	window.close();
    });

    $('#btn-submit').click(function() {

	console.log('clicked .. ');

	var description = $('#fld-description').val();
	var summary = description.split('\n')[0];

	var bug = {
	    "product": "TestProduct",
	    "component": "TestComponent",
	    "summary": summary,
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

        var params = {
            "title": "hello world",
            "message": "Hello world long"
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
    }, 3000);

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
    }, 8000);
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
