// DOM elements
const videoElem = document.getElementById('backgroundVideo');
const addressElem = document.getElementById('address');
const logoTxtElems = document.querySelectorAll('#logoText > span');
const cs = document.currentScript;

// Constants
const addressShowHeight = 800; //pixels
const writeSpeed = 50; //miliseconds
const eraseDelay = 12; //characters
const animationInitDelay = cs.getAttribute('animationInitDelay') || 500; //miliseconds
const videoReplayDelay = 2000; //miliseconds
const logoRepeat = cs.getAttribute('logoRepeat') || false;

// Vars
let currentTxtIndex = 0;

// Check if there's a backgroundVideo
if(videoElem) {
  // Set video to slomo
  videoElem.playbackRate = 0.75; //fps

  // After video ends
  videoElem.addEventListener('ended', event => {

    // Restart the video
    setTimeout(() => {
      videoElem.play();
    }, videoReplayDelay);
  });
}

logoTxtElems.forEach(logoTxtElem => {

  // Store current text in a data attribute
  logoTxtElem.dataset.text = logoTxtElem.innerText;

  // Clear the text
  logoTxtElem.innerText = '';
})

// Text animation init
function initLogoAnimation() {

  // Animate current text
  typeText(logoTxtElems[currentTxtIndex], initLogoAnimation);

  // Next text elem
  currentTxtIndex++;

  // If last text elem has passed
  if(currentTxtIndex > logoTxtElems.length - 1){

    // Reset to first
    currentTxtIndex = 0;
  }
}

// Text animation
function typeText(txtElem, callback) {
  let text = txtElem.dataset.text;
  let textLength = text.length + eraseDelay;
  let cursor = 1;
  let next = 1;

  let typeTimer = setInterval(() => {

    // Set text up to the cursor
    txtElem.innerText = text.substring(0, cursor);

    // If end has been reached
    if(cursor >= textLength && next == 1){

      if(!logoRepeat) {
        return;
      }

      // Trigger backwards
      next = -1;
    }

    // Done going back
    if(cursor < 0 && next == -1){

      // Clear interval
      clearInterval(typeTimer);

      // Trigger callback
      callback();
    }

    // Update cursor
    cursor += next;
  }, writeSpeed)
}
/*
// Check window height on resize
window.addEventListener('resize', testWindowHeight);

// Check window height
function testWindowHeight() {
  if(document.body.clientHeight < addressShowHeight) {
    // Hide if no space
    addressElem.style.opacity = 0;
  } else {
    // Show if there is
    addressElem.style.opacity = .4;
  }
}*/

/*
 * INIT CODE
 */

// Fire up the animation
setTimeout(initLogoAnimation, animationInitDelay);

// Initially check window height
// testWindowHeight();
