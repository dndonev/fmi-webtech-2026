// =============================================================================
// "this" в JavaScript
// =============================================================================

// "this" е специална ключова дума, която се определя НЕ от това къде е
// дефинирана функцията, а от това КАК е извикана (с изключение на arrow functions).
// Стойността на "this" се определя в момента на извикване (call-site).

// =============================================================================
// 1. Глобален контекст (Global context)
// =============================================================================

// Извън всякаква функция, "this" сочи към глобалния обект.
// В браузъра: window, в Node.js: global (или globalThis навсякъде).

console.log("--- 1. Глобален контекст ---");
console.log(this); // В Node module scope: {} (module.exports)
// В браузъра: Window

// =============================================================================
// 2. Обикновена функция (Default binding)
// =============================================================================

// Когато функция се извика "просто" — без обект пред нея — this е:
//   - глобалния обект (в non-strict mode)
//   - undefined           (в strict mode)

function showThis() {
  console.log(this);
}

console.log("\n--- 2. Default binding ---");
showThis(); // non-strict: global/window, strict: undefined

// В strict mode:
function showThisStrict() {
  "use strict";
  console.log(this);
}

showThisStrict(); // undefined

// =============================================================================
// 3. Имплицитно свързване (Implicit binding)
// =============================================================================

// Когато функция се извика КАТО МЕТОД на обект (obj.method()),
// this сочи към обекта ПРЕДИ точката.

console.log("\n--- 3. Implicit binding ---");

const person = {
  name: "Иван",
  greet() {
    console.log(`Здравей, аз съм ${this.name}`);
  },
};

person.greet(); // "Здравей, аз съм Иван" — this === person

// ВАЖНО: Значение има ПОСЛЕДНИЯТ обект в chain-а.
const company = {
  name: "FMI Corp",
  department: {
    name: "Web Technologies",
    getName() {
      return this.name;
    },
  },
};

console.log(company.department.getName()); // "Web Technologies", не "FMI Corp"
// this === company.department (последният обект преди ())

// =============================================================================
// 4. Загуба на implicit binding (Implicit binding loss)
// =============================================================================

// Ако вземем метода като референция и го извикаме отделно,
// губим обекта — this се определя от новия call-site.

console.log("\n--- 4. Implicit binding loss ---");

const greetFn = person.greet; // вземаме само функцията
greetFn(); // non-strict: this === global → this.name === undefined
// strict: TypeError — cannot read property of undefined

// Същото се случва при callback-и:
function runCallback(cb) {
  cb(); // извиква се "просто", без обект → default binding
}

runCallback(person.greet); // this.name === undefined (не "Иван")

// =============================================================================
// 5. Явно свързване (Explicit binding) — call, apply, bind
// =============================================================================

// Можем РЪЧНО да зададем this чрез call(), apply() и bind().

console.log("\n--- 5. Explicit binding ---");

function introduce(greeting, punctuation) {
  console.log(`${greeting}, аз съм ${this.name}${punctuation}`);
}

const user = { name: "Мария" };

// call — подаваме аргументите един по един
introduce.call(user, "Здравейте", "!"); // "Здравейте, аз съм Мария!"

// apply — подаваме аргументите като масив
introduce.apply(user, ["Хей", "."]); // "Хей, аз съм Мария."

// bind — връща НОВА функция с фиксиран this (не я извиква веднага)
const boundIntroduce = introduce.bind(user, "Привет");
boundIntroduce("!!!"); // "Привет, аз съм Мария!!!"

// bind е "твърдо" свързване — не може да се промени после:
const reBound = boundIntroduce.bind({ name: "Друг" });
reBound("?"); // "Привет, аз съм Мария?" — НЕ "Друг"!

// =============================================================================
// 6. new binding (Конструктор)
// =============================================================================

// Когато функция се извика с "new", се случват 4 неща:
//   1. Създава се нов празен обект {}
//   2. Прототипът на новия обект се свързва с Function.prototype
//   3. this вътре във функцията сочи към новия обект
//   4. Ако функцията не връща обект, автоматично се връща this

console.log("\n--- 6. new binding ---");

function Car(brand, model) {
  // this = {} (нов празен обект)
  this.brand = brand;
  this.model = model;
  // return this; (имплицитно)
}

const myCar = new Car("Toyota", "Corolla");
console.log(myCar.brand); // "Toyota"
console.log(myCar.model); // "Corolla"

// Ако конструктор върне ОБЕКТ — new го игнорира и връща върнатия обект:
function Weird() {
  this.a = 1;
  return { b: 2 }; // връща се този обект, не this
}

const w = new Weird();
console.log(w.a); // undefined
console.log(w.b); // 2

// Ако върне примитив — игнорира се и пак се връща this:
function NotWeird() {
  this.a = 1;
  return 42; // игнорира се
}

const nw = new NotWeird();
console.log(nw.a); // 1

// =============================================================================
// 7. Приоритет на правилата (Binding precedence)
// =============================================================================

// От НАЙ-ВИСОК към НАЙ-НИСЪК приоритет:
//
//   1. new binding          — new Foo()
//   2. Explicit binding     — call / apply / bind
//   3. Implicit binding     — obj.method()
//   4. Default binding      — foo()
//
// new > explicit > implicit > default

console.log("\n--- 7. Binding precedence ---");

function Greeter(name) {
  this.name = name;
}

const boundGreeter = Greeter.bind({ name: "Bind стойност" });
const obj = new boundGreeter("New стойност");
console.log(obj.name); // "New стойност" — new побеждава bind!

