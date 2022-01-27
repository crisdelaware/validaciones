const express = require('express')
const app = express()
const {body, validationResult} = require('express-validator')
app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res)=>{
    res.render('index')
})

app.post('/registrar', [
    body('nya', 'Ingrese un nombre y apellido completo')
        .exists()
        .isLength({min:5})
        .isString(),
    body('sueldo', 'Ingrese un sueldo valido')
        .exists()
        .isFloat({min:5186.10, max:36302.70}),
    body('horas', 'Ingrese un hora valida')        
        .exists()
        .isFloat({min:8, max:16}),
], (req, res)=>{
    //Validación de la documentación oficial
    /* const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      console.log(errors)
    } */

    //validación propia    
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log(req.body)
        const valores = req.body
        const validaciones = errors.array()
        res.render('index', {validaciones:validaciones, valores: valores})
    }else{
        res.send('¡Validación Exitosa!')
    }
})
app.listen(3000, ()=>{
    console.log('SERVER UP en http://localhost:3000')
})
