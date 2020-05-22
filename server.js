let express=require("express")
let app=express()
let bodyParser=require("body-parser")

// notre moteur de template

app.set('view engine','ejs')

// paramétrage de l'accès aux fichiers statiques

app.use('/assets',express.static('public'))

// nos middleWares

app.use(bodyParser.urlencoded({ extended: false }))

// les routes

app.get('/', (request,response)=>{

    response.render("pages/index",{test: "salut"})

})

app.post('/', (request,response)=> {
    
    if(request.body.message === undefined || request.body.message === ''){

        // response.render("pages/index",{erreur : "vous n'avez pas saisi de message"})
        response.redirect('/')

    }
    
})

app.listen(8080)
