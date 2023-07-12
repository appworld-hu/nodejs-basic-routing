const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res)=>{
    
    const handleCase = (res, file, status=200) => {
        res.writeHead(status, {'Content-Type': 'text/html'})
        fs.createReadStream(__dirname+"/"+file+".html").pipe(res)
    }

    switch( req.url ) {
        case '/':
            handleCase(res, "index")
        break;
        case '/about':
            handleCase(res, "about")
        break;
        default:
            handleCase(res, "404", 404)
        break;
    }
})

server.listen(3000, "localhost", ()=>{
    console.log('Server started at localhost:3000');
})