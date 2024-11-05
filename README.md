# employee-mgmt-dockerized

## Project Plan

1. Set up the project structure.
2. Build the backend (Node.js + Express).
3. Create the frontend (React).
4. Dockerize both parts (multi-stage build).
5. Run everything with Docker Compose.
6. Host with NGINX.
7. Deploy on Azure.

### 1. Project Plan

**Goal:** Build an Employee Registration System with separate backend and frontend services, Dockerize each part, run with Docker Compose, and deploy on Azure using NGINX as a reverse proxy.

### 2. Set up the Project Structure

**Create a Project Folder:**

```bash
mkdir employee-registration-system
cd employee-registration-system
```

**Set up Separate Folders:**

```bash
mkdir backend frontend
```

**Initialize Git and create branches:**

```bash
git init
git checkout -b dev
```

### 3. Build the Backend (Node.js + Express)

**Navigate to the Backend Folder:**

```bash
cd backend
```

**Initialize a New Node.js Project:**

```bash
npm init -y
```

**Install Dependencies:**

```bash
npm install express mongoose dotenv
```

**Create Server Files:**

**Create `index.js`:**

**Test the Backend:**

```bash
node index.js
```

Go to `http://localhost:5000` to check if the server responds with "Employee Registration System Backend".

### 4. Create the Frontend (React)

**Navigate to the Main Project Folder and then to the Frontend:**

```bash
cd ../frontend
```

**Initialize a New React App:**

```bash
npx create-react-app .
```

**Create a Frontend Structure:**

export default App;
```

**Run the Frontend:**

```bash
npm start
```

Go to `http://localhost:3000` to see the basic frontend.