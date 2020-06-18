import express, { static } from 'express';
import compression from 'compression';
import { join } from 'path';
const app = express();
 
app.use(compression());
app.use(static(join(__dirname, 'build')));
 
app.get('*', function(req, res) {
    res.sendFile(join(__dirname, 'build', 'index.html'));
});
 
const PORT = process.env.PORT || 3000;
 
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});