// =============================================================================
// Prototype в JavaScript
// =============================================================================

// JavaScript е прототипно-базиран език. Всеки обект има скрита връзка към
// друг обект, наречен негов "прототип". Когато търсим свойство в обект и то
// не съществува, JavaScript автоматично го търси нагоре по прототипната верига
// (prototype chain), докато стигне до null.

// =============================================================================
// 1. __proto__ — скритата връзка ([[Prototype]])
// =============================================================================

// Всеки обект има вътрешно свойство [[Prototype]] (достъпно чрез __proto__).
// То сочи към обекта, от който наследява.

console.log("--- 1. __proto__ ---");

const animal = {
  alive: true,
  breathe() {
    console.log("Дишам...");
  },
};

const cat = {
  name: "Мурка",
  meow() {
    console.log("Мяу!");
  },
};

// Задаваме animal като прототип на cat
Object.setPrototypeOf(cat, animal);

cat.meow(); // "Мяу!"      — собствено свойство
cat.breathe(); // "Дишам..."   — намерено в прототипа (animal)
console.log(cat.alive); // true — също от прототипа

// Проверка:
console.log(cat.__proto__ === animal); // true
console.log(Object.getPrototypeOf(cat) === animal); // true (препоръчителен начин)

// =============================================================================
// 2. Прототипна верига (Prototype chain)
// =============================================================================

// Обектите могат да образуват верига: cat → animal → Object.prototype → null

console.log("\n--- 2. Prototype chain ---");

console.log(cat.__proto__); // animal
console.log(cat.__proto__.__proto__); // Object.prototype
console.log(cat.__proto__.__proto__.__proto__); // null — краят на веригата

// Когато извикаме cat.toString(), JavaScript търси:
//   1. cat → няма toString
//   2. animal → няма toString
//   3. Object.prototype → ИМА toString → извиква го
console.log(cat.toString()); // "[object Object]"

// Ако свойството не се намери никъде:
console.log(cat.fly); // undefined (стигнахме до null)

// =============================================================================
// 3. Object.create() — създаване на обект с определен прототип
// =============================================================================

console.log("\n--- 3. Object.create() ---");

const vehicle = {
  type: "unknown",
  describe() {
    console.log(`Аз съм ${this.type} с ${this.wheels} колела.`);
  },
};

// Създаваме нов обект, чийто прототип е vehicle
const bike = Object.create(vehicle);
bike.type = "велосипед";
bike.wheels = 2;

bike.describe(); // "Аз съм велосипед с 2 колела."

// bike → vehicle → Object.prototype → null
console.log(Object.getPrototypeOf(bike) === vehicle); // true

// Object.create(null) — обект БЕЗ прототип (чист речник)
const dict = Object.create(null);
dict.key = "value";
console.log(dict.toString); // undefined — няма Object.prototype!

// =============================================================================
// 4. Конструктор функции и .prototype
// =============================================================================

// Всяка функция (освен arrow) автоматично получава свойство .prototype.
// Когато функцията се извика с "new", новият обект получава
// Function.prototype като свой [[Prototype]].

// ВАЖНО: Не бъркайте:
//   - func.prototype    → обект, който ще стане __proto__ на инстанциите
//   - func.__proto__    → прототипът на самата функция (Function.prototype)

console.log("\n--- 4. Constructor functions & .prototype ---");

function Person(name, age) {
  this.name = name;
  this.age = age;
}

// Добавяме метод към Person.prototype — споделя се между ВСИЧКИ инстанции
Person.prototype.greet = function () {
  console.log(`Здравей, аз съм ${this.name} на ${this.age} години.`);
};

Person.prototype.species = "Homo sapiens";

const ivan = new Person("Иван", 25);
const maria = new Person("Мария", 30);

ivan.greet(); // "Здравей, аз съм Иван на 25 години."
maria.greet(); // "Здравей, аз съм Мария на 30 години."

console.log(ivan.species); // "Homo sapiens" — от прототипа
console.log(maria.species); // "Homo sapiens" — същият обект

// Двете инстанции СПОДЕЛЯТ един и същ метод:
console.log(ivan.greet === maria.greet); // true — един обект в паметта

// Веригата: ivan → Person.prototype → Object.prototype → null
console.log(ivan.__proto__ === Person.prototype); // true
console.log(Person.prototype.__proto__ === Object.prototype); // true

// .constructor — Person.prototype има обратна връзка към функцията
console.log(Person.prototype.constructor === Person); // true
console.log(ivan.constructor === Person); // true (наследено)

// =============================================================================
// 5. Собствени vs наследени свойства
// =============================================================================

