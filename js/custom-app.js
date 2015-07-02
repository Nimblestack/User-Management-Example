// init
$("#loader").modal('show');
var app = new app();
/*
 * Data Handling Functions
 */
app.onGetData = function (data) {
    data = app.dataCheck(data);
};
app.onGetPasswordResetData = function (data) {
    console.log(data);
    app.showVerifyPasswordResetMessage('show');
};
app.onGetLoginData = function (data) {
    data = JSON.parse(app.dataCheck(data));
    if(data.BasicPage.pos === 0
       || data.BasicPage.pos === false
       || data.BasicPage.pos === "false" ){
        // Show verify email message
        $("#loginRegister").modal('hide');
        app.showVerifyEmailMessage('show');
    }else{
        console.log(data);
        User.saveSession(data.BasicPage);
        $("#lr_load").hide();
        $("#loginEmail").val('');
        $("#loginPassword").val('');
        $("#loginRegister").modal('hide');
        app.showUserProfile();
    }

};
app.onGetRegisterData = function (data) {
    data = app.dataCheck(data);
    $("#loginRegister").modal('hide');
    $("#lr_load").show();
    $("#registerEmail").val('');
    $("#registerName").val('');
    $("#registerPassword").val('');
    $("#registerPassword2").val('');
    app.showVerifyEmailMessage('show');
};
app.dataCheck = function(data){
    if (data === null || data === "" || data === " ") {
        console.log("Handling null data");
        $("#loginRegister").modal('hide');
        app.showVerifyEmailMessage('hide');
        $("#loader").modal('show');
        app.runLogin();
    }else{
        return data;
    }
};

/*
 * UI Handling Functions
 */
app.showUserProfile = function() {
    var data = User.getSession();
    $('.nav .logged-in').show();
    $('.nav .logged-out').hide();
    $("#user-id").html(data.uniqueApiId);
    $("#user-name").html(data.url);
    $("#user-email").html(data.title);
    $("#profilePage").show();
};
app.showVerifyEmailMessage = function(val) {
    $("#verifyEmail").modal(val);
};
app.showVerifyPasswordResetMessage = function(val) {
    $("#verifyPasswordReset").modal(val);
};
// initGui
app.initGui = function () {
    console.log("Online? "+navigator.onLine);
    $('#loginForm').bind('submit', app.handleLogin);
    $('#registerForm').bind('submit', app.handleRegister);
    $("#user-password-reset").bind('click', app.resetUserPassword);
    $("#login-user").on('click', function(evt){
        $('#loginRegister a[href="#loginFormTab"]').tab('show');
        $("#loginRegister").modal('show');
    });
    $("#logout-user").on('click', app.logoutUser);
    $("#register-user").on('click', function(evt){
        $("#loginRegister").modal('show');
        $('#loginRegister a[href="#registerFormTab"]').tab('show');
    });
    if(!User.getSession()){
        $('.nav .logged-out').show();
        $("#loader").modal('hide');
    }else{
        $("#loader").modal('hide');
        app.showUserProfile();
    }
};

/*
 * UI Event Handlers
 */
app.resetUserPassword = function(evt) {
    var data = User.getSession();
    if(data){
        var email = data.title;
        app.nimble.get(
            2,
            app.onGetPasswordResetData,
            true,
            [{name:"email", value:email}]
        );
    }
};
app.logoutUser = function() {
    $("#profilePage").hide();
    $('.nav .logged-in').hide();
    $('.nav .logged-out').show();
    app.clearAllUserData();
};
app.clearAllUserData = function () {
    User.clearSession();
    $("#user-id").html("");
    $("#user-name").html("");
    $("#user-email").html("");
};

app.handleLogin = function (evt) {
    evt.preventDefault();
    $("#lr_load").show();
    var email = $("#loginEmail").val();
    var password = $("#loginPassword").val();
    console.log("Running custom login");
    app.nimble.get(
        0,
        app.onGetLoginData,
        true,
        [{name:"email", value:email},{name:"password", value:password}]
    );
};

app.handleRegister = function (evt) {
    evt.preventDefault();
    $("#lr_load").show();
    var email = $("#registerEmail").val();
    var name = $("#registerName").val();
    var password = $("#registerPassword").val();
    var password2 = $("#registerPassword2").val();
    app.nimble.get(
        1,
        app.onGetRegisterData,
        true,
        [{name:"email", value:email},{name:"password", value:password},{name:"name", value:name},{name:"username", value:email}]
    );
};

// start the application
app.initialize();
