const novelChapter = document.querySelector('.novel-chapters');
const showButton = document.querySelector('button');

for(let i = 1; i <= 20; i++){
    const chapter = document.createElement('a');
    chapter.setAttribute('class', 'chapter-link');
    chapter.href = `../index.html?chapter=C${i}`;
    chapter.textContent = `Capítulo ${i}`;
    novelChapter.appendChild(chapter);
}

function displayTotalChapters(){
  if(novelChapter.classList.contains('show-more')){
    for(let i = 21; i <= 70; i++){
        const chapter = document.createElement('a');
        chapter.href = `../index.html?chapter=C${i}`;
        chapter.textContent = `Capítulo ${i}`;
        novelChapter.appendChild(chapter);
    }

    showButton.style.display = 'none';
    novelChapter.classList.add('show-less');
    novelChapter.classList.remove('show-more');
    }
}

showButton.onclick = displayTotalChapters;