const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

const miniProjectsPath = path.join(__dirname, 'mini-projects');

// Serve the main project's public folder
app.use(express.static(path.join(__dirname, 'public')));

// Read all project folders dynamically
const projects = fs.readdirSync(miniProjectsPath).filter(folder => 
    fs.statSync(path.join(miniProjectsPath, folder)).isDirectory()
);

// Serve all mini-projects' public folders
projects.forEach(project => {
    app.use(`/${project}`, express.static(path.join(miniProjectsPath, project, 'public')));

    // Import and mount the project router
    const projectRouterPath = path.join(miniProjectsPath, project, 'index.js');
    if (fs.existsSync(projectRouterPath)) {
        const projectRouter = require(projectRouterPath);
        app.use(`/${project}`, projectRouter);
    }
});

app.listen(PORT, () => {
    console.log(`Main project running at http://localhost:${PORT}`);
    console.log(`Loaded projects: ${projects.join(', ')}`);
});
