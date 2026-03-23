// ============================================================
// Introduction to JavaScript — Week 4 Examples
// ============================================================

// ------------------------------------------------------------
// 1. Variables: var, let, const
// ------------------------------------------------------------

var name = "Alice"; // function-scoped, can be reassigned
let age = 25; // block-scoped, can be reassigned
const PI = 3.14159; // block-scoped, cannot be reassigned

console.log(name, age, PI); // Alice 25 3.14159

// let and const respect block scope
{
  let blockScoped = "I exist only inside this block";
  console.log(blockScoped); // works
}
// console.log(blockScoped); // ReferenceError

// ------------------------------------------------------------
// 2. Data Types
// ------------------------------------------------------------

// Primitive types
const str = "Hello, JavaScript!"; // string
const num = 42; // number
const float = 3.14; // number (no separate float type)
const bool = true; // boolean
const nothing = null; // null
let notDefined; // undefined
const uniqueId = Symbol("id"); // symbol

const timer = setTimeout(() => {
  console.log("bad info");
}, 1000);

clearTimeout(timer);

const bigNumber = 9007199254740991n; // bigint

console.log(typeof str); // "string"
console.log(typeof num); // "number"
console.log(typeof bool); // "boolean"
console.log(typeof nothing); // "object" (historical quirk)
console.log(typeof notDefined); // "undefined"
console.log(typeof uniqueId); // "symbol"
console.log(typeof bigNumber); // "bigint"

// ------------------------------------------------------------
// 3. Operators
// ------------------------------------------------------------

// Arithmetic
console.log(10 + 3); // 13
console.log(10 - 3); // 7
console.log(10 * 3); // 30
console.log(10 / 3); // 3.3333...
console.log(10 % 3); // 1 (remainder)
console.log(2 ** 10); // 1024 (exponentiation)

// Comparison: == vs ===
console.log(5 == "5"); // true  (loose equality, type coercion)
console.log(5 === "5"); // false (strict equality, no coercion)
console.log(5 != "5"); // false
console.log(5 !== "5"); // true

// Logical
console.log(true && false); // false
console.log(true || false); // true
console.log(!true); // false

// Nullish coalescing & optional chaining
const config = null;
console.log(config === null ?? "default value"); // "default value"

const user = { address: { city: "Sofia" } };

const newObject = {};
console.log(user?.address?.city); // "Sofia"
console.log(user?.phone?.number); // undefined (no error)

// ------------------------------------------------------------
// 4. Strings
// ------------------------------------------------------------

const firstName = "John";
const lastName = "Doe";

// Concatenation
console.log(firstName + " " + lastName); // "John Doe"

// Template literals (backticks)
console.log(`Full name: ${firstName} ${lastName}`);
console.log(`2 + 2 = ${2 + 2}`);

// Common string methods
const text = "Hello, World!";
console.log(text.length); // 13
console.log(text.toUpperCase()); // "HELLO, WORLD!"
console.log(text.toLowerCase()); // "hello, world!"
console.log(text.includes("World")); // true
console.log(text.indexOf("World")); // 7
console.log(text.slice(0, 5)); // "Hello"
console.log(text.replace("World", "JS")); // "Hello, JS!"
console.log(text.split(", ")); // ["Hello", "World!"]

// ------------------------------------------------------------
// 5. Control Flow
// ------------------------------------------------------------

// if / else if / else
const score = 85;

if (score >= 90) {
  console.log("Excellent");
} else if (score >= 70) {
  console.log("Good"); // ← this runs
} else {
  console.log("Needs improvement");
}

// Ternary operator
const status = score >= 60 ? "Pass" : "Fail";
console.log(status); // "Pass"

// switch
const day = "Monday";
switch (day) {
  case "Monday":
    console.log("Start of the work week");
    break;
  case "Friday":
    console.log("Almost weekend!");
    break;
  default:
    console.log("Just another day");
}

// ------------------------------------------------------------
// 6. Loops
// ------------------------------------------------------------

// for
for (let i = 0; i < 5; i++) {
  console.log(`for loop iteration: ${i}`);
}

// while
let count = 3;
while (count > 0) {
  console.log(`while: ${count}`);
  count--;
}

// do...while (runs at least once)
let x = 0;
do {
  console.log(`do...while: ${x}`);
  x++;
} while (x < 3);

