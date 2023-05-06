# Wellin Task

* install node packages  command : npm i
* data base connection string in env file  DB_URL=”postgres://zvqaitlw:zcriYwNqYUeqiipr75FFW57CBedr6gh3@lallah.db.elephantsql.com/zvqaitlw”
* create tables in postgresSQL  command : npm run knex:migrate:make <filename>
* add dummy data into tables  command : npm run seed
* run server command : npm start
* APIs end points :
	signup users    :  “http://localhost:5000/signup”
	payload:    username  :  ””
			    password  :  ”” 
		
	Signin users    :  “http://localhost:5000/signup”
	payload:    username  :  ””
			    password  :  ”” 

	userslist       :  “http://localhost:5000/userlist”
	payload:    cookie


* run app : npm run start	