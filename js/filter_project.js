const refs = {
    filterBtn: document.querySelector('.butts'),
    projectElBox: document.querySelectorAll('.card'),
}

refs.filterBtn.addEventListener('click', onFiltredProject);

function onFiltredProject(evt) {                
    selectBtn(evt);
    selectCard();
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
