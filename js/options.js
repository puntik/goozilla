function save_options() {

    console.log('saving options');

    var url = $('#bg-url').val();
    var login = $('#bg-loginname').val();
    var password = $('#bg-password').val();

    // TODO: should be checked to number
    var bg_days_to_add = $('#bg_days_to_add').val();

    chrome.storage.sync.set(
            {
                'url': url,
                'login': login,
                'password': password,
                'bg_days_to_add': bg_days_to_add
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
                'password': '',
                'bg_days_to_add': 7

            }, function(items) {

        $('#bg-url').val(items.url);
        $('#bg-loginname').val(items.login);
        $('#bg-password').val(items.password);
        $('#bg_days_to_add').val(items.bg_days_to_add);
    }
    );
}

$().ready(function() {

    restore_options();

    $('#option-btn-save').click(function() {
        save_options();
    });
});

