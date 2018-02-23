//-----------------Require-----------------------------------
var express= require('express');
var firebase= require('firebase-admin');
var bodyParser= require('body-parser');
var multer=require('multer');
var cloudinary=require('cloudinary');
var app_password='123';
var method_override=require("method-override");
//-----------------------------------------------------------

//--------------------Cloudinary----------------------

cloudinary.config({
	cloud_name:"yosmangel",
	api_key:"554418636671536",
	api_secret:"fyKdgveCnk1ywE4UrM6_X79JmZE"
});

var app=express();

//-------------------Use----------------------------------
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(method_override("_method"));
var uploader = multer({dest: "./uploads"});
var middleware_upload = uploader.single('image_avatar');

//-----------------------------------------------------------



//-------------------Iniciar BD--------------------------------------
firebase.initializeApp({
		
  	serviceAccount: {
    	projectId: "primera-4192e",
  		client_email: "editorprimera@primera-4192e.iam.gserviceaccount.com",
  		private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDC1FEtPSmlmARn\nvp4Izi9OafKLrqJ1+MbTv6MPNnKhX+LNBpf4Cikw5mY3kfWDC6OmsisC5gxMa884\nZMAAULKrrjRPyoza7lIuGnyj1hSqPxYrDYM9kkBTvuE0/lJgx/TdH/GLpQmI3rsN\nh4UX6tmFbMxWP5M6k+HEVKv2yXVULeFUrDx2LLizICrs8+os9k8GlLIZGnuAI3F9\nW9vl3hiVt3we0GjBcERKgvSMfn8xPv+Q75jfdyhp+T1Fgwsk1tOcMf46iQp6S7o1\nXnLSWbM0cOEzji3aa8haIXYK2vuL/qENz6KxDPsiPXkQ94PqZukgisdGWJP2XbrA\nZImr4OO/AgMBAAECggEBALM75e4rXVv07OCQMQzCuix2NWchYl4LXsbAfv7oxS4G\nazzYuwe6OUi+PP0Ubvt+wrABKqaBAoFvkPQ9Y5EmrCham89n9IsYQkwdm9qRgPNa\nFEfJJ5qGKF2itcYtzZUxfufKkkk4q/vZg9WffeaR7Ejd3WHfHM//6evXRVhE34Zv\nDUVk/Qb5yh0W0AK7k1hHLp57OxdCzADpqG/pfdiiF2Vvzk6c+1LzlkdHPvWyJSxe\n/u6Rpwpt5S2tXC7wMmrCtDudO0j++JttFSK43nPZe2ZbWa76HdXGU+uZDuyDChc1\ndBht4FPf7wAPMIQVfUwEOVKFJPupcACx1574kgWZ3bkCgYEA+nnwdoUvZMGYtqP7\n2duWCvOOP5GGvrvj1aqUzoHoT1LtTiNqq+TaDJcYI2LLXfUDUaktnQECr/ec5DrS\nN9yyYj9mtfsatVVShs7XIjrlJulOubXXRrDVL61Hg+b1vrfd0CR/gV+1TNwCvPMy\ndyN4DLeqbx/1TEaqUhlYHk5IaiMCgYEAxyA5P0O6tOYZWDqaH4/YpZL22WA6rdnz\nm1L6wxM+FX0IREwvrDnQXu5O3Te9tRTULyqGV0cwWjdsRoK4qpMrgiD9ix0tRHfp\nzm8XxzlOr0pRuQygGjR4YwoDuIOrh+pF/Tg7C5DwZ2/nYci/D7NSjZdFba/V7f73\nmFujL0ux07UCgYBOKHKyaQjK5eYjR7Q03OJK9Ij0qRJkvfhwGdRpQ/wblILcGQ0W\nKkkoGJW9pPxUiznH54SGM2SFSDy6sugZ6lH3elUwf/RrlP41dqGG2t3acH7SUD2m\nn1NGl0lzjUQtiO48HsdytUy7eQOZtkGPD5BMV5tlJZHDhWFsUOBARKkwBQKBgGM+\nDSoZwHkeYS1W76+hSrGi4IKQck5pXP9hyPbmpT+idDdN3Uix+8cEcKvSdytD+UiU\noiXnphKgosc1qYHiHYIanSLzZLdGKHIpbiltx2iX2skmoLjOw91ghWA1x4zS1xUQ\nLGVkVFzJKgHTQl452oAVD5ZOV4npVE9MBLWyvSstAoGAGzdLfdjGRoxyuGO43Vgi\nJI6CJh9oGAJE7FSwBJlBO54p+LD2bRi00bp8A8jI3b9Dkvmkue2UzV7Esso1lixh\nsTMjNeAz+WlH/tOmWLqL6V/YtuYlRWCK7pm3XrRIQqZMYAnm0N8Ty5cUECrnMJX9\nxXaxVp5LrMnPtY2tuiaHWCA=\n-----END PRIVATE KEY-----\n",
  	},
  	databaseURL: "https://primera-4192e.firebaseio.com"

});

