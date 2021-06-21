const fs = require('fs');
const http = require('http');

const server = http.createServer((req,res) => {
    //console.log(req.url, req.method, req.headers);
    // res.setHeader('Content-Type', 'text/html');
    const url = req.url;
    const  method=req.method;
    //console.log(url);
    if(url==='/'){
        res.write('<html>');
        res.write('<head><title>Form Validation</title></head>');
        res.write('<body><form action="/message" method = "POST"><input type="text" name = "message"><input type = "submit" value = "submit" onclick> </form></body>');
        res.write('</html>');
        console.log(url)
        return res.end();
    }
    if(url === "/message" && method=="POST"){
        const body = [];
        req.on('data',(chunk) =>{
            console.log(chunk);
            body.push(chunk);
            // const parsedbody = Buffer.concat(body).toString();
            // const message = parsedbody.split("=")[1];
            // fs.writeFileSync("message.txt",message);
        });
        req.on("end",() => {
            const parsedbody = Buffer.concat(body).toString();
            const message = parsedbody.split("=")[1];
            fs.writeFileSync("message.txt",message);
            res.statusCode = 302;
            //res.setHeader("Location", "/");
            return res.end()

        });
       
    }
    method = "POST";

    res.write('<html>');
    res.write('<head><title>My First Page </title></head>');
    res.write('<body><h1>Hello from My Node.js Server!</h1></body>');
    res.write('</html>');
    res.end();
});
server.listen(3000);