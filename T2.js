const readline = require("readline");                   // Definindo o READLINE
const axios = require("axios");                         // Definindo o AXIOS
const appid = "ef0b0973b783e0614ac87612ec04344b";       // Definindo a chave de serviço com OpenWeather

const units = "metric";                                 // Definindo unidade de medida
const lang = "pt_br";                                   // Definindo o idioma
const limit = "1";                                      // Definindo o limite de cidades

// Leitura do input do console
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Input da cidade
rl.question('Digite uma cidade: ', function (q) {
    // Busca a latitude e longitude da cidade escolhida
    const url_lat_lon = `http://api.openweathermap.org/geo/1.0/direct?q=${q}&limit=${limit}&appid=${appid}`;

    axios
        .get(url_lat_lon)
        .then((res) => {
            // Coleta dos dados essenciais
            const data = res.data[0];
            // Definição de variaveis basicas
            const name = data.local_names["pt"];
            const state = data.state;
            // Coleta da latitude e longitude
            const lat = data.lat;
            const lon = data.lon;
            // Pesquisa do clime de acordo com a latitude e longitude
            const url_clima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${appid}&lang=${lang}`;
            
            axios
                .get(url_clima)
                .then((res) => {
                    return res.data;
                })
                .then((res) => {
                    // Coleta de sensação termica e descriçao do lugar
                    const sensacao = res.main.feels_like;
                    const descricao = res.weather[0].description;
                    // Print do resultado
                    console.log(`Cidade: ${name}, ${state} (Latitude: ${lat}, Longitude: ${lon})`);
                    console.log(`Sensaçao térmica: ${sensacao}°C`);
                    console.log(`Descrição: ${descricao}`);
                })
            return data;
        })
    rl.close();
});
