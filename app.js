const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1js21is021@123',
    database: 'project',
});

db.connect((err) => {
    if (err) {
        console.error('MySQL connection error:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname+ '/project.html');
});

// Handle form submission
app.post('/submitForm', (req, res) => {
    const { name, age, email, pass, phn } = req.body;

    const insertUserQuery = 'INSERT INTO users (name, age, email, password, phone) VALUES (?, ?, ?, ?, ?)';
    db.query(insertUserQuery, [name, age, email, pass, phn], (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            res.status(500).json({ error: 'Error inserting user' });
        } else {
            res.status(200).json({ message: 'User inserted successfully' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
