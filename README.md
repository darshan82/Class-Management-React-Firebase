# Class Management Dashboard — React + Firebase

A dashboard for private tutors and teachers to run their classes in one place: manage students and classes, schedule lessons on a calendar, track earnings and expenses, and collect student feedback. Built with React and Firebase (Auth, Firestore, Storage) and deployed on Firebase Hosting.

![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black)
![MUI](https://img.shields.io/badge/MUI-007FFF?logo=mui&logoColor=white)
![styled-components](https://img.shields.io/badge/styled--components-DB7093?logo=styledcomponents&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?logo=chartdotjs&logoColor=white)

## Features

- **Authentication** – sign up / login with Firebase Auth and protected routes
- **Dashboard overview** – summary cards, revenue chart, upcoming lessons, recent transactions and student performance
- **Class management** – create, edit and delete classes with fuzzy search (Fuse.js)
- **Students** – add, edit and track students
- **Schedule** – interactive calendar (FullCalendar) to create and edit lessons
- **Finances** – record earnings and expenses, financial report with charts and CSV export of transactions
- **Feedback** – collect and review feedback
- Form validation with React Hook Form + Yup, toast notifications, modals

## Tech stack

| Area        | Tools                                                     |
| ----------- | --------------------------------------------------------- |
| UI          | React 17, React Router 6, MUI, styled-components          |
| Backend     | Firebase Auth, Cloud Firestore, Storage, Hosting          |
| Forms       | React Hook Form, Yup                                      |
| Charts      | Chart.js, react-chartjs-2                                 |
| Calendar    | FullCalendar                                              |
| Utilities   | Fuse.js, Moment, react-toastify, react-json-csv           |

## Project structure

```
src/
├── pages/          # Login, SignUp, Dashboard, ManageClass, Students, Schedule, FinancialReport, Feedback
├── Components/     # Reusable UI: tables, modals, cards, calendar, sidebar, notifications
├── Contexts/       # AuthContext and CalenderContext (global state)
├── database/       # Firebase init + Firestore helper functions
├── themes/         # Global styles and theme tokens
└── App.routes.js   # Public and private routes
```

## Getting started

**Requirements:** Node.js 16+, Yarn, a Firebase project with Auth (email/password) and Firestore enabled

```bash
git clone https://github.com/darshan82/Class-Management-React-Firebase.git
cd Class-Management-React-Firebase
yarn install
cp .env.example .env      # add your Firebase config values
yarn start                # http://localhost:3000
```

| Script       | Description              |
| ------------ | ------------------------ |
| `yarn start` | Run the dev server       |
| `yarn build` | Build for production     |
| `yarn test`  | Run tests                |

### Firestore security rules

Rules for each collection are in [`firestore.rules`](firestore.rules). Paste them into **Firebase console → Firestore → Rules**, or deploy them with the Firebase CLI.

### Deploy

```bash
yarn build
firebase deploy --only hosting
```

## Author

**Darshan Lal** — Full-Stack Developer
[Portfolio](https://darshan-portfolio-one.vercel.app/) · [GitHub](https://github.com/darshan82)