// for...of (iterates over values of an iterable)
const colors = ["red", "green", "blue"];
for (const color of colors) {
  console.log(`Color: ${color}`);
}

// for...in (iterates over keys/indices of an object)
const person = { name: "Alice", age: 25, city: "Sofia" };
for (const key in person) {
  console.log(`${key}: ${person[key]}`);
}

// ------------------------------------------------------------
// 7. Functions
// ------------------------------------------------------------

// Function declaration (hoisted)
function greet(name) {
  return `Hello, ${name}!`;
}
console.log(greet("World")); // "Hello, World!"

// Function expression (not hoisted)
const square = function (n) {
  return n * n;
};
console.log(square(5)); // 25

// this -> { name: 'Dobrin' }

function cube(n) {
  return n ** 3;
}

// Arrow function
const cube = (n) => n ** 3;

console.log(cube(3)); // 27

// Arrow function with body
const getFullName = (first, last) => {
  const full = `${first} ${last}`;
  return full.toUpperCase();
};
console.log(getFullName("John", "Doe")); // "JOHN DOE"

// Default parameters
function multiply(a, b = 1) {
  return a * b;
}
console.log(multiply(5)); // 5
console.log(multiply(5, 3)); // 15

// Rest parameters
function sum(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}
console.log(sum(1, 2, 3, 4, 5)); // 15

// ------------------------------------------------------------
// 8. Arrays
// ------------------------------------------------------------

// User input: 'app'
const userInput = "ap";
const fruits = ["apple", "abanana", "cherry", "cucumber"]
  .filter((x) => x === x.includes(userInput)) // to filter some values - returns an array
  .find((x) => x.startsWith("a")); // find a specific element - return an element or undefined

// Access & length
console.log(fruits[0]); // "apple"
console.log(fruits.length); // 3

// Mutating methods
fruits.push("date"); // add to end
fruits.unshift("avocado"); // add to start
console.log(fruits); // ["avocado", "apple", "banana", "cherry", "date"]

fruits.pop(); // remove from end
fruits.shift(); // remove from start
console.log(fruits); // ["apple", "banana", "cherry"]

// Searching
console.log(fruits.includes("banana")); // true
console.log(fruits.indexOf("cherry")); // 2
console.log(fruits.find((f) => f.startsWith("b"))); // "banana"
console.log(fruits.findIndex((f) => f === "cherry")); // 2

// Iterating & transforming
fruits.forEach((fruit, i) => console.log(`${i}: ${fruit}`));

const upperFruits = fruits.map((f) => f.toUpperCase());

console.log(upperFruits); // ["APPLE", "BANANA", "CHERRY"]

const longNames = fruits.filter((f) => f.length > 5);
console.log(longNames); // ["banana", "cherry"]

const totalLength = fruits.reduce((acc, f) => acc + f.length, 0);
console.log(totalLength); // 17

// Spread operator with arrays
const moreFruits = [...fruits, "elderberry"];
console.log(moreFruits);

// Destructuring arrays
const [first, second, ...rest] = moreFruits;
console.log(first); // "apple"
console.log(rest); // ["cherry", "elderberry"]

// ------------------------------------------------------------
// 9. Objects
// ------------------------------------------------------------

const student = {
  name: "Maria",
  age: 22,
  grades: [5, 6, 4, 5],
  greet() {
    return `Hi, I'm ${this.name}`;
  },
};

// Access properties
console.log(student.name); // "Maria"
console.log(student["age"]); // 22
console.log(student.greet()); // "Hi, I'm Maria"

// Add / modify / delete properties
student.email = "maria@example.com";
student.age = 23;
delete student.email;

// Object methods
console.log(Object.keys(student)); // ["name", "age", "grades", "greet"]
console.log(Object.values(student)); // ["Maria", 23, [...], f]
console.log(Object.entries(student)); // [["name","Maria"], ...]

// Spread operator with objects
const updatedStudent = { ...student, age: 24, university: "FMI" };
console.log(updatedStudent);

// Destructuring objects
const { name: studentName, age: studentAge, grades } = student;
console.log(studentName, studentAge, grades);

// Shorthand property names
const city = "Sofia";
const country = "Bulgaria";
const location = { city, country };
console.log(location); // { city: "Sofia", country: "Bulgaria" }

