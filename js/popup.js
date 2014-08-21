$(function() {

    // set date in deadline
    var date = new Date().toISOString().substring(0, 10);
    $('#fld-deadline').attr('value', date);

    // set the last description
    var myLog = localStorage.getItem("myLog");
    var data = JSON.parse(myLog);
    if (data != null) {
        $('#fld-description').val(data['description']);
    }

    $('#btn-cancel').click(function() {
        // TODO: uklidit rozepsane veci do temporaty storage
        window.close();
    });

    $('#btn-submit').click(function() {
        // getBug(18);

        var bug = {
            "product": "TestProduct",
            "component": "TestComponent",
            "summary": "Test request from jsonrpc",
            "description": "$('#fld-description')",
            "version": "unspecified"
        };

        saveBug(bug);
        // window.close();
    });
});

function saveBug(bug) {

    var _data = {
        "id": "http://bugzilla.rem.cz",
        "method": "Bug.create",
        "params": [bug]};

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
}

function getBug(id) {

    var _data = {"id": "http://bugzilla.rem.cz", "method": "Bug.get", "params": [{"ids": [id]}]};
    var requestData = JSON.stringify(_data);

    $.ajax({
        "contentType": "application/json",
        "dataType": "json",
        "url": "http://bugzilla.rem.cz/jsonrpc.cgi",
        "type": "POST",
        "data": requestData,
        success: function(responseData, textStatus, jqXHR) {
            console.log(JSON.stringify(responseData));
            // JSON.parse(responseData);
            var bugs = responseData['result']['bugs'];
            var bug = bugs[0];

            $('#fld-description').val(bug['summary']);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('KO');
        }
    });

}


function getVersion() {
    var _data = {"id": "http://bugzilla.rem.cz", "method": "Bugzilla.version", "params": []};
    var a = JSON.stringify(_data);

    $.ajax({
        "contentType": "application/json",
        "dataType": "json",
        "url": "http://bugzilla.rem.cz/jsonrpc.cgi",
        "type": "POST",
        "data": a,
        success: function(data, textStatus, jqXHR) {
            console.log(JSON.stringify(data));
            $('#fld-description').val(data['description']);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('KO');
        }
    });


}

function sendRequest() {



}