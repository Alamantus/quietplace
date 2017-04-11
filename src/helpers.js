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

helpers.scrollDescription = () => {
  const descriptionContainer = document.getElementsByClassName('description')[0];
  descriptionContainer.scrollTop = descriptionContainer.scrollHeight * 2;
  console.log(descriptionContainer.scrollTop);
  console.log(descriptionContainer.scrollHeight);
}

module.exports = helpers;
