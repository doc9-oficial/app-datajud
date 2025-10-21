import docgo from 'docgo-sdk';
import fetch from 'node-fetch';

export default async function buscarPorEnvolvido(params: any): Promise<void> {
  try {
    if (Array.isArray(params) && params.length === 1 && typeof params[0] === 'object') {
      params = params[0];
    }
    const { tribunal, envolvido } = params;
    if (!tribunal || !envolvido) {
      return console.log(docgo.result(false, null, 'Parâmetros obrigatórios: tribunal, envolvido'));
    }

    // Monta o JSON esperado pela API
    const query = JSON.stringify({
      query: {
        match: {
          "partes.nome": envolvido
        }
      }
    });

    const apiKey = docgo.getEnv('DATAJUD_API_KEY') || docgo.getEnv('datajudApiKey');
    if (!apiKey) {
      return console.log(docgo.result(false, null, 'API Key DataJud não configurada'));
    }

    const baseUrl = (docgo.getEnv('DATAJUD_BASE_URL') || 'https://api-publica.datajud.cnj.jus.br').replace(/\/$/, '');
    const url = `${baseUrl}/${tribunal}`;

    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `APIKey ${apiKey}`
      },
      body: query
    });

    if (!resp.ok) {
      throw new Error(`Falha HTTP ${resp.status}`);
    }

    const data = await resp.json() as any;
    return console.log(docgo.result(true, data));
  } catch (error: any) {
    return console.log(docgo.result(false, null, error.message));
  }
}
