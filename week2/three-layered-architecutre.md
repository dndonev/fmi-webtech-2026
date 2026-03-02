# Three-Layered Architecture (JavaScript + Node.js + MongoDB)

## Lesson Overview

This lesson introduces the **three-layered architecture** pattern and shows how to apply it in a full-stack JavaScript project:

- **Frontend (FE):** JavaScript client (browser)
- **Backend:** Node.js + Express API
- **Database:** MongoDB

---

## Learning Objectives

1. Explain the purpose of each layer.
2. Build a simple API using a layered backend structure.
3. Connect a JavaScript frontend to backend endpoints.
4. Store and retrieve data from MongoDB.
5. Avoid common mistakes (mixing concerns across layers).

---

## What Is Three-Layered Architecture?

Three-layered architecture separates an application into **three logical parts**:

1. **Presentation Layer** (UI / FE)
2. **Business Layer** (Application logic / services)
3. **Data Layer** (Database access)

> Core idea: each layer has a clear job and should not do another layer's work.

---

## The 3 Layers in Our Stack

### 1) Presentation Layer (Frontend)

**Tech:** HTML/CSS/JavaScript (or React/Vue/etc.)

**Responsibilities:**

- Display data to users
- Collect user input
- Call backend APIs (e.g. `fetch`)
- Handle loading/error states

**Should NOT:**

- Contain database queries
- Contain sensitive business rules

---

### 2) Business Layer (Node.js/Express Services)

**Tech:** Node.js + Express

**Responsibilities:**

- Validate input
- Apply business rules
- Coordinate work between controllers and repositories
- Return meaningful HTTP responses

**Should NOT:**

- Render UI
- Contain raw DB logic in route handlers (keep that in data layer)

---

### 3) Data Layer (MongoDB + Mongoose)

**Tech:** MongoDB + Mongoose

**Responsibilities:**

- Define data models/schemas
- Read/write/update/delete records
- Isolate persistence logic

**Should NOT:**

- Know about HTTP requests/responses
- Decide business workflows

---

## Request Flow Example

User creates a task from the frontend:

1. FE sends `POST /api/tasks` with JSON body
2. Controller receives request
3. Service validates and applies business rules
4. Repository/model writes to MongoDB
5. Service returns created task
6. Controller sends HTTP response
7. FE updates the UI

## Minimal Backend Example

### Model (`models/task.model.js`)

```js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    done: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Task", taskSchema);
```

### Repository (`repositories/task.repository.js`)

```js
const Task = require("../models/task.model");

async function createTask(data) {
  return Task.create(data);
}

async function getAllTasks() {
  return Task.find().sort({ createdAt: -1 });
}

module.exports = { createTask, getAllTasks };
```

### Service (`services/task.service.js`)

```js
const taskRepository = require("../repositories/task.repository");

async function createTask(input) {
  if (!input.title || input.title.trim().length < 3) {
    throw new Error("Title must be at least 3 characters long.");
  }

  return taskRepository.createTask({ title: input.title.trim() });
}

async function listTasks() {
  return taskRepository.getAllTasks();
}

module.exports = { createTask, listTasks };
```

### Controller (`controllers/task.controller.js`)

```js
const taskService = require("../services/task.service");

async function create(req, res) {
  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function list(req, res) {
  const tasks = await taskService.listTasks();
  res.json(tasks);
}

module.exports = { create, list };
```

---

## Minimal Frontend Example (`client/app.js`)

```js
const form = document.querySelector("#task-form");
const list = document.querySelector("#task-list");

async function loadTasks() {
  const res = await fetch("/api/tasks");
  const tasks = await res.json();

  list.innerHTML = tasks.map((t) => `<li>${t.title}</li>`).join("");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.querySelector("#title").value;

  await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  form.reset();
  loadTasks();
});

loadTasks();
```

---

## Why This Architecture Helps

- **Maintainability:** clear file boundaries
- **Testability:** services can be tested without HTTP or DB
- **Scalability:** easier to add features and developers
- **Reusability:** services and repositories can be reused
