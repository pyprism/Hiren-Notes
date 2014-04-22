var Browser = require("zombie");
var browser = new Browser({ debug: false });
browser.visit('http://www.facebook.com', function(){
    browser.
        fill("#email", "").
        fill("#pass", "").
        pressButton("#u_0_n", function() {

            // Form submitted, new page loaded.
            console.log(browser.location.href);
            //browser.dump()
            browser.window.close();

        })
})


