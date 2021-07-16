// const fs = require("fs");
// fs.writeFileSync("Written.txt","This Contentt is written from outside the file");

// function myFunc(arg) {
//     console.log(`arg was => ${arg}`);
// }

// setTimeout(console.log('hello'),myFunc, 1500, "hello");
const fetchData = () => {
    setTimeout(()=>{
        console.log("Iam Arun");
    },1000);
};
setTimeout(()=>{
    console.log("Timmer is running");
    fetchData(text =>{
        console.log(text);
    });
},2000
);
function add (a,b){
    return a+b
}
// console.log(40+50);
// console.log(add(10,20))
