let req = new XMLHttpRequest();
req.open("GET", 
    'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json)',
    true);
req.send();
req.onload=function() {
    json=JSON.parse(req.responseText)
}

console.log('hello')