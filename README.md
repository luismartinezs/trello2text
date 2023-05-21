# Trello to Text Converter

This Node.js script reads a Trello board JSON export and generates a text file with key information about each list and card on the board. It also extracts and writes the value of the custom field "Scope" for each card.

Add `json` to the end of a trello url, e.g. `https://trello.com/b/[BOARD_ID]/general.json`

Copy the JSON into a file called `trello.json` in the same directory as this script.

Run `node trello-to-text.js` to generate a file called `output.txt` in the same directory.