let express=require("express")
let app=express()
let bodyParser=require("body-parser")
let session=require("express-session")

// notre moteur de template

app.set('view engine','ejs')

// paramétrage de l'accès aux fichiers statiques

app.use('/assets',express.static('public'))

// nos middleWares

app.use(bodyParser.urlencoded({ extended: false }))

// l'utilisation des sessions

app.use(session({

    secret: '123456',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }

}))


// les routes

app.get('/', (request,response)=>{

    if(request.session.erreur) {
        response.locals.erreur = request.session.erreur
        request.session.erreur=undefined
    }

    response.render("pages/index")
   

})

app.post('/', (request,response)=> {
    
    if(request.body.message === undefined || request.body.message === ''){

        // response.render("pages/index",{erreur : "vous n'avez pas saisi de message"})
        // response.redirect('/')
        request.session.erreur="vous n'avez pas saisi de message"
        response.redirect('/')
    }

        
})

app.listen(8080)
