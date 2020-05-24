let express=require("express")
let app=express()
let bodyParser=require("body-parser")
let session=require("express-session")

// notre moteur de template

app.set('view engine','ejs')

// l'utilisation des sessions

app.use(session({

    secret: '123456',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }

}))

// paramétrage de l'accès aux fichiers statiques

app.use('/assets',express.static('public'))

// les middleWares

app.use(bodyParser.urlencoded({ extended: false }))

// notre propre middleWare

app.use(require('./middlewares/flash'))


// les routes

app.get('/', (request,response)=>{
    let Message=require('./models/message')
    Message.all(function(callBack) {
       response.render("pages/index",{messages: callBack})
    })
})

app.post('/', (request,response)=> {
    
    if(request.body.message === undefined || request.body.message === ''){
        request.flash('error',"vous n'avez pas posté de message")
        response.redirect('/')
                
    }
    else {

        let Message=require('./models/message')
        Message.create(request.body.message,function () {
          request.flash('success',"message enregistré en base de données")  
          response.redirect('/')

        })
    }

    
        
})

app.listen(8080)
