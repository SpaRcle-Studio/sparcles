const tham = document.querySelector(".tham");
tham?.addEventListener('click', () => {
    tham.classList.toggle('tham-active');
  });

document.querySelector('.burger-button')?.addEventListener('click', () => {
    let navBar = document.querySelector('.nav__container')
    if(navBar) {
        navBar.classList.toggle('hidden')
        navBar.classList.toggle('w-full')
        navBar.classList.toggle('flex')
        navBar.classList.toggle('flex-col')
        navBar.classList.toggle('items-center')
        navBar.classList.toggle('absolute')
        navBar.classList.toggle('top-24')
        navBar.classList.toggle('left-0')
        navBar.classList.toggle('rounded-b-[50px]')
    }
})
