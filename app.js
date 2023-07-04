require("dotenv").config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

const app = express();
const port =80;

//mongoose.connect(process.env.MONGO_URL);
mongoose.connect('mongodb://127.0.0.1:27017/MPAExcel');
const ContactSchema = new mongoose.Schema({
  Category: String,
  Type: String,
  Item_Description: String,
  OEM: String,
  RDSO_Specification_no: String,
  RDSO_Approval_Status: String,
  Drawing_Datasheet: String,
  Status_of_Drawing_DataSheet: String
});

const contact = mongoose.model('contact', ContactSchema);

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Set the view engine (assuming you're using Pug)
app.set('view engine', 'pug');

// Rest of your server configuration and routes


app.use('/static', express.static('static'));
app.use(express.urlencoded());

app.get('/', async (req, res) => {
  

    try {
      const contacts = await contact.find({});
    
      // Preprocess the contacts data to extract unique categories
      const uniqueCategories = Array.from(new Set(contacts.map(contact => contact.Category)));
    
      res.render('home.pug', { uniqueCategories });
    } catch (err) {
      res.status(500).send('An error occurred while fetching data from the database');
    }
    
    
  });
  
  app.get('/home', async (req, res) => {
  

    try {
      const contacts = await contact.find({});
    
      // Preprocess the contacts data to extract unique categories
      const uniqueCategories = Array.from(new Set(contacts.map(contact => contact.Category)));
    
      res.render('home.pug', { uniqueCategories });
    } catch (err) {
      res.status(500).send('An error occurred while fetching data from the database');
    }   
  });

  app.get('/contact', async (req, res) => {
    try {
      const selectedCategory = req.query.category;
      const data = await contact.find({ Category: selectedCategory });
      res.render('itemList.pug', { selectedCategory, items: data });
    } catch (err) {
      res.status(500).send('An error occurred while fetching data from the database');
    }
  });

  app.get('/details', async (req, res) => {
    try {
      const itemId = req.query.id;
      const item = await contact.findById(itemId);
      if (!item) {
        return res.status(404).send('Item not found');
      }
      res.render('details.pug', { item });
    } catch (err) {
      res.status(500).send('An error occurred while fetching item details from the database');
    }
  });
  
  
  
  app.get('/about', (req, res) => {
    const params = {};
    res.status(200).render('about.pug', params);
  });
  
  app.get('/service', (req, res) => {
    const params = {};
    res.status(200).render('service.pug', params);
  });

  app.get('/class', (req, res) => {
    const params = {};
    res.status(200).render('class.pug', params);
  });
  
  app.post('/contact', (req, res) => {
    var myData = new contact(req.body);
    myData
      .save()
      .then(() => {
        res.send('This item has been saved to the database');
      })
      .catch(() => {
        res.status(400).send('Item was not saved to the database');
      });
  });
  
  app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
  });
  
contact
.find({})
.then((data) => {
  console.log('Fetched data:', data);
})
.catch((err) => {
  console.error('Error fetching data:', err);
});