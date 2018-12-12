const express=require('express');
const hbs=require('hbs');
const os=require('os');
const fs=require('fs');
const user=os.userInfo();
const port=process.env.PORT || 3000;

var app=express();
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('screamIt',(text)=>
{
   return text.toUpperCase();
});
hbs.registerHelper('getCurrentYear',()=>
{
    return new Date().getFullYear();
});
app.set('view engine','hbs');
app.use((req,res,next)=>
{
    var now=new Date().toString();
    var log=`${now} By User-Id: ${user.username} Method:${req.method} Url:${req.url}`;
    console.log(log);
    fs.appendFile('Server.log',log+'\n',(err)=>
                 {
        if(err)
            {
                console.log('Unable to write on Log File');
            }
    });
    next();  
});
/*app.use((req,res,next)=>
{
    res.render('maintenance.hbs');
});*/
app.use(express.static(__dirname+'/public'));
app.get('/',(req,res)=>
{
    //res.send('<h1>hello express</h2>');
    /*res.send({
        name:"shahid",
        likes:["gadgets","games"]
    });*/
    res.render('home.hbs',{
        title:"My Home ",
        welcomeMsg:"Welcome to Node JS World"
    });
});

app.get('/about',(req,res)=>
{
    //res.send('<h1>hello express</h2>');
    //res.send("<h3>About site Information</h3>");
    res.render('about.hbs',{title:"My About Page"});
});
app.get('/bad',(req,res)=>
{
    res.send({errorMessage:"Unable to Connect Server"});
    
});
app.listen(port,()=>
          {
    console.log(`server is on ${port}`);
});

//set PATH=%PATH%;C:\Users\lcom131-one\AppData\Roaming\npm;
