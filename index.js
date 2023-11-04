const http = require("http");
const getReq= require("./method/getReq");
const putReq = require("./method/putReq");
const postReq = require("./method/postReq");
const deleteReq = require("./method/deleteReq");
let movies = require("./data/movies.json");

const PORT =  5001;
const server = http.createServer((req, res) => {
    req.movies = movies;
  switch (req.method) {
    case "GET":
      getReq(req, res);
      break;
    case "POST":
      postReq(req, res);
      break;
    case "PUT":
      putReq(req, res);
      break;
    case "DELETE":
      deleteReq(req, res);
      break;
    default:
   
        res.writeHead(404,{"Content-type":"application/json"});
        res.write(JSON.stringify({title:"Error",message:"Something went wrong"}))
        res.end();

  }
});



server.listen(PORT, () => {
  console.log(`Server is started on : ${PORT}`);
})
