const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// 1. التحقق من الـ Token الخاص بـ Meta (الضروري لتفعيل الـ Webhook)
app.get('/webhook', (req, res) => {
    const verify_token = "AHMED_RAZEK_2026"; // الكلمة اللي هتحطها في إعدادات Meta
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token === verify_token) {
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
});

// 2. استقبال الرسائل وتمريرها لـ n8n
app.post('/webhook', async (req, res) => {
    try {
        console.log("استلمت رسالة، جاري إرسالها لـ n8n...");
        
        // استبدل الرابط أدناه بالرابط اللي بعتهولي الخاص بـ n8n
        const n8n_webhook_url = 'https://w32re.app.n8n.cloud/webhook/whatsapp';
        
        await axios.post(n8n_webhook_url, req.body);
        
        res.sendStatus(200);
    } catch (error) {
        console.error("خطأ في إرسال البيانات لـ n8n:", error.message);
        res.sendStatus(500);
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`السيرفر شغال يا أحمد على بورت ${PORT}`);
});
