let http = require('http');
let express = require('express');
let path = require('path');
let request = require('request');
let bodyParser = require('body-parser');
let app = express();

let myInfo={
    'description': {
        'question': 'Tell me a little bit about yourself?',
        'answer': 'I am a Computer Science graduate. I am in search for the perfect job to learn and make a meaningful contribution using my skills. Before MS I was working as a professional full-stack and front end developer working on fleet amangement and healthcare projects.'
    },
    'tech': {
        'question': 'What excites you about technology?',
        'answer': 'Technology can and has solved so much in life, made it better. That is so very exciting. And as a software developer there is endless potential to learn. This unknown makes it much more exciting'
    },
    'techstack': {
        'question': 'What is your preferred technology stack?',
        'answer': 'I love working on Vanilla Javascript with HTML5 and CSS in the frontend. I love using C# for the middleware and am also liking my experience with node.js. For the backend, I am inclined towards MongoDB and MySQL'
    },
    'hobbies': {
        'question': 'What are your favorite hobbies?',
        'answer': 'I like learning new technologies and creating new stuff. This has helped me learn so much. Other than tech, I also love, writing poems, drawing and going on nature trails with friends.'
    }
};

app.set('views', path.join(__dirname,'views'));
app.set('view engine','pug');

app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
   res.render('index');
});

app.get('/posts',(req,res)=>{
    
    request.get("https://jsonplaceholder.typicode.com/posts", (error, response, body) => {
        if(error) {
            res.send(error);
        }
        let jsonData=JSON.parse(body);
        res.render('posts',{data: jsonData});
    });
});

app.get('/aboutme',(req,res)=>{
    res.render('allabout',{info: myInfo});
});


app.get('/aboutme/:q',(req,res)=>{
    if(myInfo[req.params.q]==undefined){
        res.status(404).send('Not Found');       
    }
    else if(req.params.q !== "" || req.params.q !== null || req.params.q!==undefined){
        res.render('about',{
            question: myInfo[req.params.q]['question'],
            answer: myInfo[req.params.q]['answer']
        });
    }
    else{
        res.render('allabout',{info: myInfo});
    }
});

app.use(function(req, res){
    res.status(404).send('Not Found');
});

app.listen(3000);
console.log('Listening on port 3000...');