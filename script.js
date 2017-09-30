function getBallCount() {

    var url = window.location.href;
    var queryIndex = url.indexOf('reds=');
    var count = url.substr(queryIndex+5,queryIndex+6);

    document.querySelector("title").innerHTML = count+" Ball Game";

    return count;
}

var reds = getBallCount();
