let helpers = {};

helpers.dataContext = {};

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

module.exports = helpers;
