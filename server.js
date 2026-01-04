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

  try {
    // Constructing a more aggressive query to find specific NEWS ARTICLES, not just homepages
    // We add terms like "notícia", "artigo", "análise" and specifically target the news tab results
    const searchQuery = `${area} notícia (site:valor.globo.com OR site:jota.info OR site:conjur.com.br OR site:braziljournal.com OR site:canalenergia.com.br OR site:megawhat.energy OR site:petronoticias.com.br OR site:eixos.com.br OR site:brasilmineral.com.br OR site:exame.com OR site:ft.com OR site:estadao.com.br OR site:folha.uol.com.br)`;
    
    console.log(`Searching Serper with query: ${searchQuery}`);

    const response = await axios.post('https://google.serper.dev/search', {
      q: searchQuery,
      gl: 'br',
      hl: 'pt-br',
      tbm: 'nws', // Sticking to news for headlines
      num: 10,
      tbs: 'qdr:m' // Last month only to ensure fresh articles
    }, {
      headers: {
        'X-API-KEY': SERPER_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    let newsResults = [];
    
    // Serper's News results are usually specific articles with headlines
    if (response.data.news && response.data.news.length > 0) {
      newsResults = response.data.news.map(item => ({
        headline: item.title,
        source: item.source || 'Veículo Especializado',
        link: item.link,
        date: item.date
      }));
    } else {
      // Fallback: If no "news" tab results, search organic but with specific article patterns
      const fallbackResponse = await axios.post('https://google.serper.dev/search', {
        q: `${area} (intitle:notícia OR intitle:decisão OR intitle:análise) site:(valor.globo.com OR jota.info OR conjur.com.br)`,
        gl: 'br',
        hl: 'pt-br',
        num: 5
      }, {
        headers: {
          'X-API-KEY': SERPER_API_KEY,
          'Content-Type': 'application/json'
        }
      });
      
      if (fallbackResponse.data.organic) {
        newsResults = fallbackResponse.data.organic.map(item => ({
          headline: item.title,
          source: item.source || (new URL(item.link).hostname.replace('www.', '')),
          link: item.link,
          date: item.date || 'Recente'
        }));
      }
    }

    console.log(`Returning ${newsResults.length} news items`);
    res.json(newsResults);
  } catch (error) {
    console.error('Error fetching news:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch real-time news' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend news server running on port ${PORT}`);
});
