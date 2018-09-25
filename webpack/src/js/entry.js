import {doubleMath,pi} from './func'

import '../css/style.css'

console.log("entry");
[1,2,3,4].map( (item,index) =>{
    return item+5;
});
document.write("entry.js is work <br />");

document.write(doubleMath(5)+"<br />");
document.write(pi(3)+"<br />");

