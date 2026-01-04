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
  // Disabling backend news fetching as requested
  res.json([]);
});

app.listen(PORT, () => {
  console.log(`Backend news server running on port ${PORT}`);
});