// =============================================================================
// 8. Arrow functions — лексикален this
// =============================================================================

// Arrow функциите НЯМАТ собствен this.
// Те наследяват this от обхващащия (enclosing) ЛЕКСИКАЛЕН scope
// в момента на ДЕФИНИРАНЕ, не на извикване.
// call/apply/bind НЕ могат да променят this на arrow function.

console.log("\n--- 8. Arrow functions ---");

const team = {
  name: "Alpha",
  members: ["Ана", "Боян", "Цвета"],

  printMembers() {
    // Тук this === team (implicit binding)

    this.members.forEach((member) => {
      // Arrow function → this е наследен от printMembers → team
      console.log(`${member} е в отбор ${this.name}`);
    });
  },
};

team.printMembers();
// "Ана е в отбор Alpha"
// "Боян е в отбор Alpha"
// "Цвета е в отбор Alpha"

// Сравнение: с обикновена функция щеше да се счупи:
const team2 = {
  name: "Beta",
  members: ["Дан", "Ева"],

  printMembers() {
    this.members.forEach(function (member) {
      // Обикновена функция → default binding → this !== team2
      console.log(`${member} е в отбор ${this.name}`); // this.name === undefined
    });
  },
};

team2.printMembers(); // "Дан е в отбор undefined"

// Решение преди arrow functions беше да запазим this в променлива:
const team3 = {
  name: "Gamma",
  members: ["Жоро"],

  printMembers() {
    const self = this; // запазваме this
    this.members.forEach(function (member) {
      console.log(`${member} е в отбор ${self.name}`); // работи!
    });
  },
};

team3.printMembers(); // "Жоро е в отбор Gamma"

// Arrow function като метод на обект — НЕ работи както очакваме:
const broken = {
  name: "Broken",
  greet: () => {
    // Arrow → this е от enclosing scope (module/global), НЕ от обекта
    console.log(`Здравей от ${this.name}`);
  },
};

broken.greet(); // "Здравей от undefined" — this НЕ е broken!

// =============================================================================
// 9. this в event listeners (браузър)
// =============================================================================

// В DOM event listener, this сочи към елемента, който е получил събитието:
//
//   button.addEventListener("click", function () {
//     console.log(this); // <button> елемента
//   });
//
//   button.addEventListener("click", () => {
//     console.log(this); // НЕ бутона! Лексикален this (вероятно window)
//   });
//
// Затова за event listeners обикновено се ползват обикновени функции.

// =============================================================================
// 10. this в класове (ES6 classes)
// =============================================================================

console.log("\n--- 10. this в класове ---");

class Animal {
  constructor(name) {
    this.name = name; // this е новосъздадения инстанс
  }

  speak() {
    console.log(`${this.name} издава звук.`);
  }
}

const dog = new Animal("Рекс");
dog.speak(); // "Рекс издава звук." — this === dog

// Проблем: загуба на this при деструктуриране
const { speak } = dog;
// speak(); // TypeError в strict mode (класовете са винаги strict)

// Решение 1: bind в конструктора
class AnimalFixed {
  constructor(name) {
    this.name = name;
    this.speak = this.speak.bind(this); // фиксираме this
  }

  speak() {
    console.log(`${this.name} издава звук.`);
  }
}

const cat = new AnimalFixed("Мурка");
const catSpeak = cat.speak;
catSpeak(); // "Мурка издава звук." — работи!

// Решение 2: class field с arrow function (модерен подход)
class AnimalArrow {
  constructor(name) {
    this.name = name;
  }

  // Class field — arrow function → this е фиксиран към инстанса
  speak = () => {
    console.log(`${this.name} издава звук.`);
  };
}

const bird = new AnimalArrow("Чирко");
const birdSpeak = bird.speak;
birdSpeak(); // "Чирко издава звук." — работи!

// =============================================================================
// 11. this с setTimeout / setInterval
// =============================================================================

console.log("\n--- 11. this с setTimeout ---");

const timer = {
  name: "Таймер",

  startBroken() {
    setTimeout(function () {
      console.log(`[broken] ${this.name}`); // this === global → undefined
    }, 100);
  },

  startFixed() {
    setTimeout(() => {
      console.log(`[fixed] ${this.name}`); // arrow → this === timer
    }, 200);
  },
};

timer.startBroken(); // "[broken] undefined"
timer.startFixed(); // "[fixed] Таймер"

// =============================================================================
// 12. Обобщение — как да определим this
// =============================================================================

// Стъпки за определяне на this (в реда на приоритет):
//
// 1. Arrow function ли е?
//    → ДА: this е от enclosing lexical scope. Край.
//
// 2. Извикана ли е с new?
//    → ДА: this е новосъздаденият обект. Край.
//
// 3. Извикана ли е с call / apply / bind?
//    → ДА: this е първият аргумент. Край.
//
// 4. Извикана ли е като метод на обект (obj.fn())?
//    → ДА: this е обектът преди точката. Край.
//
// 5. Нищо от горните?
//    → non-strict: this === globalThis (window / global)
//    → strict mode: this === undefined

// =============================================================================
// 13. Бонус: globalThis
// =============================================================================

// globalThis е стандартен начин за достъп до глобалния обект навсякъде:
//   - В браузър: globalThis === window
//   - В Node.js: globalThis === global
//   - В Web Workers: globalThis === self

console.log("\n--- 13. globalThis ---");
console.log(globalThis); // глобалният обект на текущата среда
