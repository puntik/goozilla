function save_options() {

    console.log('saving options');

    var url = $('#bg-url').val();
    var login = $('#bg-loginname').val();
    var password = $('#bg-password').val();

    chrome.storage.sync.set(
            {
                'url': url,
                'login': login,
                'password': password
            },
    function() {
        console.log('Data saved with password = ' + password);
    }
    );

}

function restore_options() {
    console.log('restore options');

    chrome.storage.sync.get(
            {
                'url': 'http://bugzilla.rem.cz/jsonrpc.cgi',
                'login': 'vlastimil.klik@rem.cz',
                'password': ''

            }, function(items) {
        $('#bg-url').val(items.url);
        $('#bg-loginname').val(items.login);
        $('#bg-password').val(items.password);
    }
    );
}

$().ready(function() {

    restore_options();

    $('#option-btn-save').click(function() {
        save_options();
    });
});

