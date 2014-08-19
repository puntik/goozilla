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

        var data = {
            'deadline': $('#fld-deadline').val(),
            'title': 'Message from chrome',
            'description': $('#fld-description').val()}

        sendData(JSON.stringify(data));

        // window.close();
    });
});

function sendData(message) {

    var _data = {
        "id": "http://bugzilla.rem.cz",
        "method": "Bug.create",
        "params": [
            {
                "Bugzilla_login": "vlastimil.klik@rem.cz",
                "Bugzilla_password": "pqowie92qaz",
                "summary": "Test ze SoapLite",
                "product": "TestProduct",
                "component": "TestComponent",
                "version": "unspecified"
            }]};

    var data = JSON.stringify(_data);
    
    $.ajax({
        "contentType": "application/json",
        "crossDomain": "true",
        "dataType": "json",
        "url": "http://bugzilla.rem.cz/jsonrpc.cgi",
        "type": "POST",
        success: function(data, textStatus, jqXHR) {
            alert('OK');
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('KO');
        }
    });

    // localStorage.setItem("myLog", message);
}
