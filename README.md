# Workasana Frontend

## Project Overview

Workasana Frontend is the client-side application of the Workasana Project Management System. It provides a responsive and user-friendly interface to manage projects, tasks, teams, and reports.

Users can create projects, assign tasks, manage teams, track progress, and visualize reports in a single platform.

---

## Features

* User Authentication (Login / Register)
* Dashboard Overview
* Create, Edit, Delete Projects
* Create, Edit, Delete Tasks
* Team Management
* Task Assignment to Owners
* Search Projects
* Task Status Tracking
* Reports Dashboard with Charts
* Responsive Sidebar Navigation
* Protected Routes
* Toast Notifications
* Project Details Page
* Mobile Responsive Design

---

## Tech Stack

* React.js
* Tailwind CSS
* React Router DOM
* Axios
* React Toastify
* Recharts

---

## Quick Start

### Clone Repository

```bash
git clone [https://github.com/binayjy8/WORKASANA-FRONT-UI.git]
cd workasana-frontend
```

### Install Dependencies

```bash
npm install
```

### Run Project

```bash
npm run dev
```

---

## API Reference

### Authentication

#### Login User

```http
POST /api/auth/login
```

Sample Request:

```json
{
  "email": "string",
  "password": "string"
}
```

Sample Response:

```json
{
  "message": "string",
  "token": "string"
}
```

---

#### Register User

```http
POST /api/auth/register
```

Sample Request:

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

Sample Response:

```json
{
  "message": "string",
  "user": {
    "id": "string",
    "name": "string",
    "email": "string"
  }
}
```

---

### Projects

#### Get Projects

```http
GET /api/projects
```

Sample Response:

```json
[
  {
    "_id": "string",
    "name": "string",
    "description": "string"
  }
]
```

---

#### Create Project

```http
POST /api/projects
```

Sample Request:

```json
{
  "name": "string",
  "description": "string"
}
```

---

### Tasks

#### Get Tasks

```http
GET /api/tasks
```

Sample Response:

```json
{
  "tasks": [
    {
      "_id": "string",
      "name": "string",
      "status": "string",
      "priority": "string",
      "timeToComplete": "number"
    }
  ]
}
```

---

#### Create Task

```http
POST /api/tasks
```

Sample Request:

```json
{
  "name": "string",
  "project": "string",
  "team": "string",
  "owners": ["string"],
  "priority": "string",
  "status": "string",
  "dueDate": "date",
  "timeToComplete": "number",
  "tags": ["string"]
}
```

---

### Teams

#### Get Teams

```http
GET /api/teams
```

Sample Response:

```json
[
  {
    "_id": "string",
    "name": "string"
  }
]
```

---

## Screenshots

Add screenshots here:

* Login Page
* Register Page
* Dashboard
* Projects Page
* Tasks Page
* Teams Page
* Reports Page
* Mobile View

---

## Live Working Link

Frontend Live URL:
[https://workasana-front-ui.vercel.app/]

Backend Live URL:

[https://workasana-backend-iota.vercel.app/]

---

## Demo Video

Demo Video Link:

[https://drive.google.com/file/d/11Vv6l04D8H7sOVhT4mcAH7SY-6vahiTd/view?usp=drive_link]

---

## Author

Developed by **Binaybhusan Mohanta**

## Contact

Email: [mohantabinaybhusan@gmail.com]



