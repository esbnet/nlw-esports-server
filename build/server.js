import express from 'express';
const app = express();
app.get('/ads', (req, res) => {
    res.json([
        { id: 1, name: 'Anúcio 1' },
        { id: 2, name: 'Anúcio 2' },
        { id: 3, name: 'Anúcio 3' },
        { id: 4, name: 'Anúcio 4' },
    ]);
});
app.listen(3333);
