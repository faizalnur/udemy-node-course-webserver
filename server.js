const express = require("express");
const hbs = require('hbs');
const fs = require('fs');

var app =express(); 

hbs.registerPartials(__dirname+'/views/partials');

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screenIt',(text)=>{
    return text.toUpperCase();
})
app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;
    console.log(log); 
    fs.appendFile('server.log',log + '\n' , (err)=>{
        if (err){
            console.log('unable to append to server.log.');
        }
    });
    next(); 
});
app.use((req,res,next)=>{
    res.render('maintenance.hbs');
})
app.get('/',(req,res)=>{
       // res.send('<h1>Hello Express!</h1>');
       res.render('home.hbs',{
            bar:'this is bar',
            pageTitle:'Home Page',
           name : "Faizal",
           likes:[
               'Biking',
               'Cities'
           ],
       })
});

app.get('/about',(req,res)=>{
    //res.send('about page');
    res.render('about.hbs',{
        bar:'this is bar',
        pageTitle:'About Page'
    });
});
// app.get('/maintenance',(req,res)=>{
//     //res.send('about page');
//     res.render('maintenance.hbs',{
//         bar:'this is maintenance',
//         pageTitle:'maintenance Page'
//     });
// });
//bad -send back
app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:'unable to handle request'
    });
}) 

app.listen(3000,()=>{
    console.log('Server is up on port 3000');
});