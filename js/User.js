var User = {
    saveSession: function(userObject) {
        window.localStorage.parseSession = JSON.stringify(userObject);
    },
    getSession: function() {
        return (window.localStorage.parseSession) ?  JSON.parse(window.localStorage.parseSession) : false;
    },
    clearSession: function() {
        window.localStorage.parseSession = null;
    }
};
