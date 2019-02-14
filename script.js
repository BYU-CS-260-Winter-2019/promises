// Clears any old output when a button is pressed.
const clear = function() {
  document.getElementById("output").innerHTML = "";
}

// Appends output to the #output div. More useful than printing to console. :-)
const output = function(str) {
  let p = `<p>${str}</p>`;
  document.getElementById("output").innerHTML += p;
}

// You can set this to false to see what happens.
var isMomHappy = true;

// We're going to create some promises:
// 1. If mom is happy, she will give me a new iPhone.
// 2. If I get a new phone, I will show it off to my friends.
// This will allow us to chain promises together.

/* ES5 */

// Create a Promise that will resolve with a phone object if mom is happy.
// If mom is not happy, raise an error. This will short-circuit any promises that happen subsequently.
var willIGetNewPhone = new Promise(
  function(resolve, reject) {
    if (isMomHappy) {
      var phone = {
        brand: 'iPhone XR',
        color: 'gold'
      };
      resolve(phone); // fulfilled
    } else {
      var reason = new Error('Mom is not happy.');
      reject(reason); // reject
    }

  }
);

// Ask mom -- if I get a phone, then output a message. Catch any errors that occur.
// Note that this promise returns an object.
var askMom = function() {
  willIGetNewPhone
    .then(function(phone) {
      var message = 'Mom gives you a ' +
        phone.color + ' ' + phone.brand + ' phone';

      output(message);
    })
    .catch(function(error) {
      // oops, mom don't buy it
      output(error.message);
    });
};

// Run the above when a button is clicked.
document.getElementById("run1").addEventListener("click", function(event) {
  clear();
  askMom();
});

// This is the second promise -- if I get a phone, then return a message that says
// I am showing it to my friends. Note that this promise returns a string.
var showOff = function(phone) {
  return new Promise(
    function(resolve, reject) {
      var message = 'Hey friend, I have a new ' +
        phone.color + ' ' + phone.brand + ' phone';

      resolve(message);
    }
  );
};

// This is a shorter version of the same promise above. Since the Promise above
// has no reject, then we can define it below in a shorter version.
// You can try this out by changing showOff to showOff2 in askMom2.
var showOff2 = function(phone) {
  var message = 'Hey friend, I have a new ' +
    phone.color + ' ' + phone.brand + ' phone';

  return Promise.resolve(message);
};

// Ask mom -- if I get a phone, then show it off to my friend, then print out
// a message. Catch any errors that occur.
var askMom2 = function() {
  output('before asking Mom'); // log before
  willIGetNewPhone
    .then(showOff) // chain it here
    .then(function(fulfilled) {
      output(fulfilled);
      // output: 'Hey friend, I have a new black Samsung phone.'
    })
    .catch(function(error) {
      // oops, mom don't buy it
      output(error.message);
      // output: 'mom is not happy'
    });
  output('after asking mom'); // log after
};

// Run the above when a button is clicked.
document.getElementById("run2").addEventListener("click", function(event) {
  clear();
  askMom2();
});

/* ES6 */

// This is the ES6 version.
// Create a Promise that will resolve with a phone object if mom is happy.
// If mom is not happy, raise an error. This will short-circuit any promises that happen subsequently.
const willIGetNewPhone3 = new Promise(
  (resolve, reject) => { // fat arrow
    if (isMomHappy) {
      const phone = {
        brand: 'Samsung',
        color: 'black'
      };
      resolve(phone);
    } else {
      const reason = new Error('mom is not happy');
      reject(reason);
    }

  }
);

// This is the ES6 version.
// If I get a phone, then return a message that says I am showing it to my friends.
// Note that we are using the shorter version.
const showOff3 = function(phone) {
  const message = 'Hey friend, I have a new ' +
    phone.color + ' ' + phone.brand + ' phone';
  return Promise.resolve(message);
};

// Ask mom -- if I get a phone, then show it off, then output a message. Catch any errors that occur.
// Note how much simpler this is with the new arrow syntax in ES 6.
const askMom3 = function() {
  willIGetNewPhone
    .then(showOff)
    .then(fulfilled => output(fulfilled)) // fat arrow
    .catch(error => output(error.message)); // fat arrow
};

// Run the above when a button is clicked.
document.getElementById("run3").addEventListener("click", function(event) {
  clear();
  askMom3();
});

/* ES7 */

// This is the same as ES6.
const willIGetNewPhone4 = new Promise(
  (resolve, reject) => {
    if (isMomHappy) {
      const phone = {
        brand: 'iPhone XR',
        color: 'gold'
      };
      resolve(phone);
    } else {
      const reason = new Error('mom is not happy');
      reject(reason);
    }

  }
);

// In ES7 we can create async functions. Using async means a function always
// returns a Promise. JavaScript will automatically wrap it in
// a Promise even if one is not returned.
async function showOff4(phone) {
  return new Promise(
    (resolve, reject) => {
      var message = 'Hey friend, I have a new ' +
        phone.color + ' ' + phone.brand + ' phone';
      resolve(message);
    }
  );
};

// This is a shorter version of showOff4.
async function showOff5(phone) {
  var message = 'Hey friend, I have a new ' +
    phone.color + ' ' + phone.brand + ' phone';
  return message;
};


// Call our promise. The await keyword waits for the promise to resolve and then returns its value.
// You can only use await in an async function.
async function askMom4() {
  try {
    output('before asking Mom');

    let phone = await willIGetNewPhone4;
    let message = await showOff4(phone);

    output(message);
    output('after asking mom');
  } catch (error) {
    output(error.message);
  }
}

// We want to await on askMom4 and we have to do this in an async function.
async function doIt() {
  await askMom4();
}

document.getElementById("run4").addEventListener("click", function(event) {
  clear();
  doIt();
  // Note the web page these examples come from use a shortcut syntax:
  // (async () => {
  //  await askMom();
  // })();
  // This defines an async function on the fly (anonymously) and then calls it.
});