console.log("\n--- 5. Own vs inherited properties ---");

console.log(ivan.hasOwnProperty("name")); // true — собствено
console.log(ivan.hasOwnProperty("greet")); // false — наследено от прототипа
console.log(ivan.hasOwnProperty("species")); // false — наследено

// for...in обхожда И наследените enumerable свойства:
console.log("for...in:");
for (const key in ivan) {
  const own = ivan.hasOwnProperty(key) ? "(own)" : "(inherited)";
  console.log(`  ${key} ${own}`);
}
// name (own), age (own), greet (inherited), species (inherited)

// Object.keys() връща САМО собствените enumerable свойства:
console.log("Object.keys:", Object.keys(ivan)); // ["name", "age"]

// =============================================================================
// 6. Shadowing (засенчване на свойства)
// =============================================================================

// Ако зададем свойство директно на обект, то "засенчва" едноименно
// свойство от прототипа — без да го променя.

console.log("\n--- 6. Shadowing ---");

const base = { color: "червен" };
const derived = Object.create(base);

console.log(derived.color); // "червен" — от прототипа

derived.color = "син"; // създава СОБСТВЕНО свойство
console.log(derived.color); // "син" — собственото засенчва
console.log(base.color); // "червен" — прототипът НЕ е променен
console.log(derived.hasOwnProperty("color")); // true

delete derived.color; // премахваме собственото
console.log(derived.color); // "червен" — отново от прототипа

// =============================================================================
// 7. Прототипно наследяване между конструктори
// =============================================================================

console.log("\n--- 7. Prototypal inheritance ---");

function Animal2(name) {
  this.name = name;
}

Animal2.prototype.speak = function () {
  console.log(`${this.name} издава звук.`);
};

function Dog(name, breed) {
  Animal2.call(this, name); // извикваме "родителския" конструктор
  this.breed = breed;
}

// Свързваме прототипните вериги:
// Dog.prototype трябва да наследява от Animal2.prototype
Dog.prototype = Object.create(Animal2.prototype);

// Поправяме constructor (иначе сочи към Animal2)
Dog.prototype.constructor = Dog;

// Добавяме метод специфичен за Dog
Dog.prototype.bark = function () {
  console.log(`${this.name} лае: Бау!`);
};

// Предефиниране (override) на метод от родителя
Dog.prototype.speak = function () {
  console.log(`${this.name} лае вместо да говори.`);
};

const rex = new Dog("Рекс", "Овчарка");
rex.bark(); // "Рекс лае: Бау!"
rex.speak(); // "Рекс лае вместо да говори." — override-натият метод

// Веригата: rex → Dog.prototype → Animal2.prototype → Object.prototype → null
console.log(rex instanceof Dog); // true
console.log(rex instanceof Animal2); // true

// =============================================================================
// 8. ES6 класове — синтактична захар върху прототипи
// =============================================================================

// class синтаксисът НЕ е нов механизъм — под капака работи със
// същите прототипи, просто е по-чист за писане.

console.log("\n--- 8. ES6 Classes (sugar over prototypes) ---");

class Shape {
  constructor(color) {
    this.color = color;
  }

  describe() {
    console.log(`Фигура с цвят ${this.color}`);
  }
}

class Circle extends Shape {
  constructor(color, radius) {
    super(color); // = Shape.call(this, color)
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius ** 2;
  }

  // Override
  describe() {
    console.log(`Кръг с радиус ${this.radius} и цвят ${this.color}`);
  }
}

const c = new Circle("зелен", 5);
c.describe(); // "Кръг с радиус 5 и цвят зелен"
console.log(`Лице: ${c.area().toFixed(2)}`); // "Лице: 78.54"

// Под капака:
console.log(c.__proto__ === Circle.prototype); // true
console.log(Circle.prototype.__proto__ === Shape.prototype); // true
console.log(c instanceof Circle); // true
console.log(c instanceof Shape); // true

// Методите са в прототипа, не в инстанцията:
console.log(c.hasOwnProperty("describe")); // false
console.log(Circle.prototype.hasOwnProperty("describe")); // true

// =============================================================================
// 9. Object.prototype — върхът на веригата
// =============================================================================

// Object.prototype е обектът, от който ВСИЧКИ обикновени обекти наследяват.
// Той предоставя вградени методи:

console.log("\n--- 9. Object.prototype ---");

const obj = {};
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true

// Вградени методи от Object.prototype:
console.log(obj.toString()); // "[object Object]"
console.log(obj.hasOwnProperty("x")); // false
console.log(obj.valueOf()); // {}

// Object.prototype.__proto__ === null → краят на веригата
console.log(Object.getPrototypeOf(Object.prototype)); // null

