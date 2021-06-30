const express = require('express');
const Patient =  require('../../models/myresults');
const verify =  require('./auth/Veryfy')
const router = express.Router();



router.get('/a',(req,res)=>{

    Patient.find({productName:'Akribos Securities'})
        .sort({year:1})
        .then(resp=>{
            console.log(resp)
        
            res.status(200).send(resp)
        })
        .catch(err=>{
            res.status(404).send({err:err.message})
        })
});

router.get('/b',(req,res)=>{
    Patient.find({productName:'Akribos Realised Gain'})
        .sort({year:1})
        .then(resp=>{
        
            res.status(200).send(resp)
        })
        .catch(err=>{
            res.status(404).send({err:err.message})
        })
})


router.get('/c',(req,res)=>{
    Patient.find({productName:'Akribos Wealth'})
        .sort({year:1})
        .then(resp=>{
        
            res.status(200).send(resp)
        })
        .catch(err=>{
            res.status(404).send({err:err.message})
        })
})



 router.get('/forgraph' ,async (req   ,res ) =>{

    let  myYears = [];
    let resultA = [] ;
    let resultB = [];
    let resultC = [];

    // push Dates ;

   await Patient.find({productName:'product C'}).sort({year:1}).then(resp =>{
        resp.map(y=>{
         
         return   resultC.push(y.optimalcompany);

        });

    });

    await Patient.find({productName:'product C'}).sort({year:1}).then(resp =>{
        resp.map(y=>{
          return  myYears.push(y.year);


        });

    });

    await Patient.find({productName:'product A'}).sort({year:1}).then(resp =>{
        resp.map(y=>{
          
           return resultA.push(y.optimalcompany);

        });

    });



   await Patient.find({productName:'product B'}).sort({year:1}).then(resp =>{
        resp.map(y=>{
         return   resultB.push(y.optimalcompany);

        });

    }).then(()=>{

        res.send({resultA,resultB,resultC, myYears})


    });




 })




router.post('/', async (req,res)=>{

    let dup =  await Patient.find({productName:req.body.productName  , year:req.body.year});



    if (dup.length >0){

        res.status(404).send({msg:'double records arent allowed'})
    }else{


        var m = 3 ;
        var c = Number((req.body.income)+ (req.body.income1) +(req.body.income2))/m
    
        var dA =  Number(c/req.body.income) ;
        var dB =Number(c/req.body.income1)
        var dC = Number(c/req.body.income2)
      

        var fA = Number(dA*req.body.income + c )
        var fb = Number(dB*req.body.income1 + c)
        var Fc = Number(dC*req.body.income2 + c)




        var result1a =  Number(((1-m)+ fA*((1/fA)+(1/fb)+(1/Fc)))/((fA)*((1/fA)+(1/fb)+(1/Fc)))) *100;
        var result1b = Number(((1-m)+ fb*((1/fA)+(1/fb)+(1/Fc)))/((fb)*((1/fA)+(1/fb)+(1/Fc)))) *100;
        var result1c = Number(((1-m)+ Fc*((1/fA)+(1/fb)+(1/Fc)))/((Fc)*((1/fA)+(1/fb)+(1/Fc)))) *100;


        var result2a =  Number(1/(fA*((1/fA)+(1/fb)+(1/Fc)))) *100;
        var result2b =  Number(1/(fb*((1/fA)+(1/fb)+(1/Fc)))) *100;
        var result2c =  Number(1/(Fc*((1/fA)+(1/fb)+(1/Fc)))) *100;






        let finalBody={

             productName:req.body.productName,
             income:req.body.income,
             expense:req.body.expense,
             optimalcompany:result1a,
             optimalMarket:result2a,
             year:req.body.year,
            
       
        };

        let finalBody1={

            productName:req.body.productName1,
            income:req.body.income1,
            expense:req.body.expense1,
            optimalcompany:result1b,
            optimalMarket:result2b,
            year:req.body.year,
            

      
       }

 

       let finalBody2={

        productName:req.body.productName2,
        income:req.body.income2,
        expense:req.body.expense2,
        optimalcompany:result1c,
        optimalMarket:result2c,
        year:req.body.year,
     
  
   }



        new Patient(finalBody).save()
        .then(()=>{
           
            new Patient(finalBody1).save().then(()=>{



                new Patient(finalBody2).save().then((resp)=>{


                    res.status(200).send(resp);



                })



                
            })


        })
        .catch(err=>{
            console.log(err)
            res.status(404).send({err:err.message})
        })


    }
   
})

router.delete(`/:_id`,(req,res)=>{
    let id  =  req.params._id ;
    console.log('found the id' + id)
    Patient.findByIdAndDelete(id)
           .then(resp=>{
               console.info(resp);
               res.status(200).send(resp)
           })
           .catch(err=>{
               console.log(err)
               res.status(400).send(err.message)
           })

}) ;


router.get('/report/:year' ,(req,res) =>{


    let findYr = req.params.year ;

    Patient.find({year:findYr})
           .then(resp=>{
             res.status(200).send(resp)
           }).catch(err =>{

            res.status(404).send(err.message)
           })








})



router.post(`/:_id`,(req,res)=>{
    let id  =  req.params._id ;
    console.log('found the id' + id)
    Desktop.findByIdAndUpdate(id,req.body)
           .then(resp=>{
               console.info(resp);
               res.status(200).send(resp)
           })
           .catch(err=>{
               console.log(err)
               res.status(400).send(err.message)
           })   

})



 



module.exports = router