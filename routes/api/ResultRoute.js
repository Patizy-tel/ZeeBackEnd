const express = require('express');
const Patient =  require('../../models/myresults');
const verify =  require('./auth/Veryfy')
const router = express.Router();



router.get('/a',(req,res)=>{

    Patient.find({productName:'product A'})
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
    Patient.find({productName:'product B'})
        .sort({year:1})
        .then(resp=>{
        
            res.status(200).send(resp)
        })
        .catch(err=>{
            res.status(404).send({err:err.message})
        })
})


router.get('/c',(req,res)=>{
    Patient.find({productName:'product C'})
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
         
         return   resultC.push(y.result);

        });

    });

    await Patient.find({productName:'product C'}).sort({year:1}).then(resp =>{
        resp.map(y=>{
          return  myYears.push(y.year);


        });

    });

    await Patient.find({productName:'product A'}).sort({year:1}).then(resp =>{
        resp.map(y=>{
          
           return resultA.push(y.result);

        });

    });



   await Patient.find({productName:'product B'}).sort({year:1}).then(resp =>{
        resp.map(y=>{
         return   resultB.push(y.result);

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

      
        var result = Number(req.body.income  - req.body.expense) ;

        let finalBody={

             productName:req.body.productName,
             income:req.body.income,
             expense:req.body.expense,
             year:req.body.year,
             result:result

             
        }


        new Patient(finalBody).save()
        .then(resp=>{
            res.status(200).send(resp)
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