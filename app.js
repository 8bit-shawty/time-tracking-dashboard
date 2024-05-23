// get access to all tabs and panels
const tabs = [...document.querySelectorAll('[role=tab]')];
const panels = [...document.querySelectorAll('[role=tabpanel]')];

function handleTabClick(e){
    // get panel to show
    const panelToControl = e.currentTarget.getAttribute('aria-controls');
    // loop through all panels and hide/show all panels
    panels.forEach(p => {
        p.setAttribute('aria-hidden', `${p.id == panelToControl ? 'false' : 'true'}`)
    })
    // update the aria label for correct button
    tabs.forEach(t => {
        t.setAttribute('aria-selected', `${t == e.currentTarget ? 'true' : 'false'}`)
    })
}

function handleKeyDownEvent(e){
    const actEl = document.activeElement;
    if(!actEl.classList.contains('tab')){return}
    switch(e.key){
        case 'ArrowLeft':
            e.preventDefault();
            if(actEl == tabs[0]){
                return tabs[tabs.length - 1].focus();
            }
            actEl.previousElementSibling.focus();
            break;
        case 'ArrowRight':
            e.preventDefault();
            if(actEl == tabs[tabs.length - 1]){
                return tabs[0].focus();
            }
            actEl.nextElementSibling.focus();
            break;
        default:
            return;
    }
}

// on selection of tabs, show panel
tabs.forEach(tab => {
    tab.addEventListener('click', handleTabClick);
})

// keyboard events
window.addEventListener('keydown', handleKeyDownEvent)
