// async-await is just syntatic sugar, like ES6 classes. It does exactly the same thing as .then() and .catch() and creating a new promise with the resolveCallback and rejectCallback



// original way of creating a fetch request
fetch('https://jsonplaceholder.typicode.com/todos/1')
.then(res => res.json())
.then(data => {
    // write whatever code you want in this .then() block that has to do with the fetched data
    console.log(data)

})
.catch(err => console.error(err))



// async-await method
// create a function that has a fetch call inside of it, we've done this many times, that way you can reuse this function as many times as you want in many different places and just change the arguments you feed into it. It makes the fetch request reusable
// you must mark this function using the word 'async' in order to use await inside of it
// can be a function expression, a function declaration or an arrow function
const fetchData = async function(url) {
    // await basically means, wait until this promised is resolved, and only then read the next line of code
    // halt the reading of code until this promise returns as resolved
    // we then store the return value of this promise into a variable, which in this case is response
    // fetch returns another promise, so response itself is a promise
    const response = await fetch(url);

    // now, we use .json() on response, and this itself will return a promise, so we use 'await' to say, wait until the response.json() promise is resolved, and only then execute the next line of code 
    const data = await response.json();

    // now we can log the data
    console.log(data);

}

// works like a charm
fetchData('https://jsonplaceholder.typicode.com/todos/1');



// what if something goes wrong? Where is the equivalent of .catch() using the async-await method?
const fetchData2 = async function(url) {
    // in the try block, you put all the code you want to execute
    // if at any point there is an error in the try block related to promises, the catch block will immediately execute 
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    } catch(err) {
        console.error(err);
    }

}

fetchData2('https://jsonplaceholder.typicode.com/todos/1') // works like a charm
// fetchData2('https://hehejsonplaceholder.typicode.com/todos/1') // will throw an error because of wrong url



// another thing to understand is this, any function marked with async will ALWAYS return a promise. No matter what you manually type in the return statement, it will always just return a promise
// if that's the case, you could also just return data, and then do another .then() on the function call itself 
const fetchData3 = async function(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data // therfore, this function returns a promise
    } catch(err) {
        console.error(err);
    }

}

fetchData3('https://jsonplaceholder.typicode.com/todos/1').then(data => console.log(data));



// using await in the global scope
// because await is only available inside a function, there is a way to access it in the global scope
// use an IIFE (immediately invoked function expression)
(async function() {
    const globallyAvailableData = await fetchData3('https://jsonplaceholder.typicode.com/todos/1');
    
    console.log(globallyAvailableData);
})()



// if you're running javascript in node 14.8 or higher, you can actually just use await in the global scope
// const dataInGlobalScope = await fetchData3('https://jsonplaceholder.typicode.com/todos/1');
// console.log(dataInGlobalScope);



// using Promise.all()
// if we wanted to make three fetch requests, we would have to copy the same code three times, whether that's using async-await or the standard fetch-then-then-catch chain
// Promise.all fixes this
const threeFetchRequests = async function(url1, url2, url3) {
    
    try {

        // pass into Promise.all() an array that has three promises, and then use 'await' to wait until all of those promises return as resolved, then store those returned values in an array called threeResponses
        const threeResponses = await Promise.all([
            fetch(url1),
            fetch(url2),
            fetch(url3)
       ])
       
        // threeResponses is now an array of responses
        console.log(threeResponses);

        // now you can map each of these responses into it's json equivalent, and then store that into an array variable
        // remember, returning response.json() for each entree means you are returning a promise for each entree. Returning a promise takes time, that's why you're going to use 'await' in the next line, you're telling javascript not to execute the lines of code after until all these promises have been returned
        const threeJSONData = threeResponses.map(response => response.json())
        
        // now you can wait until response.json() for each of the entrees returns as resolved, and once it is, then store that array of data into another variable which itself is an array
        const threeFinalData = await Promise.all(threeJSONData);

        console.log(threeFinalData); // finally, you have access to an array of objects that holds the data you want

        return threeFinalData; // this is there just because an async function must always return a promise

    } catch(err) {
        console.error(err);
    }

}

threeFetchRequests('https://jsonplaceholder.typicode.com/todos/1', 'https://jsonplaceholder.typicode.com/todos/2', 'https://jsonplaceholder.typicode.com/todos/3')