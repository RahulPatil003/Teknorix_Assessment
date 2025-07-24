#  Teknorix Job Portal
  A ReactJS-based frontend application that lists real-time job openings using Jobsoid's public API. 
  The app supports search, filter, and job detail views, with clean styling using LESS and navigation via React Router.

## Features:
  -  Real-time search and filtering
  -  Filter by Department, Location, and Function
  -  Clear individual or all filters
  -  View detailed job information
  -  Apply via external URL
  -  Fully responsive and styled using LESS

## Api Documentation:
  [Click here](https://apidocs.jobsoid.com/)

## Getting_started:
- Clone the Repo
```bash
git clone https://github.com/your-username/your-project-name.git
cd your-project-name
```
- Install Dependencies  
```bash
npm install
```
- Start the Server
```bash
npm start
```
- Server will be running at
```bash
http://localhost:3000/
```
  
folder_structure:
```bash
  - src/
    - api/
      - jobsoid.js
    - components/
      - JobList.jsx
      - JobDetails.jsx
    - styles/
      - JobList.less
      - JobDetails.less
    - App.jsx
    - index.js
  - public/
  - package.json
  - README.md
```



