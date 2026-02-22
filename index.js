const express = require('express');
const app = express();
app.use(express.json());

// التحقق من الـ Token (خطوة ضرورية لميتا)
app.get('/webhook', (req, res) => {
    const verify_token = "AHMED_RAZEK_2026"; // يمكنك تغييرها لأي كلمة سر
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token === verify_token) {
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
});

// استقبال الرسائل الفعلية
app.post('/webhook', (req, res) => {
    console.log("Message Received:", JSON.stringify(req.body, null, 2));
    res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