// =============================================================================
// 10. Прототипи на вградени типове
// =============================================================================

console.log("\n--- 10. Built-in prototypes ---");

// Масиви: arr → Array.prototype → Object.prototype → null
const arr = [1, 2, 3];
console.log(arr.__proto__ === Array.prototype); // true
console.log(Array.prototype.__proto__ === Object.prototype); // true
// arr.push(), arr.map() и т.н. идват от Array.prototype

// Функции: fn → Function.prototype → Object.prototype → null
function foo() {}
console.log(foo.__proto__ === Function.prototype); // true
// foo.call(), foo.bind() и т.н. идват от Function.prototype

// Стрингове: (при достъп до методи, примитивът се обвива в обект)
const str = "hello";
console.log(str.__proto__ === String.prototype); // true
// str.toUpperCase(), str.slice() и т.н. идват от String.prototype

// =============================================================================
// 11. Промяна на прототипа на вградени типове (Monkey patching)
// =============================================================================

// Възможно е, но НЕ се препоръчва в production код!

console.log("\n--- 11. Monkey patching ---");

Array.prototype.last = function () {
  return this[this.length - 1];
};

console.log([10, 20, 30].last()); // 30

// Изтриваме, за да не замърсяваме
delete Array.prototype.last;

// =============================================================================
// 12. Проверки: instanceof и isPrototypeOf
// =============================================================================

console.log("\n--- 12. instanceof & isPrototypeOf ---");

// instanceof проверява дали Constructor.prototype се среща
// НЯКЪДЕ в прототипната верига на обекта.

function Foo() {}
function Bar() {}
Bar.prototype = Object.create(Foo.prototype);

const b = new Bar();
console.log(b instanceof Bar); // true
console.log(b instanceof Foo); // true — Foo.prototype е във веригата

// isPrototypeOf — обратната проверка
console.log(Foo.prototype.isPrototypeOf(b)); // true

// =============================================================================
// 13. Object.create() с property descriptors
// =============================================================================

console.log("\n--- 13. Object.create with descriptors ---");

const proto = {
  greet() {
    console.log(`Здравей от ${this.name}`);
  },
};

const person2 = Object.create(proto, {
  name: {
    value: "Петър",
    writable: true,
    enumerable: true,
    configurable: true,
  },
  age: {
    value: 40,
    writable: false, // read-only
    enumerable: true,
    configurable: false,
  },
});

person2.greet(); // "Здравей от Петър"
person2.age = 100; // няма ефект (writable: false), в strict mode хвърля грешка
console.log(person2.age); // 40

// =============================================================================
// 14. Performance: свойства в инстанцията vs в прототипа
// =============================================================================

console.log("\n--- 14. Performance ---");

// Методи в ПРОТОТИПА (препоръчително):
// - Споделят се между всички инстанции → пести памет
// - Един обект в паметта за метода

function EfficientPerson(name) {
  this.name = name; // данни → в инстанцията
}
EfficientPerson.prototype.greet = function () {
  // метод → в прототипа
  console.log(`Аз съм ${this.name}`);
};

// Методи в ИНСТАНЦИЯТА (по-бавно и повече памет):
function InefficientPerson(name) {
  this.name = name;
  this.greet = function () {
    // нова функция за ВСЯКА инстанция!
    console.log(`Аз съм ${this.name}`);
  };
}

const e1 = new EfficientPerson("A");
const e2 = new EfficientPerson("B");
console.log(e1.greet === e2.greet); // true — една функция

const i1 = new InefficientPerson("A");
const i2 = new InefficientPerson("B");
console.log(i1.greet === i2.greet); // false — две различни функции

// =============================================================================
// 15. Обобщение
// =============================================================================

// Ключови точки:
//
// 1. Всеки обект има [[Prototype]] (__proto__) — връзка към друг обект.
//
// 2. Когато свойство не се намери в обекта, се търси нагоре по веригата
//    (prototype chain) до null.
//
// 3. Конструктор функциите имат .prototype свойство — то става __proto__
//    на обектите, създадени с new.
//
// 4. ES6 class е синтактична захар — под капака използва прототипи.
//
// 5. Object.create(proto) създава обект с конкретен прототип.
//
// 6. Задаването на свойство директно на обект "засенчва" (shadow)
//    едноименно свойство от прототипа.
//
// 7. instanceof проверява дали Constructor.prototype е в прототипната
//    верига на обекта.
//
// 8. Методите се слагат в прототипа (споделени), данните — в инстанцията.
//
// Визуализация на prototype chain:
//
//   myObj → Constructor.prototype → Parent.prototype → Object.prototype → null
