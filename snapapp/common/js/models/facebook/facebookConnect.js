/**
 * Created with JetBrains WebStorm.
 * User: Pierrick
 * Date: 27/05/12
 * Time: 00:26
 * To change this template use File | Settings | File Templates.
 */
/*
$(document).ready(function() {

    window.fbAsyncInit = function() {
        FB.init({
            appId      : '454890441191384',
            status     : true,
            cookie     : true,
            xfbml      : true,
            oauth      : true,
        });

        document.getElementById('connexion').addEventListener('click', function(){
                FB.api('/me', function(response) {
                    if (response.name) {
                        $('#userName').append('Hello ' + response.name + ' ! Welcome on SNAP !');
                        $('#userName').show();
                    }
                    console.log('Good to see you, ' + response.name + '.');
                    console.log('Your email address, ' + response.email + '.');
                });
        });

        document.getElementById('byebye').addEventListener('click', function(){
            FB.logout(function(response) {
                $('#userName').remove()
                console.log('ByeBye !');
            });
        });


    }

});

function getListOfMessages() {
    var listOfMessageFb = [];
    FB.api('/me/posts', function(response) {
        for (var i=0; i<response.data.length; i++) {
            if(response.data[i].message) {
                listOfMessageFb.push(response.data[i].message);
            }
        };
    });
    return listOfMessageFb;
};
*/