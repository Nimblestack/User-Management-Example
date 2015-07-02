var Session = {
    save: function(userObject) {
        window.localStorage.parseSession = JSON.stringify(userObject);
    },
    get: function() {
        return (window.localStorage.parseSession) ?  JSON.parse(window.localStorage.parseSession) : false;
    },
    clear: function() {
        window.localStorage.parseSession = null;
    }
};
