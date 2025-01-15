const getUrl = ""

fetch(getUrl, {

}).then(response => response.json()).then((data) => {
    alert(data);
});