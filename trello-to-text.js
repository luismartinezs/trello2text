const fs = require('fs');

// Read the JSON file
fs.readFile('trello.json', 'utf8', function (err, data) {
  if (err) {
    console.log("Error reading file: ", err);
    return;
  }
  const trelloData = JSON.parse(data);
  let output = '';

  // Loop through the lists
  for (let list of trelloData.lists) {
    // Ignore closed (archived) lists
    if (list.closed) {
      continue;
    }

    output += `List: ${list.name}\n`;

    // Get the cards for this list
    const cards = trelloData.cards.filter(card => card.idList === list.id && !card.closed);
    cards.sort((a, b) => a.pos - b.pos); // sort cards by position

    for (let card of cards) {
      output += `  Card: ${card.name}\n`;
      if (card.desc) {
        output += `    Description: ${card.desc}\n`;
      }

      // Add labels
      if (card.labels.length > 0) {
        output += `    Labels: ${card.labels.map(label => label.name).join(', ')}\n`;
      }

      // Add custom field items
      for (let customFieldItem of card.customFieldItems) {
        const customField = trelloData.customFields.find(field => field.id === customFieldItem.idCustomField);
        if (customField && customField.name === 'Scope') {
          output += `    Scope: ${customFieldItem.value.number}\n`;
        }
      }

    }

    output += '\n'; // Add a newline between lists for readability
  }

  // Write the output to a file
  fs.writeFile('output.txt', output, 'utf8', function (err) {
    if (err) {
      console.log("Error writing file: ", err);
    } else {
      console.log("File written successfully");
    }
  });
});
