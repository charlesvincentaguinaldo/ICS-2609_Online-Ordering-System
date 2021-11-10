const http = require('http');
const { runInNewContext } = require('vm');
 const server = http.createServer();

server.on("connection", (socket) => {
    console.log("new request was recieved...");
})
.listen(3000);

const server = http.createServer((req, res) => {
    if(req.url === "/"){
        app
            .use(morgan('dev'))
            .use(express.static('public'))
            .use(express.urlencoded({ extended: false }))
            .use(express.json())
    }
    else if(req.url === "/admin"){
        app.use(morgan('dev'))
            .use(express.static('public'))
            .use(express.urlencoded({ extended: false }))
            .use(express.json())
    }
    else{
        res.writeHead(404, {"Content-Type":"text/html"});
        res.write("<html><body><h1>Page not found</h1></body></hmtl>");
        res.write("<a href='/'>go to home page</a>");
        res.end();
    }
})
.listen(3000);
console.log("listening to port 3000");