const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');


const PORT = process.env.PORT || 8005

const app = express();

app.use(cors({
    'origin': '*'
}))

const url = 'https://www.lottery.co.za/';

app.get('/lotto-result', ((req, res)=>{
    axios(url).then(response => {
        const html = response.data
       
        const $ = cheerio.load(html)
        const winning_numbers = [];

        $('.daily-lotto-ball', html).each(function(){
            winning_numbers.push($(this).text())
        })

        lotto_results = {
            drawDate: $('boxResultsDate').text().replace(' - ',''),
            drawResults: winning_numbers,
            link: $('.button-yellow').attr('href')
        }
        res.json(lotto_results)
    })
    .catch(err => console.log(`Erro found: ${err}`))
}))

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`))