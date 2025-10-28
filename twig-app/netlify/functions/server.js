import serverless from 'serverless-http';
import express from 'express';
import twig from 'twig';
import path from 'path';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use process.cwd() to resolve paths safely in Netlify
app.set('views', path.join(process.cwd(), 'views'));
app.set('view engine', 'twig');
app.engine('twig', twig.__express);
app.use(express.static(path.join(process.cwd(), 'public')));

app.get('/', (req, res) => {
  res.render('pages/home', { pageTitle: 'Home - Ticketly (Twig)' });
});

// Add other routes here...

export const handler = serverless(app);
