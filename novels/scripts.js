const chapterOptions = document.querySelector('select');
const chapterContent = document.querySelector('.chapter-content pre');

const htmlTitle = document.querySelector('title');
const chapterTitle = document.querySelector('.chapter-title');

const readMode = document.querySelector('.read-mode');
const scrollIcon = document.querySelector('i');

const nextBtn = document.querySelector('.next-button');
const prevBtn = document.querySelector('.previous-button');

let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let chapterURL = urlParams.get('chapter');

if(chapterURL !== null){
    chooseChapter(chapterURL);
} else {
    window.location.search = '?chapter=C1';
    chooseChapter('C1');
}


scrollIcon.onclick = function(){
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}


// function to automaticly create chapters options
function updateChapterOptions(){
    for(let i = 1; i <= 10; i++){
        let chapter = document.createElement('option');
        chapter.value = `C${i}`;
        chapter.textContent = `C${i}`;
        chapterOptions.appendChild(chapter);
    }
}
updateChapterOptions();

// fetch chapters data
let currentChapter = chapterOptions.options[chapterOptions.selectedIndex].value;

chapterOptions.onchange = function(){
    let chapter = chapterOptions.value;
    currentChapter = chapterOptions.value;
    
    chooseChapter(chapter);
    NextButton();
    window.location.search = `?chapter=${chapter}`;
}

// FUCNTION TO AUTOMATICLY CHECK SET THE NEW NOVEL CHAPTER.

function chooseChapter(chapter){
    const url = './chapters/' + chapter + '.txt';

    fetch(url).then(response => {
        if(!response.ok){
            throw new Error(
                chapterContent.textContent = 'Capítulo indisponivel no momento',
                chapterOptions.value = chapter,
                chapterTitle.textContent += ' ' + chapter,
            );
        }else{
            return response.text();
        }
    }).then(text => {
        htmlTitle.textContent = chapter;
        chapterOptions.value = chapter;
        chapterTitle.textContent += ' ' + chapter;
        chapterContent.textContent = text;
    });
}


// next/prev chapter buttons
function NextButton() {
    if(chapterURL == null){
        chapterURL = 'C1';
    }
    let newCurrentChapter = chapterURL.slice(1);

    const nextChapter = function(){
        newCurrentChapter = Number(newCurrentChapter) + 1;
        const chapter = 'C' + newCurrentChapter;
        window.location.search = `?chapter=${chapter}`;
        chooseChapter(chapter);
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
    nextBtn.onclick = nextChapter;

    const previousChapter = function() {
        newCurrentChapter = Number(newCurrentChapter) - 1;
        const chapter = 'C' + newCurrentChapter;
        window.location.search = `?chapter=${chapter}`;
        chooseChapter(chapter);
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
    prevBtn.onclick = previousChapter;
}
NextButton()



// dark/light read mode.
const container = document.querySelector('.container');
let darkMode = localStorage.getItem('darkMode');

readMode.onchange = function() {
    let readClass = readMode.value;
    readMode.classList.add(readClass);
    darkLightMode();
}

function darkLightMode(){
    if(readMode.classList.contains('light')){
        darkMode = localStorage.setItem('darkMode', null);
        
        container.classList.remove('darkMode');
        document.body.classList.remove('darkMode');
        scrollIcon.classList.remove('darkMode');

        readMode.classList.remove('light');
    } 
    else if(readMode.classList.contains('dark') || darkMode === 'on'){
        darkMode = localStorage.setItem('darkMode', 'on');
        readMode.value = 'dark';

        container.classList.add('darkMode');
        document.body.classList.add('darkMode');
        scrollIcon.classList.add('darkMode');

        readMode.classList.remove('dark');
    }
}
darkLightMode();