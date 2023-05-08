# Wellin Task

* Install Node Packages  
	command  **npm i**
* DataBase Connection String  
	**postgres://zvqaitlw:zcriYwNqYUeqiipr75FFW57CBedr6gh3@lallah.db.elephantsql.com/zvqaitlw**
* To Create Migrations in postgresSQL  
	command  **npm run knex:migrate:make <filename>**
* To Create Seed 
	command **npm run seed**
* To Start the Server 
	command **npm start**
* APIs end points :
	1. For SignUp
		User is able to signup using the username and password
			URL **http://localhost:5000/signup**
			payload username
				    password
	
	2. For SignIn 	
		User is able to signin using username and password
			URL **http://localhost:5000/signin**
			payload username
			   		password  

	3. For UserList 
		Showing the UserList to Authenticated User
			URL **http://localhost:5000/userlist**
			payload	cookie


* To Run application
	command **npm run start**