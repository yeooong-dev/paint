const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const fillBtn = document.getElementById("jsFill");
const brushBtn = document.getElementById("jsBrush");
const eraserBtn = document.getElementById("jsEraser");
const saveBtn = document.getElementById("jsSave");
const cursor = document.getElementById("cursor");

canvas.width = 580;
canvas.height = 580;

ctx.strokeStyle = "#000000";
ctx.fillStyle = "#000000";
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    updateCursor(x, y);

    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onTouchMove(event) {
    const touch = event.touches[0];
    const x = touch.clientX - canvas.offsetLeft;
    const y = touch.clientY - canvas.offsetTop;

    updateCursor(x, y);

    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    event.preventDefault();
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    cursor.style.borderColor = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
    updateCursorSize(size);
}

function handleFillClick() {
    filling = true;
    cursor.style.display = "none";
}

function handleBrushClick() {
    filling = false;
    ctx.strokeStyle = ctx.fillStyle; // 원래 색상 복원
    cursor.style.display = "block";
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleEraserClick() {
    filling = false;
    ctx.strokeStyle = "#ffffff";
    cursor.style.borderColor = "#ffffff";
    cursor.style.display = "block";
}

function handleSaveClick() {
    const image = canvas.toDataURL("image/jpg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "paint.jpg";
    link.click();
}

function updateCursor(x, y) {
    cursor.style.left = `${x + canvas.offsetLeft}px`;
    cursor.style.top = `${y + canvas.offsetTop}px`;
}

function updateCursorSize(size) {
    cursor.style.width = `${size * 3}px`;
    cursor.style.height = `${size * 3}px`;
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting); /* 페인팅 시작 */
    canvas.addEventListener("mouseup", stopPainting); /* 페인팅 멈춤 */
    canvas.addEventListener("mouseleave", stopPainting); /* 페인팅 멈춤 */
    canvas.addEventListener("click", handleCanvasClick); /* 캔버스 클릭 시 색칠 */
    canvas.addEventListener("touchmove", onTouchMove);
    canvas.addEventListener("touchstart", startPainting);
    canvas.addEventListener("touchend", stopPainting);
    canvas.addEventListener("touchcancel", stopPainting);
}

Array.from(colors).forEach((color) => color.addEventListener("click", handleColorClick));

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (fillBtn) {
    fillBtn.addEventListener("click", handleFillClick);
}

if (brushBtn) {
    brushBtn.addEventListener("click", handleBrushClick);
}

if (eraserBtn) {
    eraserBtn.addEventListener("click", handleEraserClick);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}

updateCursorSize(ctx.lineWidth);
