if ( /(^|\.)twitch\.tv$/.test(document.location.hostname) === false ) { return; }
var realFetch = window.fetch;
window.fetch = function(input, init) {
    if ( arguments.length >= 2 && typeof input === 'string' && input.includes('/access_token') ) {
        var url = new URL(arguments[0]);
        url.searchParams.set("player_type", "frontpage");
        arguments[0] = url.href;
    }
    return realFetch.apply(this, arguments);
};
