const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage }).single('file');

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: 'File upload failed', error: err });
        }
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        
        const filepath = req.file.path;
        res.status(200).json({ message: 'File uploaded successfully', path: filepath });
    });
});

app.get('/data', (req, res) => {
    console.log("Called");
    res.send("Hi");
});

app.listen(5000, () => {
    console.log("Server started at port 5000");
});
