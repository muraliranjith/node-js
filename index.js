require("dotenv").config({
    path:`${__dirname}/.env.${process.env.NODE_ENV}`,
});
console.log(`${__dirname}/.env.${process.env.NODE}`)
console.log(process.env.MY_VAR);
console.log(process.env.NUMBER);
