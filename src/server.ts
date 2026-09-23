import { on } from 'events';
import express, { type ErrorRequestHandler } from 'express';


const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
   res.status(200).json({ status: 'ok'}); 
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ status: 'Internal Server Error' });
};

app.use(errorHandler);


const PORT = process.env.PORT || 3000
app.listen(PORT , () =>{
    console.log (`Servidor rodando na prota ${PORT} `);
});

