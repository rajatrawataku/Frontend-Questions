
const en = {
  "menu.home": "Home",
  "menu.aboutMe": "About Me",
  "menu.projects": "Projects",
  "menu.contactMe": "Contact me",
  "menu.alexDev": "Alex Dev",
  "common.menu": "Menu"
};

const arSa= {
   "menu.home": "الصفحة الرئيسية",
  "menu.aboutMe": "عني",
  "menu.projects": "المشاريع",
  "menu.contactMe": "اتصل بي",
  "menu.alexDev": "أليكس ديف",
  "common.menu": "قائمة طعام"
}



/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

const locale = navigator.language;
const locales = {
  en,
  "en-GB":en,
  "ar-sa": arSa
};

const elements = document.querySelectorAll("[data-i18n]");
const replaceText = (el) => {
  const key = el.innerText;

    el.innerText = (locales[locale] && locales[locale][key]) || en[key];
}
elements.forEach(el => replaceText(el));

