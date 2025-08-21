//-------------------------------------------html element-------------------------------------------------

const menuIcon = document.querySelector('.menu-icon');
const xIcon = document.querySelector('.wrong-icon');
const navLinks = document.querySelector('.nav-links');

//------------------------------------------function----------------------------------------------------

//-[1]-for display links list when press on bar icon
function pressBar() {
    menuIcon.classList.add('d-none');
    xIcon.classList.remove('d-none');
    navLinks.classList.remove('hide-links-list');
    navLinks.classList.add('appear-links-list');

}

//-[2]-for remove links list when press on X icon

function pressX() {
    xIcon.classList.add('d-none');
    menuIcon.classList.remove('d-none');
    navLinks.classList.remove('appear-links-list');
    navLinks.classList.add('hide-links-list');

}


//--------------------------------------------------events----------------------------------------------------------

//-[1]-for display links list when press on bar icon
menuIcon.addEventListener("click" , function () {
    pressBar()
});

//-[2]-for remove links list when press on X icon
xIcon.addEventListener("click" , function () {
    pressX()
});