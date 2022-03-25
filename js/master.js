/*
LocalStorg
*/

// Check If There's Local Storag Color Option
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {
  // console.log("Local Strage Is Not Empty You can Set it on root now");
  // console.log(localStorage.getItem("color_option"));
  document.documentElement.style.setProperty("--main-color", mainColors);

  // Check For Active Class
  // Remove Active Class All From Colors List Item
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    // Add Active Class Element With Data-Color === Local Storage Item
    if (element.dataset.color === mainColors) {
      // add active class
      element.classList.add("active");
    }
  });
}

// Background Option
let backGroundOption = true;

// Variable To Control the interval

let backGroundInterval;

// Check If Thers Local Storage Random Background Item

let backgroundLocalItem = localStorage.getItem("background_option");

//Check If random Background local storage is not empty
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backGroundOption = true;
  } else {
    backGroundOption = false;
  }
  // Remove active from all spans

  document.querySelectorAll(".random span").forEach((element) => {
    element.classList.remove("active");
  });

  if (backgroundLocalItem === "true") {
    document.querySelector(".yes").classList.add("active");
  } else {
    document.querySelector(".no").classList.add("active");
  }
}

/////////////////////////////////////////////////////////////////////////////////
document.querySelector(".toggle-setting i").onclick = function () {
  // Toggle Class Fa Spin For Rotation on Self
  this.classList.toggle("fa-spin");

  //Toggle Class Main Setting Box 
  document.querySelector(".setting-box").classList.toggle("open");
};
//////////////////////////////////////////////////////////////////////////////
// Switch Colors  
const colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach((li) => {
  // Loop On All List Items
  // Li =>(ul) العناصر الموجودة في  ال
  li.addEventListener("click", (e) => {
    // Set Color On root
    document.documentElement.style.setProperty(
      "--main-color", 
      e.target.dataset.color 
    );
    //Set Color On Local Storage
    localStorage.setItem("color_option", e.target.dataset.color);
    handleActive(e);
  });
});

// Switch Random Background Option
const randomBackEl = document.querySelectorAll(".random span");

// Loop On All spans
randomBackEl.forEach((span) => {
  // Click On Every Span
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backGroundOption = true;
      randomizeImgs();
      localStorage.setItem("background_option", true);
    } else {
      backGroundOption = false;
      clearInterval(backGroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});
//////////////////////////////////////////////////////////////////////////////////
//|||||||||||||||||||||||||||||||||||||||||||||||
// Select Landing Page Element
let landingPage = document.querySelector(".landing-page"); // العنصر div لديه كلاس .landing-page

// Get Arrey Of imgs
let imgsArrey = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"]; // الصور الموجودين في ملف الصور

// console.log(randomNumber);

// Function To Randomize Imge
function randomizeImgs() {
  if (backGroundOption === true) {
    backGroundInterval = setInterval(() => {
      // Get Random Number 
      let randomNumber = Math.floor(Math.random() * imgsArrey.length);

      // Change Background Image Url
      landingPage.style.backgroundImage =
        "url(imgs/" + imgsArrey[randomNumber] + ")";
    }, 2000); // سبع ثواني
  }
}
randomizeImgs();
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

// Select Skills Selector
let ourSkills = document.querySelector(".our-skills");
let spanSkills = document.querySelectorAll(".skills-box .skill-progress span");

window.onscroll = function () {
  if (window.scrollY >= ourSkills.offsetTop) {
    spanSkills.forEach((span) => {
      span.style.width = span.dataset.progress;
    });
  }
};

// Create Popup With the Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create Overlay Element
    let overLay = document.createElement("div");

    // Add Class To Overlay
    overLay.className = "popup-overlay";

    //Append Overlay To The Body
    document.body.appendChild(overLay);

    //Create The Popup Box
    let popupBox = document.createElement("div");

    // Add Class To PopupBox
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // Create Heading
      let imageHeading = document.createElement("h3");

      // create Text For Heading
      let imageText = document.createTextNode(img.alt);

      // Appenf The Teaxt To The Heading
      imageHeading.appendChild(imageText);

      // Append The Heading To The Popup Box
      popupBox.appendChild(imageHeading);
    }

    //Create The Image
    let popupImage = document.createElement("img");
    // console.log(img.src);

    // Set Image Source
    popupImage.src = img.src;

    // Add Image To popup Box
    popupBox.appendChild(popupImage);

    // Append The Popup box To Body
    document.body.appendChild(popupBox);

    // Create The Close Span
    let closeButton = document.createElement("span");

    // Craete The Close Button Text
    let textSpan = document.createTextNode("X");

    // Add Text To The Span
    closeButton.appendChild(textSpan);

    // Add Class To Close Button
    closeButton.className = "close-button";

    //Add Close Button To Popup Box;
    popupBox.appendChild(closeButton);
  });
});

// close Popup
document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    // remove the Current Popup
    e.target.parentNode.remove();

    //Remove Over Lay
    document.querySelector(".popup-overlay").remove();
  }
});

// Select All Bullets Scrool Smooth
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Select All Links Scrool Smooth
const allLinks = document.querySelectorAll(".links a");

function scrollToSection(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollToSection(allBullets);
scrollToSection(allLinks);

// Handel Active State
function handleActive(ev) {
  // Remove Active Class From All Lis
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  // Add Active Class On Target
  ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";

    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
    handleActive(e);
  });
});

// Rest Options
document.querySelector(".rest-option").onclick = function () {
  // localStorage.clear();
  localStorage.removeItem("color_option");
  localStorage.removeItem("bullets_option");
  localStorage.removeItem("background_option");

  // Reload Window
  window.location.reload();
};
// Toggel Menu
let toggleBtn = document.querySelector(".toggel-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  // Stop Propagation
  e.stopPropagation();
  this.classList.toggle("menu-active");
  this.classList.toggle("width");
  tLinks.classList.toggle("open");
};
//Click AnyWhere Outside Menu And Toggle Button
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    // check if menu Is open
    if (tLinks.classList.contains("open")) {
      toggleBtn.classList.toggle("menu-active");
      toggleBtn.classList.toggle("width");
      tLinks.classList.toggle("open");
    }
  }
});

// Stop Propagation on menu
tLinks.onclick = function (e) {
  e.stopPropagation();
};
