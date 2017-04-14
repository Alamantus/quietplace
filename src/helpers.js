const seedRandom = require('seed-random');

let helpers = {};

helpers.dataContext = {};

helpers.setRandomSeed = (dateStamp) => seedRandom(dateStamp, {global: true});

helpers.randomInRange = (min, max) => {
  return Math.random() * (max - min + 1) + min;
}

helpers.randomIntInRange = (min, max) => {
  return Math.round(helpers.randomInRange(min, max));
}

helpers.randomArrayElement = (array) => {
  return array[Math.floor(helpers.randomInRange(0, array.length - 1))];
}

// Set helpers.dataContext before using this!
helpers.fillTemplateString = (string, removeSeed = true) => {
  const templateStrings = string.match(/{{(.+)}}/g);

  if (templateStrings) {
    if (removeSeed) seedRandom.resetGlobal();

    templateStrings.forEach((templateString) => {
      const dataObjectArray = helpers.dataContext[templateString.replace(/[{}]/g, '')];
      string = string.replace(`${templateString}`, helpers.randomArrayElement(dataObjectArray));
    });

    if (removeSeed) setRandomSeed();
  }

  return string;
}

helpers.getAppropriateArticle = (string) => {
  const vowels = ['a', 'e', 'i', 'o', 'u'];

  return vowels.includes(string.substr(0, 1)) ? 'an' : 'a';
}


// Fade In/Out
helpers.fadeSpeed = 0.075;

helpers.fadeIn = () => {
  const fadeSpeed = helpers.fadeSpeed;
  const fadeWall = document.getElementById('fadeWall');
  fadeWall.style.display = 'block';
  fadeWall.style.opacity = 1;

  var fadeIn = setInterval(() => {
    const opacity = parseFloat(fadeWall.style.opacity);

    if (opacity > fadeSpeed) {
      fadeWall.style.opacity = opacity - fadeSpeed;
    } else {
      fadeWall.style.opacity = 0;
      fadeWall.style.display = 'none';
      clearInterval(fadeIn);
    }
  }, 100);
}

helpers.fadeOut = actionToTake => {
  const fadeSpeed = helpers.fadeSpeed;
  const fadeWall = document.getElementById('fadeWall');
  fadeWall.style.opacity = 0;
  fadeWall.style.display = 'block';

  console.log('fading out');

  var fadeIn = setInterval(() => {
    const opacity = parseFloat(fadeWall.style.opacity);

    if (opacity < 1 - fadeSpeed) {
      fadeWall.style.opacity = opacity + fadeSpeed;
      console.log(fadeWall.style.opacity)
    } else {
      fadeWall.style.opacity = 1;
      clearInterval(fadeIn);
      actionToTake();
    }
  }, 100);
}

module.exports = helpers;
