const EventEmitter = require('events');
const express = require('express');
const os = require('os');
const fs = require('fs');
const path = require('path');

const eventEmitter = new EventEmitter();
eventEmitter.on('taskComplete', () => {
    console.log('Complete task');
  });

const app = express();

app.get('/system-info', (req, res) => {
  const systemInfo = {
    platform: os.platform(),
    architecture: os.arch(),
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
    cpuCores: os.cpus(),
    uptime: os.uptime(),
    homeDirectory: os.homedir(),
  };

  // Ghi thông tin hệ thống ra file
  const filePath = 'D:/homework/system-info.txt';
  
  fs.writeFile(filePath, JSON.stringify(systemInfo, null, 2), (err) => {
    if (err) {
      console.error('Error writing file:', err);
      res.status(500).send('Error writing file');
    } else {
      console.log(`System info saved to ${filePath}`);
      res.json({ message: `System info saved to ${filePath}`, systemInfo });
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// http://localhost:3000/system-info
// npm start
