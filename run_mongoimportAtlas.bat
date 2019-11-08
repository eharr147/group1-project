rem Assuming MongoDb is installed to C:\Program Files\MongoDB\Server\4.2\bin
rem Change the directory if your installation is different
"C:\Program Files\MongoDB\Server\4.2\bin\mongoimport" --file "mock_recipes.json" --uri "mongodb+srv://egladsto:IT6203project@group1-project-hshbd.mongodb.net/dbIT6203" --collection Recipes
