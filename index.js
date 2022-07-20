// a simple explanation of promises



// a promise can either be pending, resolved, or rejected. If I make a promise, I've either resolved it, I've rejected it, or it's still pending



// javascript code runs synchronously, so the line 'let x = 10;' is read, once that's completed, only then is the line 'console.log(x);' read
let x = 10;
console.log(x);



// however, once javascript sees the line of code below, once it realises this is a PROMISE, it says to itself...
// 'alright, whatever is inside this promise, I will execute asynchronously. 
// No matter how many thousands of lines of code is inside this code block, javascript will ignore it all and move on to 'console.log('JavaScript moved on')'
const p = new Promise((resolveCallback, rejectCallback) => {
    // inside this promise codeblock, we are now in the asynchronous realm, whatever is in here is being executed in the background.
    // depending on how much code is in here, the time it takes to complete reading it all will vary
    // it's highly likely javascript has already moved on to the line 'console.log('JavaScript moved on')'



    // resolve is a callback function, reject is a callback function
    
    // this is where we decide under what conditions is the promise resolved, or rejected. Often this requires if-else statements
    let y = 1 + 1;
    
    // because 1 + 1 always equals 2, obviously the first if-block is the one that's always going to execute, but you get point, based off some sort of condition, you either call the resolveCallback function, or the rejectCallback function

    if(y === 2) {
        // up until this point, this promise was 'pending'
        // here, we call the resolveCallback function, this is how we tell javascript that the promise has now been 'resolved'
        resolveCallback('The Eagle has landed!');
    } else {
        // here, we call the rejectCallback function, this is how we tell javascript that the promise has been 'rejected'
        rejectCallback('Mission failed! To the chopper!');
    }

    // that's basically the whole point of a promise; based off a certain condition, execute either the resolveCallback or the rejectCallback
})



console.log('JavaScript moved on')



// remember, then() basically means, once this promise is RESOLVED, THEN execute whatever is inside me.
// so the entire then() code block will ONLY BE EXECUTED once the promise above is RESOLVED 

// you were probably wondering, what on earth was 'The Eagle has landed!' for above?
// well here it is  
p.then((thenParameter) => {
    // basically, you can pass whatever you want into the resolveCallback function, a string, an array, a number, whatever!
    // I just chose a string that was 'The Eagle has landed!'
    // now, that exact string, carries over to this callback function in then(), you can access it here now! They coincide.

    console.log(thenParameter); // you're going to get the string 'The Eagle has landed!'
}).catch((catchParameter) => {
    // the then() code block is executed if the promise is RESOLVED. the catch() code block is execute if the promise is REJECTED

    // now, remember that string 'Mission failed! To the chopper!' in the promise above?
    // well, just like for then(), in catch() we have access to that string here, it's the EXACT SAME as the catchParameter in this code block
    // they coincide
    // it could've been anything, a number, an array, an object, I just chose for it to be a string

    console.log(catchParameter); // you're going to get the string 'Mission failed! To the chopper!'
})