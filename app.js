const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const bodyParser= require( 'body-parser') ;
const path =require('path');
const sql= require('mssql');

app.use(bodyParser.urlencoded({extended:false}));
app.use( express.urlencoded({
    extended:true
}))

app.use(express.json({
    type:"*/*"
}))
app.use(cors());
app.get('/', (req,res)=> {
  res.send('app js apiii')
});
app.post('/nuevaPersona', (req,res)=> {
  res.send('me hicieron un post')
});
app.listen(()=>{
  console.log(`estoy ejecutandome en https://localhost:${port}`)
  

})

//app.post('/transaccion',createNewPersona);//llamo a createNewPerson

//--------------------------------------import sql from 'mssql'


const DBconfig = {
    user : 'root',
    password: 'password123',
    server: 'LAPTOP-CVBG9SDJ',
    database: "DB_UTN",
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 3000
    },
    options: {
        encrypt: false, 
        trustServerCertificate: true
    }, 
    port:52157
};
//-----------
const getConnection = new sql.ConnectionPool(DBconfig)  
.connect()  
.then(pool => {  
console.log('Connected to MSSQL')  
return pool  
})  
.catch(err => console.log('Database Connection Failed! Bad Config: ', err))  
module.exports = {  
sql, getConnection  
}  



const queries = {
  
    addNewProduct: 'INSERT INTO [DB_UTN].[dbo].[ISMST_PERSONAS] (COD, NOMBRE, DIRECCION,LOCALIDAD) VALUES (@cod,@nombre,@direccion,@localidad);',
    getPers:'SELECT * FROM [DB_UTN].[dbo].[ISMST_PERSONAS]' 
};
//------------------
const createNewPerson = async (req, res) => {
  try{
      console.log(req)
      const cod=req.body.cod;
    const nombre=req.body.cod;
    const direccion=req.body.cod;
    const localidad=req.body.cod;
      const pool = await  getConnection();
      if (direccion == null || nombre == null || cod == null || localidad == null) {
        return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
      }

      console.log('valor de cod:  ' + cod)
      const result = await pool.request()
      
      .input("transaccionCod", sql.Text(10), cod)
        .input("transaccionNombre", sql.Text(70), nombre)
        .input("transaccionDireccion", sql.Text(100), direccion)
        .input("transaccionLocalidad", sql.Text(10), localidad)
        .query(queries.addNewProduct);

      console.log(result)
      res.send(result.recordset[0])
      console.log(cod)
      console.log(nombre)
      console.log(direccion)
      console.log(localidad)
      console.log(result)

  }catch(error){
      res.status(500)
      res.send(error.message)
  }
}
//------------
/*
const createNewPersona = async (req,res) => {
  console.log('me llego algooo')
    const cod=req.body.cod;
    const nombre=req.body.cod;
    const direccion=req.body.cod;
    const localidad=req.body.cod;
  //const { cod, nombre, direccion, localidad } = req.body;
    //let { quantity } = req.body;
  
    // validating
    if (direccion == null || nombre == null || cod == null || localidad == null) {
      return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
    }
  
    if (quantity == null) quantity = 0;
  
    try {
      const pool = await getConnection();
  
      await pool
        .request()
        .input("transaccionCod", sql.Text(10), cod)
        .input("transaccionNombre", sql.Text(70), nombre)
        .input("transaccionDireccion", sql.Text(100), direccion)
        .input("transaccionLocalidad", sql.Text(10), localidad)
        //.input("quantity", sql.Int, req.body.quantity)
        .query(queries.addNewProduct);
  
      res.json({ cod, nombre, direccion, localidad });
      res.send('${cod,nombre,direccion,localidad}');
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }


  };*/
  const getPersona = async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool.request().query(querys.getPers);
      res.json(result.recordset);
     
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };



//app.post('/nuevaPersona', createNewPersona);
/*app.post('/nuevaPersona',(req,res)=>{
  console.log(`dato cargado en el formulario ${req.body.cod}`)
  createNewPerson(req.body.cod,req.body.nombre,req.body.direccion,req.body.localidad,res)
  
})    
app.get('/mostrarPers',(req,res)=>{
getPersona(req,res)
});//http://localhost:3000/mostrarPers

*/
