const PORT = 8000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express()


const newspapers = [
    {
        name: 'thetimes',
        address: 'https://www.thetimes.co.uk/environment/climate-change',
        base: ''
    },

    {
           name: 'guardian',
              address: 'https://www.theguardian.com/environment/climate-crisis',
              base: ''
    },
    {
         name: 'telegraph',
            address: 'https://www.telegraph.co.uk/climate-change',
            base: 'https://www.telegraph.co.uk'
    },
    {
              name: 'independent',
                    address: 'https://www.independent.co.uk/topic/climate-change',
                    base: 'https://www.independent.co.uk'
    },
    {
        name: 'dailymail',
        address: 'https://www.dailymail.co.uk/news/climate_change_global_warming/index.html',
        base: ''
    }
    ,
    {
         name: 'express',
            address: 'https://www.express.co.uk/latest/climate-change',
            base: 'https://www.express.co.uk'
    },
    {
            name: 'mirror',
                address: 'https://www.mirror.co.uk/all-about/climate-change',
                base: ''
    },
    { name: 'nytimes', address: 'https://www.nytimes.com/international/section/climate', base: 'https://www.nytimes.com' },
    { name: 'latimes', address: 'https://www.latimes.com/environment', base: 'https://www.latimes.com' },
    { name: 'washingtonpost', address: 'https://www.washingtonpost.com/climate-environment/', base: '' },
    { name: 'chicagotribune', address: 'https://www.chicagotribune.com/environment/', base: 'https://www.chicagotribune.com' },
    { name: 'bbc', address: 'https://www.bbc.com/news/science_and_environment', base: 'https://www.bbc.com' },
    { name: 'reuters', address: 'https://www.reuters.com/news/archive/climateChangeNews', base: 'https://www.reuters.com' },
    { name: 'apnews', address: 'https://apnews.com/hub/climate-change', base: 'https://apnews.com' },
    { name: 'npr', address: 'https://www.npr.org/sections/environment/', base: 'https://www.npr.org' },
    { name: 'cbc', address: 'https://www.cbc.ca/news/technology', base: 'https://www.cbc.ca' },
    { name: 'globalnews', address: 'https://globalnews.ca/environment/', base: 'https://globalnews.ca' },
    { name: 'nyp', address: 'https://nypost.com/tag/climate-change/', base: 'https://nypost.com' },
    { name: 'thesun', address: 'https://www.thesun.co.uk/topic/climate-change-environment/', base: 'https://www.thesun.co.uk' },
    { name: 'es', address: 'https://www.standard.co.uk/topic/climate-change', base: 'https://www.standard.co.uk' },
    { name: 'un', address: 'https://news.un.org/en/news/topic/climate-change', base: 'https://news.un.org' },
]

const articles = []

newspapers.forEach(newspaper => {
    axios.get(newspaper.address).then(response => {
       const html = response.data
       const $ = cheerio.load(html)

       $('a:contains("climate")',html).each(function() {
        const title = $(this).text().trim()
        const url = $(this).attr('href')
        
        articles.push({
            title,
            url: newspaper.base+url,
            source: newspaper.name
        })
    })
})
})

app.get('/', (req, res) => {
    res.json('Welcome to the Climate Change News API')
})


app.get('/news/:newspaperId',async (req,res)=>{
  const newspaperId = req.params.newspaperId
  const newspaperAddress =  newspapers.filter(newspaper => newspaper.name == newspaperId)[0].address
  const nbase =             newspapers.filter( newspaper => newspaper.name == newspaperId)[0].base
  axios.get(newspaperAddress).then(response => {
    const html = response.data;
    const $ = cheerio.load(html)
    const specificArticles = []
    $('a:contains("climate")',html).each(function() {
        const title = $(this).text().trim();
        const url = $(this).attr('href')
        specificArticles.push({
            title,
            url: nbase + url,
            source: newspaperId
        })
    })
    res.json(specificArticles)
  }).catch(err => console.log(err))
})

app.get('/news', (req, res) => {
   res.json(articles)

})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