//------------------------------------------------------------------

app.set("view engine","jade");

 

//---------------------Peticiones GET-------------------------------
app.get("/",function(req,res){


	res.render("index");	
});

app.get("/menu/new",function(req,res){

	res.render("menu/new");
});

app.get("/menu",function(req,res){
	
	var datos=firebase.database().ref('productos');
	datos.on('value',function(snapshot){
		console.log(snapshot.val());
		var productos=snapshot.val();
 		res.render("menu/index",{productos});
	});
  	
	});

app.get("/contacto",function(req,res){
	
	res.render("contacto");
	
  	
	});
app.get("/admin",function(req,res){

	res.render("admin/form");
});

app.get("/menu/edit/:id", function(req,res){

	var id_producto=req.params.id;
	var datos=firebase.database().ref('productos/'+id_producto);
		datos.on('value',function(snapshot){
		console.log(snapshot.val());
		var productos=snapshot.val();
 		res.render("menu/edit",{productos,id_producto});
	});


});
//------------------------------------------------------------------

//-------------------------Peticiones PUT--------------------------


app.put("/menu/:id",middleware_upload, function(req,res){
	if(res.body.password==app_password){
		var id_producto=req.params.id;
		console.log("--------------- "+(JSON.stringify(req.body)));
		var datos=firebase.database().ref('productos/'+id_producto);
			datos.update(
					  {"decription": req.body.description,
					  			   "pricing":req.body.pricing,
					  			   "title":req.body.title
					  			   
					 			   
					  }
					 );
	 	res.redirect("/menu");

	}else{
		res.redirect("/");
	}
	
	
});



//---------------------Peticiones POST------------------------------
app.post("/admin",function(req,res){

	if(req.body.password==app_password){
		var datos=firebase.database().ref('productos');
		datos.on('value',function(snapshot){
		console.log(snapshot.val());
		var productos=snapshot.val();
 		res.render("admin/index",{productos});
	});
	}else{
		res.redirect("/");
	}
});

app.post("/menu",middleware_upload,function(req,res){
	if(req.body.password==app_password){
		var postData={
		title: req.body.title,
		decription: req.body.description,
		imageURL:"laruta",
		pricing:req.body.pricing
		};

		if(req.file){
			cloudinary.uploader.upload(req.file.path, 
				function(result) { 
	  				console.log(result);
	  				postData.imageURL=result.url;
	  				var newpost= firebase.database().ref().child('product').push().key;
					var updates = {};
			  		updates['/productos/' + newpost] = postData;
			  		firebase.database().ref().update(updates);
					res.render("index");

			});
		}
		
	}else{
		console.log(req.body);
		res.render("menu/new");
	}
	
});


//------------------------------------------------------------------
app.listen(8080);

