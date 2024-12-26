// server.js

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import router from './router/route.js';
import connect from './database/conn.js';

config();

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;

app.use('/api', router);

app.get('/', (req, res) =&gt; {
    try {
        res.json(&quot;Get Request&quot;)
    } catch (error) {
        res.json(error)
    }
});

connect().then(() =&gt; {
    app.listen(port, () =&gt; {
        console.log(`Server connected to http://localhost:${port}`);
    });
}).catch(error =&gt; {
    console.log(&quot;Invalid Database Connection&quot;);
});