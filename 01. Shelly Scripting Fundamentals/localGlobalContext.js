function test() {
    g = 100;
    if (true) {
        var a=10;
        let b=20;  
        console.log("block scope, a =",a);
        console.log("block scope, b =",b);
    }
    console.log("function scope, a =",a);
    console.log("function scope, b =",b);
 }
 
 test();
 
 console.log("global scope, g =", g);
 
 console.log("global scope, a =", a);
 console.log("global scope, b =", b);