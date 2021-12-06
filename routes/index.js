const { ObjectId } = require('bson');
var express = require('express');
var router = express.Router();
const {
  dbUrl,
  mongodb,
  MongoClient
} = require('../dbConfig')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.get('/jobs', async (req, res) => {
  // this is to get all the jobs 
  
  const client = await MongoClient.connect(dbUrl)
  try {
    const db = client.db("placements");
    let data = await db.collection("jobs").find().toArray();
    res.send({
      messege: "jobs fetched successfully!",
      data: data
    });
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }

});
router.get('/jobs/:id', async (req, res) => {
  // this is to get the jobs by id
  let id=req.params.id;
  const client = await MongoClient.connect(dbUrl)
  try {
    const db = client.db("placements");
    let data = await db.collection("jobs").findOne({_id:ObjectId(id)});
    res.send({
      messege: "job fetched successfully!",
      data: data
    });
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }

});
router.put('/jobs/:id', async (req, res) => {
  // this is to update the jobs by id
  let id=req.params.id;
  const client = await MongoClient.connect(dbUrl)
  try {
    const db = client.db("placements");
    let data = await db.collection("jobs").updateOne({_id:ObjectId(id)},req.body);
    res.send({
      messege: "job updated successfully!",
      data: data
    });
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }

});
router.post('/jobs', async (req, res) => {
  // this is to post the jobs by admin
  const client = await MongoClient.connect(dbUrl)
  try {
    const db = client.db("placements");
    let data = await db.collection("jobs").insertOne(req.body);
    res.send({
      messege: "job created successfully!"
    });
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }

});

router.delete('/jobs/:id', async (req, res) => {
  // this is to delete the jobs by id
  let id=req.params.id;
  const client = await MongoClient.connect(dbUrl)
  try {
    const db = client.db("placements");
    let data = await db.collection("jobs").deleteOne({_id:ObjectId(id)});
    res.send({
      messege: "job deleted successfully!"
    });
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }

});

//Students routes start

router.post('/create-students', async (req, res) => {
  // this is to create student signup in simplified way
  const client = await MongoClient.connect(dbUrl)
  try {
    const db = client.db("placements");
    let data = await db.collection("students").insertOne(req.body);
    res.send({
      messege: "job created successfully!"
    });
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }

});
router.post('/apply', async (req, res) => {
  // a student apply for a job
  // 1. job id from body
  // 2. student id from body
  // 3. map the student id in applied object of applicant in jobs db
  // 4. map the jobs id to the jobs field in student db


  let jobId=ObjectId(req.body.jobId);
  let id=ObjectId(req.body.id);

    const client = await MongoClient.connect(dbUrl)
  try {
    const db = client.db("placements");
    let data = await db.collection("jobs").findOne({_id:jobId});

<<<<<<< HEAD
   
=======
    
  
>>>>>>> 0c5d267ce131d72e89feea71e58a2eb3b4796fae
    data.applicants.applied.push(id);
    let update= await db.collection("jobs").updateOne({_id:jobId},{$set:{applicants:data.applicants}})

    let sData = await db.collection("students").updateOne({_id:id},{$push:{jobs:jobId}});
   // sData.jobs.push(jobId)
    //let sUpdate=await db.collection("students").updateOne({_id:id},{$set:{jobs:sData.jobs}})
    res.send({
      messege: "job created successfully!"
    });
  
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }

});
router.put('/reject', async (req, res) => {
  // a student apply for a job
  // 1. job id from body
  // 2. student id from body
  // 3. delete data from applied and add to rejected


  let jobId=ObjectId(req.body.jobId);
  let id=ObjectId(req.body.id);
    const client = await MongoClient.connect(dbUrl)
  try {
    const db = client.db("placements");
    let data = await db.collection("jobs").findOne({_id:jobId});
    data.applicants.rejected.push(id);
    data.applicants.applied.splice(data.applicants.applied.indexOf(id),1);
    let update= await db.collection("jobs").updateOne({_id:jobId},{$set:{applicants:data.applicants}})
    res.send({
      messege: "operation done successfully!"
    });
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }

});




module.exports = router;
