/* 창이 앞으로 나올 순서 관리 */

let highestZ = 1;


/* 새 창이 계단식으로 생성되도록 카운트 */

let windowCount = 0;


/* -------------------- */
/* 메일 열기 */
/* -------------------- */

function openContent(folder, fileName, title, element) {

    /* 이미 본 메뉴는 흐리게 표시 */
    element.classList.add("active");

    fetch(`${folder}/${fileName}.html`)

        .then(response => {
            if (!response.ok) {
                throw new Error('파일을 찾을 수 없습니다.');
            }
            return response.text();
        })

        .then(fileContent => {
            createWindow(title, fileContent);
        })

        .catch(error => console.error(error));
}


/* -------------------- */
/* 노트 열기 */
/* -------------------- */

function openNote(folder, fileName, element) {

    /* 이미 본 메뉴는 흐리게 표시 */
    element.classList.add("active");

    fetch(`${folder}/${fileName}.html`)

        .then(response => {
            if (!response.ok) {
                throw new Error('파일을 찾을 수 없습니다.');
            }
            return response.text();
        })

        .then(fileContent => {
            createNoteWindow(fileContent);
        })

        .catch(error => console.error(error));
}


/* -------------------- */
/* 메일 창 생성 */
/* -------------------- */

function createWindow(title, content) {

    const win = document.createElement("div");

    win.className = "window";


    /* 내용 길이에 따라 방 크기 결정 */

    const textLength = content.length;

    if (textLength < 300) {

        /* 작은 기록 */
        win.style.width = "400px";

    }

    else if (textLength < 1000) {

        /* 중간 기록 */
        win.style.width = "600px";

    }

    else {

        /* 긴 기록 = 넓은 방 */
        win.style.width = "1000px";

    }


    /* 계단식 생성 */

    win.style.left = (250 + windowCount * 30) + "px";
    win.style.top = (120 + windowCount * 30) + "px";

    win.style.zIndex = highestZ++;


    /* 창 내부 구조 */

    win.innerHTML = `
        <h3>${title}</h3>
        <div class="window-body">
            ${content}
        </div>
    `;


    document
        .getElementById("space")
        .appendChild(win);


    makeDraggable(win);

    windowCount++;
}


/* -------------------- */
/* 노트 창 생성 */
/* -------------------- */

function createNoteWindow(content) {

    const win = document.createElement("div");

    win.className = "note-window";


    /* 계단식 생성 */

    win.style.left = (250 + windowCount * 30) + "px";
    win.style.top = (120 + windowCount * 30) + "px";

    win.style.zIndex = highestZ++;


    /* 노트는 제목 없이 내용만 */

    win.innerHTML = `
        <div class="window-body">
            ${content}
        </div>
    `;


    document
        .getElementById("space")
        .appendChild(win);


    makeDraggable(win);

    windowCount++;
}


/* -------------------- */
/* 드래그 기능 */
/* -------------------- */

function makeDraggable(element) {

    let isDragging = false;

    let offsetX = 0;

    let offsetY = 0;


    /* 마우스를 누르면 */

    element.addEventListener("mousedown", function(e){

        isDragging = true;

        element.style.zIndex = highestZ++;

        offsetX = e.clientX - element.offsetLeft;
        offsetY = e.clientY - element.offsetTop;

    });


    /* 마우스를 움직이면 */

    document.addEventListener("mousemove", function(e){

        if(!isDragging) return;

        element.style.left =
            (e.pageX - offsetX) + "px";

        element.style.top =
            (e.pageY - offsetY) + "px";

    });


    /* 마우스를 놓으면 */

    document.addEventListener("mouseup", function(){

        isDragging = false;

    });
}