# ion-energy-thermo
 Assignment for Ion Energy

Steps to install

1. Clone repo to your local machine
2. Install dependencies by "npm i" in root as well as client folders - make sure to install dev dependencies
3. Start Mongo instance on port 27017
4. Load file to Mongo collection by going to "<mongo-install-dir>/bin" then run following command
./mongoimport --db thermo --collection thermodata --drop --jsonArray --file ~/<path>/THERM0001.json
5. Start the app by going to root folder then run "npm run dev" - Both Server and client will be started in the same terminal