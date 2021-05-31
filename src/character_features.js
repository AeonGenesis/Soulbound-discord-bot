const { d6 } = require('./dice');
const { randomInt } = require('./util');

const distinguishingFeatures = {
  Scar: [
    'Pockmarked cheeks',
    'Gash across left eye',
    'Burned hand',
    'Noose mark around throat',
    'Missing ear',
    'Frequestly broken nose',
  ],
  Tattoo: [
    'Ocean waves along arms',
    'Holy symbol on rump',
    'Intricate maze on back',
    'Strange arcane markings on chest',
    'Broken chains on wrists',
    'Kill count on forearm',
  ],
  Piercing: ['Ear', 'Septum', 'Neck', 'Eyebrow', 'Tongue', 'Belly-button'],
  Scent: [
    'Freshly cut grass',
    'Stale meat',
    'Ocean mist',
    'Rotten eggs',
    'Oil and grease',
    'Smoke and ash',
  ],
  Accent: [
    'Slow and deliberate',
    'Quick and precise',
    'Thinks out loud',
    'Lazy Drawl',
    'Rough whisper',
    'Bellowing and commanding',
  ],
  Affectation: [
    'Plays with hair/beard',
    'Flips a coin to make decisions',
    'Wears two hats',
    'Imitates a different Species',
    'Always snacking',
    'Whistles or sings when nervous',
  ],
};

const eyeType = [
  'Mornful',
  'Bitter',
  'Haunted',
  'Sad',
  'Cold',
  'Hollow',
  'Smiling',
  'Hopeful',
  'Bright',
  'Caring',
  'Trusting',
  'Warm',
  'Piercing',
  'Striking',
  'Searching',
  'Hard',
  'Calculating',
  'Dead',
  'Soft',
  'Deep',
  'Hagard',
  'Old',
  'Young',
  'Misty',
  'Wild',
  'Narrow',
  'Weary',
  'Uncaring',
  'Intense',
  'Stormy',
  'Sparkling',
  'Gentle',
  'Wise',
  'Cunning',
  'Burning',
  'Mesmerising',
];

const eyeColor = {
  human: ['Black', 'Green', 'Blue', 'Brown', 'Hazel', 'Amber'],
  aelf: ['White', 'Gold', 'Jade', 'Sapphire', 'Amethyst', 'Ruby', 'Black'],
  duardin: [
    'Molten Gold',
    'Rich Green',
    'Pale Blue',
    'Dark Brown',
    'Bright Orange',
    'Flame Red',
    'Coal Black',
  ],
  sylvaneth: [
    'Snow White',
    'Ice Blue',
    'Bright Yellow',
    'Verdant Green',
    'Soft Orange',
    'Deep Brown',
    'Night Black',
  ],
};

const hairColor = {
  human: [
    'White Blond',
    'Golden Blond',
    'Black',
    'Brown',
    'Auburn',
    'Red',
    'Grey',
  ],
  aelf: [
    'White',
    'Silver',
    'Honey Blond',
    'Chestnut Brown',
    'Mahogany Brown',
    'Deep Red',
    'Black',
  ],
  duardin: [
    'White',
    'Grey',
    'Golden',
    'Copper',
    'Bronze',
    'Dark Brown',
    'Black',
  ],
  sylvaneth: [
    'Newly Budding',
    'Pale Yellow',
    'Soft Green',
    'Verdant Green',
    'Golden Brown',
    'Wilted',
    'Dead',
  ],
};

function addDiceResults(dice) {
  return [...Array(dice)]
    .map(() => d6())
    .reduce((currentValue, nextValue) => nextValue + currentValue);
}

function randomDistinguishingFeature() {
  const categories = Object.keys(distinguishingFeatures);
  const randomCategory = categories[randomInt(0, categories.length - 1)];
  const features = distinguishingFeatures[randomCategory];
  const randomFeature = features[randomInt(0, features.length - 1)];
  return `${randomCategory}: ${randomFeature}`;
}

function centimetersToFeetInches(centimeters) {
  const inches = Math.round(centimeters / 2.54);
  const convertedHeight = {
    feet: Math.floor(inches / 12),
    inches: inches % 12,
  };
  return convertedHeight;
}

function calculateHeight(defaultHeight, dice) {
  const heightInCentimeters =
    defaultHeight +
    [...Array(dice)]
      .map(() => d6())
      .reduce((currentValue, nextValue) => nextValue + currentValue);

  const heightInFeetInches = centimetersToFeetInches(heightInCentimeters);

  const feet = heightInFeetInches.feet;
  const inches = heightInFeetInches.inches;

  return `${feet}'${inches}"`;
}

class HumanFeatures {
  constructor() {
    this.age = addDiceResults(3) + 15;
    this.eyeType = eyeType[randomInt(0, eyeType.length - 1)];
    this.eyeColor = eyeColor.human[randomInt(0, eyeColor.human.length - 1)];
    this.hairColor = hairColor.human[randomInt(0, hairColor.human.length)];
    this.height = calculateHeight(147.32, 3);
    this.distinguishingFeature = randomDistinguishingFeature();
  }
}

class StormcastFeatures {
  constructor() {
    this.age = 'Unknowable';
    this.eyeType = eyeType[randomInt(0, eyeType.length - 1)];
    this.eyeColor = eyeColor.human[randomInt(0, eyeColor.human.length - 1)];
    this.hairColor = hairColor.human[randomInt(0, hairColor.human.length - 1)];
    this.height = calculateHeight(203.2, 3);
    this.distinguishingFeature = randomDistinguishingFeature();
  }
}

class AelfFeatures {
  constructor() {
    this.age = addDiceResults(6) * 5;
    this.eyeType = eyeType[randomInt(0, eyeType.length - 1)];
    this.eyeColor = eyeColor.aelf[randomInt(0, eyeColor.aelf.length - 1)];
    this.hairColor = hairColor.aelf[randomInt(0, hairColor.aelf.length - 1)];
    this.height = calculateHeight(177.8, 2);
    this.distinguishingFeature = randomDistinguishingFeature();
  }
}

class DuardinFeatures {
  constructor() {
    this.age = addDiceResults(4) * 5;
    this.eyeType = eyeType[randomInt(0, eyeType.length - 1)];
    this.eyeColor = eyeColor.duardin[randomInt(0, eyeColor.duardin.length - 1)];
    this.hairColor =
      hairColor.duardin[randomInt(0, hairColor.duardin.length - 1)];
    this.height = calculateHeight(124.46, 2);
    this.distinguishingFeature = randomDistinguishingFeature();
  }
}

class SylvanethFeatures {
  constructor({ isKurnoth = false }) {
    this.age = addDiceResults(1) * addDiceResults(1) * addDiceResults(1);
    this.eyeType = eyeType[randomInt(0, eyeType.length - 1)];
    this.eyeColor =
      eyeColor.sylvaneth[randomInt(0, eyeColor.sylvaneth.length - 1)];
    this.hairColor =
      hairColor.sylvaneth[randomInt(0, hairColor.sylvaneth.length - 1)];
    this.height = isKurnoth
      ? `${d6() + d6() + 3}'${d6()}"`
      : calculateHeight(162.56, 2);
    this.distinguishingFeature = randomDistinguishingFeature();
  }
}

module.exports = {
  HumanFeatures,
  StormcastFeatures,
  AelfFeatures,
  DuardinFeatures,
  SylvanethFeatures,
};
