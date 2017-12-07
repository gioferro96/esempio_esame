const express = require('express');

var bodyParser = require('body-parser');


var port = process.env.PORT || 8080;
let fake_db = [];
const app = express();
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({extended: true})); 


app.post("/assignment",(req,res)=>{
	let student_id = req.body.student_id;
	let assignment_id = req.body.assignment_id;
	let assignment_content = req.body.assignment_content;
	let assignment_type = req.body.assignment_type;
	let tmp = {};
	tmp["student_id"] = student_id;
	tmp["assignment_id"] = assignment_id;
	tmp["assignment_content"] = assignment_content;
	tmp["assignment_type"] = assignment_type;
	console.log(tmp);
	if(student_id&&assignment_id&&assignment_type&&assignment_content){
		fake_db.push(tmp);
		res.send("New assignment created!");
	}
	else
		res.send("Errore inserimento");
	
});

app.get("/assignment/:student_id/:assignment_id",(req,res)=>{
	let student_id = req.params.student_id;
	let assignment_id = req.params.assignment_id;
	let tmp = {};
	for(let i = 0; i < fake_db.length; i++){
		if((fake_db[i]["student_id"] == student_id)&&(fake_db[i]["assignment_id"] == assignment_id)){
			tmp = fake_db[i];
		}
	}
	if(tmp)
		res.send("Ecco l'assignment "+tmp["assignment_id"]+" di "+student_id+":\n"+tmp["assignment_content"]);
	else
		res.send("Errore");
});

app.get("/assignment",(req,res)=>{
	if(fake_db)
		res.send(fake_db);
	else
		res.send("Errore");
});


app.put("/assignment/:student_id/:assignment_id",(req,res)=>{
	let student_id = req.params.student_id;
	let assignment_id = req.params.assignment_id;
	let new_student_id = req.body.student_id;
	let new_assignment_id = req.body.assignment_id;
	let new_assignment_content = req.body.assignment_content;
	let new_assignment_type = req.body.assignment_type;
	let tmp = {};
	for(let i = 0; i < fake_db.length; i++){
		if((fake_db[i]["student_id"] == student_id)&&(fake_db[i]["assignment_id"] == assignment_id)){
			tmp["student_id"] = new_student_id;
			tmp["assignment_id"] = new_assignment_id;
			tmp["assignment_content"] = new_assignment_content;
			tmp["assignment_type"] = new_assignment_type;
			fake_db[i] = tmp;

		}
	}
	if(tmp)
		res.send("Ecco il nuovo assignment "+tmp["assignment_id"]+" di "+new_student_id+":\n"+tmp["assignment_content"]);
	else
		res.send("Errore");
});

app.delete("/assignment/:student_id/:assignment_id",(req,res)=>{
	let student_id = req.params.student_id;
	let assignment_id = req.params.assignment_id;
	let found = false;
	for(let i = 0; i < fake_db.length; i++){
		if((fake_db[i]["student_id"] == student_id)&&(fake_db[i]["assignment_id"] == assignment_id)){
			found = true;
			fake_db.splice(i,1);
		}
	}
	if(fake_db&&found)
		res.send("Elemento eliminato");
	else if (!found)
		res.send("Assignment non presente");
	else
		res.send("Errore");
});



app.listen(port);
console.log("Server started on port " + port);