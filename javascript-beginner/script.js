function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    }


async function checkInput(value, id){
    if (value <= 0){
        document.getElementById(id).value = '';
        document.getElementById(id).style.backgroundColor = '#f7385988';
        await sleep(200);
        document.getElementById(id).style.backgroundColor = '#fff';
    }
}


async function popUp(id){
    document.getElementById(id).style.fontSize = '0';
    document.getElementById(id).style.transition = '0.05s';
    await sleep(50);
    document.getElementById(id).style.fontSize = '26px';
    document.getElementById(id).style.transition = '0.15s';
    await sleep(150);
    document.getElementById(id).style.fontSize = '20px';
}


function getContent(shape){
    var content = document.getElementById('content');
    switch (shape){
        case "circle":
            content.innerHTML =
            `
            <div class="input-label">Radius: </div>
            <input id="radius" type="number" min="0"></input>
            <input type="submit" value="Submit" onClick="getResult('circle')"></input>
            `;
        break;

        case "square":
            content.innerHTML =
            `
            <div class="input-label">Side length: </div>
            <input id="side" type="number" min="0"></input>
            <input type="submit" value="Submit" onClick="getResult('square')"></input>
            `;
        break;

        case "rectangle":
            content.innerHTML =
            `
            <div class="input-label">First side length: </div>
            <input id="firstSide" type="number" min="0"></input>
            <div class="input-label">Second side length: </div>
            <input id="secondSide" type="number" min="0"></input>
            <input type="submit" value="Submit" onClick="getResult('rectangle')"></input>
            `;
        break;

        case "parallelogram":
            content.innerHTML =
            `
            <div class="input-label">Base length: </div>
            <input id="base" type="number" min="0"></input>
            <div class="input-label">Height length: </div>
            <input id="pHeight" type="number" min="0"></input>
            <input type="submit" value="Submit" onClick="getResult('parallelogram')"></input>
            `;
        break;

        case "trapezium":
            content.innerHTML =
            `
            <div class="input-label">Upper base length: </div>
            <input id="upperBase" type="number" min="0"></input>
            <div class="input-label">Lower base length: </div>
            <input id="lowerBase" type="number" min="0"></input>
            <div class="input-label">Height length: </div>
            <input id="tHeight"type="number" min="0"></input>
            <input type="submit" value="Submit" onClick="getResult('trapezium')"></input>
            `;
        break;
        
        case "ellipse":
            content.innerHTML =
            `
            <div class="input-label">Major axis length: </div>
            <input id="majorAxis" type="number" min="0"></input>
            <div class="input-label">Minor axis length: </div>
            <input id="minorAxis" type="number" min="0"></input>
            <input type="submit" value="Submit" onClick="getResult('ellipse')"></input>
            `;
        break;
    }
}


function getResult(shape){
    var result = document.getElementById('result');
    var perimeter;
    var area;
    switch (shape){
        case "circle":
            var radius = document.getElementById('radius').value;
            checkInput(radius, 'radius');
            radius = clamp(radius);
            area = (Math.PI*Math.pow(radius,2)).toFixed(2);
            circumference = (2*Math.PI*radius).toFixed(2);
        break;
        
        case "square":
            var side = document.getElementById('side').value;
            checkInput(side, 'side');
            side = clamp(side);
            area = (Math.pow(side,2));
            circumference = 0;
        break;

        case "rectangle":
            var firstSide = document.getElementById('firstSide').value;
            var secondSide = document.getElementById('secondSide').value;
            checkInput(firstSide, 'firstSide');
            checkInput(secondSide, 'secondSide');
            firstSide = clamp(firstSide);
            secondSide = clamp(secondSide);
            area = (firstSide*secondSide);
            circumference = 0;
        break;

        case "parallelogram":
            var base = document.getElementById('base').value;
            var height = document.getElementById('pHeight').value;
            checkInput(base, 'base');
            checkInput(height, 'pHeight');
            base = clamp(base);
            height = clamp(height);
            area = (base*height);
            circumference = 0;
        break;

        case "trapezium":
            var lowerBase = document.getElementById('lowerBase').value;
            var upperBase = document.getElementById('upperBase').value;
            var height = document.getElementById('tHeight').value;
            checkInput(lowerBase, 'lowerBase');
            checkInput(upperBase, 'upperBase');
            checkInput(height, 'tHeight');
            lowerBase = clamp(lowerBase);
            upperBase = clamp(upperBase);
            height = clamp(height);
            var valid = (lowerBase > 0 && upperBase > 0 && height > 0) ? 1 : 0;
            area = (1/2*height*(lowerBase+upperBase))*valid;
            circumference = 0;
        break;

        case "ellipse":
            var majorAxis = document.getElementById('majorAxis').value;
            var minorAxis = document.getElementById('minorAxis').value;
            checkInput(majorAxis, 'majorAxis');
            checkInput(minorAxis, 'minorAxis');
            majorAxis = clamp(majorAxis);
            minorAxis = clamp(minorAxis);
            area = (Math.PI*majorAxis*minorAxis).toFixed(2)
            circumference = 0;
        break;
    }
    if (circumference > 0){
        result.innerHTML =
        `
        <div id="area">Area of ${shape} is equal to: <span class="number">${area}</span><div>
        <div id="circumference">Circumference of ${shape} is equal to: <span class="number">${circumference}</span><div>
        `;
        popUp("area");
        popUp("circumference");
    } else if (area > 0) {
    result.innerHTML =
    `
    <div id="area">Area of ${shape} is equal to: <span class="number">${area}</span><div>
    `;
    popUp("area");
    } else {
    result.innerHTML =
    `
    <div id="error">Please provide correct input!</span><div>
    `;
    popUp("error");
    }
    
}

function trackNav(){
    var hash = (window.location.hash).replace('#', '');
    if (hash.length == 0) {
        window.location.hash = "#circle";
        getContent('circle')
    }
    else {
        getContent(hash)
    }
}

function clamp(value){
    if (value < 0){
        value = 0;
    }
    return value
}