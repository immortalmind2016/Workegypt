const fs=require("fs")


var shell = require('shelljs');
var dirs =[]
dirs.push('./public/uploads/images/applicant/')
dirs.push('./public/uploads/images/company/')

dirs.push('./public/uploads/videos/applicant/')
dirs.push('./public/uploads/videos/company/')

dirs.push('./public/uploads/cvs/applicant')


for(var dir of dirs){

    if (!fs.existsSync(dir)){
        shell.mkdir('-p', dir);

    }
}

