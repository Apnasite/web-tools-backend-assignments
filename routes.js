const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const miniProjectsPath = path.join(__dirname, 'mini-projects');

// Dynamically load all mini-projects
fs.readdirSync(miniProjectsPath).forEach((project) => {
    const projectRoutes = path.join(miniProjectsPath, project, 'routes.js');
    if (fs.existsSync(projectRoutes)) {
        const routes = require(projectRoutes);
        router.use(`/${project}`, routes);
    }
});

module.exports = router;
