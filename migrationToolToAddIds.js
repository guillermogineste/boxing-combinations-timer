const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Read the JSON file
let data = fs.readFileSync('combinations-original.json');
let json = JSON.parse(data);

// Create a new array to hold all items
let flatArray = [];

// Update 'simple' combinations and add to flatArray
json.simple.forEach(item => {
  flatArray.push({
    description: item.description,
    isOrthodox: item.stance.includes('orthodox'),
    isSouthpaw: item.stance.includes('southpaw'),
    _id: uuidv4(),
    _type: "simple-combination"
  });
});

// Update 'additive' combinations and add to flatArray
json.additive.forEach(item => {
  flatArray.push({
    description: [
      ...item.set1.map(set => set.description),
      ...item.set2.map(set => set.description),
      ...item.set3.map(set => set.description)
    ].join(', '),
    set1: item.set1[0].description,
    set2: item.set2[0].description,
    set3: item.set3[0].description,
    isOrthodox: item.stance.includes('orthodox'),
    isSouthpaw: item.stance.includes('southpaw'),
    _id: uuidv4(),
    _type: "additive-combination"
  });
});

// Add unique IDs to 'focus' items and add to flatArray
json.focus.forEach(item => {
  flatArray.push({
    description: item.description,
    _id: uuidv4(),
    _type: "focus-prompt"
  });
});

// Write the updated JSON back to the file in NDJSON format
const ndjson = flatArray.map(item => JSON.stringify(item)).join('\n');
fs.writeFileSync('combinations-to-import.ndjson', ndjson);