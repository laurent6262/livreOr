let express=require("express")
let app=express()

app.set('view engine','ejs')

app.get('/', (request,response)=>{

    response.render("pages/index",{test: "salut"})

})

app.listen(8080)
