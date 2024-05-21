// Variables para las imágenes del sistema solar
let sun = new Image();
let moon = new Image();
let earth = new Image();

function initSolarSystem() {
    sun.src = "canvas_sun.png";
    moon.src = "canvas_moon.png";
    earth.src = "canvas_earth.png";
    window.requestAnimationFrame(drawSolarSystem);
}

function drawSolarSystem() {
    const ctx = document.getElementById("canvasSolarSystem").getContext("2d");
    ctx.globalCompositeOperation = "destination-over";
    ctx.clearRect(0, 0, 300, 300); // limpiar canvas
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.strokeStyle = "rgba(0,153,255,0.4)";
    ctx.save();
    ctx.translate(150, 150);

    // La tierra
    let time = new Date();
    ctx.rotate(
        ((2 * Math.PI) / 60) * time.getSeconds() +
        ((2 * Math.PI) / 60000) * time.getMilliseconds(),
    );
    ctx.translate(105, 0);
    ctx.fillRect(0, -12, 50, 24); // Sombra
    ctx.drawImage(earth, -12, -12);

    // La luna
    ctx.save();
    ctx.rotate(
        ((2 * Math.PI) / 6) * time.getSeconds() +
        ((2 * Math.PI) / 6000) * time.getMilliseconds(),
    );
    ctx.translate(0, 28.5);
    ctx.drawImage(moon, -3.5, -3.5);
    ctx.restore();

    ctx.restore();

    ctx.beginPath();
    ctx.arc(150, 150, 105, 0, Math.PI * 2, false); // Órbita terrestre
    ctx.stroke();

    ctx.drawImage(sun, 0, 0, 300, 300);

    window.requestAnimationFrame(drawSolarSystem);
}

function clock() {
    let now = new Date();
    let canvas = document.getElementById("canvasreloj");
    let ctx = canvas.getContext("2d");
    let radius = canvas.width / 2;
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(radius, radius);
    ctx.scale(canvas.width / 300, canvas.height / 300);
    ctx.rotate(-Math.PI / 2);
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    
    // Agujas de la hora
    ctx.save();
    for (let i = 0; i < 12; i++) {
        ctx.beginPath();
        ctx.rotate(Math.PI / 6);
        ctx.moveTo(100, 0);
        ctx.lineTo(120, 0);
        ctx.stroke();
    }
    ctx.restore();
    
    // Agujas del minuto
    ctx.save();
    ctx.lineWidth = 5;
    for (let i = 0; i < 60; i++) {
        if (i % 5 != 0) {
            ctx.beginPath();
            ctx.moveTo(117, 0);
            ctx.lineTo(120, 0);
            ctx.stroke();
        }
        ctx.rotate(Math.PI / 30);
    }
    ctx.restore();
    
    let sec = now.getSeconds();
    let min = now.getMinutes();
    let hr = now.getHours();
    hr = hr >= 12 ? hr - 12 : hr;
    
    ctx.fillStyle = "black";
    
    // Escribimos la hora
    ctx.save();
    ctx.rotate(hr * (Math.PI / 6) + (Math.PI / 360) * min + (Math.PI / 21600) * sec);
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(-20, 0);
    ctx.lineTo(80, 0);
    ctx.stroke();
    ctx.restore();
    
    // Escribimos los minutos
    ctx.save();
    ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(-28, 0);
    ctx.lineTo(112, 0);
    ctx.stroke();
    ctx.restore();
    
    // Escribimos los segundos
    ctx.save();
    ctx.rotate((sec * Math.PI) / 30);
    ctx.strokeStyle = "#D40000";
    ctx.fillStyle = "#D40000";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-30, 0);
    ctx.lineTo(83, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(95, 0, 10, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.arc(0, 0, 3, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.restore();
    
    ctx.beginPath();
    ctx.lineWidth = 14;
    ctx.strokeStyle = "#325FA2";
    ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
    ctx.stroke();
    
    ctx.restore();
    
    window.requestAnimationFrame(clock);
}

// Variables para la imagen panorámica
let  img = new Image();
img.src = "capitan_meadows_yosemite_national_park.jpg";

let  CanvasXSize = 800;
let  CanvasYSize = 200;
let  speed = 30; // más bajo es más rápido
let  scale = 1.05;
let  y = -4.5; // desplazamiento vertical

let  dx = 0.75;
let  imgW;
let  imgH;
let  x = 0;
let  clearX;
let  clearY;
let  ctx;

img.onload = function () {
    imgW = img.width * scale;
    imgH = img.height * scale;

    if (imgW > CanvasXSize) {
        x = CanvasXSize - imgW;
    }
    if (imgW > CanvasXSize) {
        clearX = imgW;
    } else {
        clearX = CanvasXSize;
    }
    if (imgH > CanvasYSize) {
        clearY = imgH;
    } else {
        clearY = CanvasYSize;
    }

    ctx = document.getElementById("canvaspanoramica").getContext("2d");

    // establecer frecuencia de actualización
    setInterval(drawPanorama, speed);
};

function drawPanorama() {
    ctx.clearRect(0, 0, clearX, clearY); // limpiar canvas

    if (imgW <= CanvasXSize) {
        if (x > CanvasXSize) {
            x = -imgW + x;
        }
        if (x > 0) {
            ctx.drawImage(img, -imgW + x, y, imgW, imgH);
        }
        if (x - imgW > 0) {
            ctx.drawImage(img, -imgW * 2 + x, y, imgW, imgH);
        }
    } else {
        if (x > CanvasXSize) {
            x = CanvasXSize - imgW;
        }
        if (x > CanvasXSize - imgW) {
            ctx.drawImage(img, x - imgW + 1, y, imgW, imgH);
        }
    }
    ctx.drawImage(img, x, y, imgW, imgH);
    x += dx;
}

window.onload = function () {
    initSolarSystem();
    clock();
};