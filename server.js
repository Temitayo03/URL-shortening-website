const express = require('express');
const generateSlug = require('./middlewares/generateSlug')
const path = require('path');
const fs = require('fs/promises');
const { readFile } = require('fs');

const port = 9000;

const app = express();
// const router = express.Router();
// const bodyParser = require("body-parser");

app.use(express.urlencoded({extended: true}));
app.use(express.static ('public'))
app.use(express.json());
// app.use("/", router)
// app.use(bodyParser());


app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname,"/urls.html"))
});

app.get('/:slug', async(req, res)=>{
    // read from the data.json 
    let sluglinks
    try {
        
        sluglinks = await fs.readFile(path.resolve('data.json'), 'utf8');
        sluglinks = JSON.parse(sluglinks);
    } catch (error) {
        sluglinks = [];
    }

    let match = sluglinks.find((item)=>{
        return item.slug === req.params.slug
    });

    if(match){
        return res.redirect(match.originalURL)
    }

    res.status(404).send();

})

app.post('/short',generateSlug, async (req, res)=>{
    // open data.json to retrieve former data
    let data;
    try {
        let data = await fs.readFile(path.resolve('data.json'), 'r', 'utf8');
        data = JSON.parse(data);
    } catch (error) {
        data = [];
    }
    // create the new url object
    let link = {
        originalURL: req.body.linkShorten,
        slug: req.slug,
        shortURL: `${req.protocol}://${req.get('host')}/${req.slug}`
    }
    data.push(link);
    await fs.writeFile(path.resolve('data.json'), JSON.stringify(data),'utf8')
    console.log(req.body);
    console.log(req.slug);
    res.status(200).json(link);
    

})



// app.get('/',(req, res)=>{
//     res.sendFile(path.resolve('urls.html'))
// })

app.listen(port, ()=>{
    console.log(`server is running on http://localhost:${port}`)
})


