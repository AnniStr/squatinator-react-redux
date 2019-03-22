# ws18-squatinator

# install dependencies
\ws18-squatinator ~ npm install // install server dependencies
\ws18-squatinator ~ npm run client-install // install client dependencies

# start local mongoDB Windows
\ws18-squatinator ~ mkdir mongo-data (if not exists)
cd 'C:\Program Files\MongoDB\Server\4.0\bin'
'C:\Program Files\MongoDB\Server\4.0\bin' ~ .\mongod.exe --dbpath <path>\ws18-squatinator\mongo-data

# start mongoDB on linux/mac
cd
sudo fuser -k 27017/tcp
mongod --dbpath <path>/ws18-squatinator/mongo-data

# start server & client
\ws18-squatinator ~ npm run dev // starts both server and client


// mongod --dbpath HdM_Projects/ws18-squatinator/mongo-data
// .\mongod.exe --dbpath C:\Users\Julia\Desktop\GIT\ws18-squatinator\mongo-data


