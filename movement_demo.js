const config = {
    appInfo:{
        version: "0.1",
        name: "Ships",
        lsKey: "ships"
    },
    gameData:{
        containerId: "container",
        frameRate: 30,
        units:{
            player:{
                model:{
                    id: "player",
                    width: "40px",
                    height: "80px",
                    bgColor: "red",
                },
                movement:{
                    x: 900,
                    y: 300,
                    rotation: 0,
                    speed: 0,
                    minSpeed: 4,
                    maxSpeed: 8,
                    speedSum: 0.5,
                    moving: false,
                }
            },
            unitsArr: [],
        }
    }
}

const gameStart = (gameData) =>{
    gameSetup(gameData);
    gameLoop(gameData);
}

const gameSetup = (gameData) => {
    gameData.units.unitsArr = [createUnit(gameData.units.player)];
}

const gameLoop = (gameData) => {
    setInterval(()=>{
        clearContainer(gameData.containerId);
        drawUnits(gameData.containerId, gameData.units.unitsArr);
        handleInputs(gameData.units.player);
    }, 1000/gameData.frameRate);
}

const drawUnits = (containerId, unitsArr) => {
    unitsArr.map((unit) => {
        document.querySelector(`#${containerId}`).appendChild(unit);
    })
}

const handleInputs = (playerObj) => {
    let pressedKeys = {
        "w":{pressed: false, func: () => {
            console.log("w");
        }},
        "a":{pressed: false, func: () => {
            console.log("a");
        }},
        "s":{pressed: false, func: () => {
            console.log("s");
        }},
        "d":{pressed: false, func: () => {
            console.log("d");
        }},
    };

    document.onkeydown = (keyObj) => {
        if(pressedKeys[keyObj.key]){
            pressedKeys[keyObj.key].pressed = true;
            pressedKeys[keyObj.key].func();
        } 
    }

    document.onkeyup = (keyObj) => {
        if(pressedKeys[keyObj.key])
        {
            pressedKeys[keyObj.key].pressed = false;
        }
    }
}

const clearContainer = (containerId) => {
    const container = document.querySelector(`#${containerId}`);

    while(container.firstChild){
        container.removeChild(container.lastChild);
    }
}

const createUnit = (unitObj) => {
    let unit = document.createElement("div");
    const {model, movement} = unitObj;

    unit.id = model.id;

    unit.style.width = model.width;
    unit.style.height = model.height;
    unit.style.backgroundColor = model.bgColor;

    unit.style.left = `${movement.x}px`;
    unit.style.top = `${movement.y}px`;
    unit.style.transform = `rotate(${movement.rotation}deg)`;

    return unit;
}

gameStart(config.gameData);