// Computed property names
const propName = "score";
const obj = { [propName]: 100 };
console.log(obj.score); // 100

// ------------------------------------------------------------
// 10. Error Handling
// ------------------------------------------------------------

try {
  const result = JSON.parse("not valid json");
} catch (error) {
  console.error("Caught an error:", error.message);
} finally {
  console.log("This always runs");
}

// Throwing custom errors
function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed");
  }
  return a / b;
}

try {
  console.log(divide(10, 2)); // 5
  console.log(divide(10, 0)); // throws
} catch (e) {
  console.error(e.message); // "Division by zero is not allowed"
}

// ------------------------------------------------------------
// 11. Closures & Scope
// ------------------------------------------------------------

function createCounter() {
  let count = 0;
  return {
    increment() {
      return ++count;
    },
    decrement() {
      return --count;
    },
    getCount() {
      return count;
    },
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
console.log(counter.getCount()); // 1

// ------------------------------------------------------------
// 12. Higher-Order Functions & Callbacks
// ------------------------------------------------------------

// A function that takes another function as an argument
function operate(a, b, operation) {
  return operation(a, b);
}

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;

console.log(operate(10, 5, add)); // 15
console.log(operate(10, 5, subtract)); // 5

// Returning a function
function multiplier(factor) {
  return (number) => number * factor;
}

const double = multiplier(2);
const triple = multiplier(3);
console.log(double(5)); // 10
console.log(triple(5)); // 15

// ------------------------------------------------------------
// 13. Promises & Async/Await
// ------------------------------------------------------------

// Creating a promise
function fetchData(shouldSucceed) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldSucceed) {
        resolve({ id: 1, title: "Sample Data" });
      } else {
        reject(new Error("Failed to fetch data"));
      }
    }, 100);
  });
}

// Using .then/.catch
fetchData(true)
  .then((data) => console.log("Promise resolved:", data))
  .catch((err) => console.error("Promise rejected:", err.message));

// Using async/await
async function loadData() {
  try {
    const data = await fetchData(true);
    console.log("Async/await result:", data);
  } catch (err) {
    console.error("Async/await error:", err.message);
  }
}

loadData();

// ------------------------------------------------------------
// 14. Classes
// ------------------------------------------------------------

class Animal {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }

  speak() {
    return `${this.name} says ${this.sound}`;
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name, "Woof");
  }

  fetch(item) {
    return `${this.name} fetches the ${item}!`;
  }
}

const dog = new Dog("Rex");
console.log(dog.speak()); // "Rex says Woof"
console.log(dog.fetch("ball")); // "Rex fetches the ball!"
console.log(dog instanceof Dog); // true
console.log(dog instanceof Animal); // true

// ------------------------------------------------------------
// 15. Modules (ES Modules syntax reference)
// ------------------------------------------------------------

// In a real project with separate files you would use:
//
// math.js:
//   export const add = (a, b) => a + b;
//   export default function multiply(a, b) { return a * b; }
//
// main.js:
//   import multiply, { add } from './math.js';
//   console.log(add(2, 3));      // 5
//   console.log(multiply(2, 3)); // 6

// ------------------------------------------------------------
// 16. Useful Built-in APIs
// ------------------------------------------------------------

// Math
console.log(Math.max(1, 5, 3)); // 5
console.log(Math.min(1, 5, 3)); // 1
console.log(Math.floor(4.7)); // 4
console.log(Math.ceil(4.1)); // 5
console.log(Math.round(4.5)); // 5
console.log(Math.random()); // random number [0, 1)

// Date
const now = new Date();
console.log(now.toISOString());
console.log(now.getFullYear());

// JSON
const jsonString = JSON.stringify({ a: 1, b: [2, 3] });
console.log(jsonString); // '{"a":1,"b":[2,3]}'
const parsed = JSON.parse(jsonString);
console.log(parsed); // { a: 1, b: [2, 3] }

// Map & Set
const map = new Map();
map.set("key1", "value1");
map.set("key2", "value2");
console.log(map.get("key1")); // "value1"
console.log(map.size); // 2

const set = new Set([1, 2, 3, 3, 2, 1]);
console.log([...set]); // [1, 2, 3] — duplicates removed

console.log("\nAll examples completed!");
