const path = require('path')
console.log(__dirname)
console.log(path.resolve('/chx/test','/src/assets/images'))
console.log(path.resolve('foo/bar', '/tmp/file/', '..', 'a/../subfile')  )
let myPath = path.join(__dirname,'/img/so');
let myPath2 = path.join(__dirname,'./img/so');
let myPath3 = path.resolve(__dirname,'/img/so');
let myPath4 = path.resolve(__dirname,'./img/so');
console.log(myPath);     //D:\myProgram\test\img\so
console.log(myPath2);   //D:\myProgram\test\img\so
console.log(myPath3);   //D:\img\so<br>
console.log(myPath4);   //D:\myProgram\test\img\so
