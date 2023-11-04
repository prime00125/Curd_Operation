module.exports = (req,res) =>{
    const baseUrl = req.url.substring(0, req.url.lastIndexOf("/")+1);
    console.log(baseUrl)
    let id= req.url.split("/")[3];
    const regexV4 = new RegExp( /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)


    if(req.url === "/api/movies"){

        res.statusCode = 200;
        res.setHeader("content-tyoe","application/json")
        res.write(JSON.stringify(req.movies));
        res.end();

    }
    else if(!regexV4.test(id))
    {
        res.writeHead(400,{"content-type": "application/json"})
        res.end(JSON.stringify({
            title : "Validation Falied",
            message : " UUID is not a valid "
        }))
    }
    else if(baseUrl === "/api/movies/" && regexV4.test(id))
    {
        
        res.setHeader("content-tyoe","application/json")
        let filteredMovies = req.movies.filter((movie) =>{
            return movie.id === id;

        })
          if(filteredMovies.length > 0)
          {
            res.statusCode = 200
            res.write(JSON.stringify(filteredMovies));
            res.end();
          }
          else
          {
            res.statusCode = 404;
            res.write(JSON.stringify({title:"NOT FOUND", message : "movie not found"}))
            res.end();
          }
    }
    else 
    {
        res.writeHead(404,{"content-type":"application/json"});
res.end(JSON.stringify({title:"Not found",message :"route not found"}));
    }
    
}