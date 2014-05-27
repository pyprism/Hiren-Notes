/**
 * Created by prism on 5/27/14.
 */

var phridge = require('phridge');

var page;

// creates a new PhantomJS process
phridge.spawn()
    .then(function (phantom) {
        return phantom.openPage("https://facebook.com");
    })
    .then(function (p) {
        page = p;
        return page.run(function (resolve) {
            // this function runs inside PhantomJS
            var page = this;

            page.evaluate(function () {
                document.getElementById("email").value = "@gmail.com";
                document.getElementById("pass").value = "password";
                document.getElementById("login_form").submit();
            });
            setTimeout(function () {
                page.render("page2121212121.png");
                resolve();
            }, 6000);
        });
    })
    .then(function () {
        // page2.png rendered
    });