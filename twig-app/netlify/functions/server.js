import serverless from 'serverless-http';
import express from 'express';
import twig from 'twig';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', path.join(__dirname, '../../views'));
app.set('view engine', 'twig');
app.engine('twig', twig.__express);
app.use(express.static(path.join(__dirname, '../../public')));

app.get('/', (req, res) => {
  res.render('pages/home', { pageTitle: 'Home - Ticketly (Twig)' });
});
// Add other routes here...

export const handler = serverless(app);
