// Dirty hack to get this thing to behave how I want on mobile

function handleResize() {
    window.scrollTo(0,0);
    document.documentElement.style.height = window.visualViewport.height + 'px';
}

handleResize();


window.addEventListener('resize', handleResize, true);