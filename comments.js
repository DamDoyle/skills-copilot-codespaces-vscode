// Create web server
// 1. Create a web server
// 2. Create a URL
// 3. Read the comments.json file
// 4. Return the contents of the comments.json file
// 5. Display the contents of the comments.json file in the browser

// 1. Create a web server
const express = require('express');
const app = express();

// 2. Create a URL
app.get('/comments', function (req, res) {
  // 3. Read the comments.json file
  const fs = require('fs');
  fs.readFile('comments.json', 'utf8', function (err, data) {
    if (err) throw err;
    // 4. Return the contents of the comments.json file
    res.send(data);
  });
});

// 5. Display the contents of the comments.json file in the browser
app.listen(3000, function () {
  console.log('Listening on port 3000');
});
