import { projectItems } from './project.js';

const refs = {
    filterBtn: document.querySelector('.butts'),
    projectElBox: document.querySelectorAll('.card'),
    projectContainer: document.querySelector('.container-project')
}

refs.projectContainer.innerHTML = createProjectGallery(projectItems);
refs.filterBtn.addEventListener('click', onFiltredProject);

function onFiltredProject(evt) {                
    selectBtn(evt);
    // selectCard();
    refs.projectContainer.innerHTML = createProjectGallery(projectItems);
}

function selectBtn(evt) {
    const clickBtn = evt.target === evt.currentTarget;
    let selectedBtns = Array.from(refs.filterBtn.querySelectorAll('.on-selected'));
    
    if (!clickBtn) {
        if (evt.target.textContent === 'All') {
            selectedBtns.forEach(item => item.classList.remove('on-selected'));
        } else {            
            selectedBtns.forEach(item => {
                if (item.textContent === 'All') {
                    item.classList.remove('on-selected')
                }
            })
        }
        evt.target.classList.toggle('on-selected');
        selectedBtns = refs.filterBtn.querySelectorAll('.on-selected')

        if (!selectedBtns.length) {
                refs.filterBtn.querySelector('.butts-punkt').classList.add('on-selected')
            }
    }
}


function selectCard() {
    const allCard = refs.projectElBox;
    const activeFilter = Array.from(refs.filterBtn.querySelectorAll('.on-selected')).map(item => item.textContent);

    allCard.forEach(card => {
        const currentCard = card.querySelector('.card-type');
        const currentCardText = currentCard.textContent.trim();
        if (activeFilter.includes('All') || activeFilter.includes(currentCardText)) {
            card.style.display = 'block'
        } else {
            card.style.display = 'none';
        } 
    })
}


function createProjectGallery(projectItems) {
    return projectItems.filter(({ cardtype }) => {
        const activeFilter = Array.from(refs.filterBtn.querySelectorAll('.on-selected')).map(item => item.textContent);
        return (activeFilter.includes('All') || activeFilter.includes(cardtype))
    }).map(({ img, img2x, aboutcard, cardname, cardtype }) => 
            `<li class="card">
              <a class="link" href="">
                <div class="thumb">
                  <picture>
                    <source
                      srcset="
                        ./images/portfolio/mobile/${img}    1x,
                        ./images/portfolio/mobile/${img2x} 2x
                      "
                      media="(max-width: 767px)"
                    />
                    <source
                      srcset="
                        ./images/portfolio/tablet/${img}    1x,
                        ./images/portfolio/tablet/${img2x} 2x
                      "
                      media="(max-width: 1199px)"
                    />
                    <source
                      srcset="
                        ./images/portfolio/desktop/${img}    1x,
                        ./images/portfolio/desktop/${img2x} 2x
                      "
                      media="(min-width: 1200px)"
                    />
                    <img
                      src="./images/portfolio/desktop/${img}"
                      alt="${cardname}"
                    />
                  </picture>
                  <p class="aboutcard">
                    ${aboutcard}
                  </p>
                </div>
                <div class="project-card">
                  <h2 class="card-name">${cardname}</h2>
                  <p class="card-type">${cardtype}</p>
                </div>
              </a>
            </li>`
     ).join('')
}