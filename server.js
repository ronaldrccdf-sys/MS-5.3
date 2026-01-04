import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const SERPER_API_KEY = process.env.SERPER_API_KEY;

const AREA_SOURCES = {
  'EMPRESARIAL': 'Valor Econômico OR Brazil Journal OR Exame OR Financial Times',
  'GOVERNANÇA': 'Valor Econômico OR Brazil Journal OR Exame OR Financial Times',
  'MERCADO': 'Valor Econômico OR Brazil Journal OR Exame OR Financial Times',
  'CONTENCIOSO': 'JOTA OR ConJur OR Estadão OR Folha de S.Paulo',
  'TRIBUNAIS SUPERIORES': 'JOTA OR ConJur OR Estadão OR Folha de S.Paulo',
  'TRIBUTÁRIO': 'JOTA Tributos CARF OR Valor Econômico Tributos OR ConJur Tributário',
  'ENERGIA': 'CanalEnergia OR MegaWhat OR Valor Econômico Energia OR Eixos Energia',
  'ÓLEO & GÁS': 'Eixos Óleo Gás OR Petronotícias OR Valor Econômico Petróleo OR Upstream Online',
  'MINERAÇÃO': 'Brasil Mineral OR Mining Journal OR Valor Econômico Mineração OR Agência Infra Mineração',
  'DEFAULT': 'Valor Econômico OR JOTA OR ConJur OR G1 OR Estadão'
};

app.get('/api/news', async (req, res) => {
  const { area } = req.query;
  console.log(`Request received for area: ${area}`);
  
  if (!area) {
    return res.status(400).json({ error: 'Area is required' });
  }

  if (!SERPER_API_KEY) {
    console.error('SERPER_API_KEY not configured');
    return res.status(500).json({ error: 'Search API key not configured' });
  }

  const upperArea = area.toString().toUpperCase();
  let sourcesQuery = AREA_SOURCES['DEFAULT'];
  
  for (const key in AREA_SOURCES) {
    if (upperArea.includes(key)) {
      sourcesQuery = AREA_SOURCES[key];
      break;
    }
  }

  try {
    const searchQuery = `site:(${sourcesQuery}) "${area}"`;
    console.log(`Searching Serper with query: ${searchQuery}`);

    const response = await axios.post('https://google.serper.dev/search', {
      q: searchQuery,
      gl: 'br',
      hl: 'pt-br',
      tbm: 'nws', // News search
      num: 8
    }, {
      headers: {
        'X-API-KEY': SERPER_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    const newsResults = (response.data.news || []).map(item => ({
      headline: item.title,
      source: item.source || 'Notícia',
      link: item.link,
      date: item.date
    }));

    if (newsResults.length === 0 && response.data.organic) {
       // Fallback to organic if no news tab results
       response.data.organic.slice(0, 5).forEach(item => {
         newsResults.push({
           headline: item.title,
           source: item.source || new URL(item.link).hostname,
           link: item.link,
           date: item.date || 'Recente'
         });
       });
    }

    res.json(newsResults);
  } catch (error) {
    console.error('Error fetching news from Serper:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch real-time news' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend news server running on port ${PORT}`);
});
