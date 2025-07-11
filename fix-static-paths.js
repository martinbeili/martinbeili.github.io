const fs = require("fs");
const path = require("path");

// Function to recursively get all HTML files
function getAllHtmlFiles(dir, files = []) {
    const entries = fs.readdirSync(dir);

    for (const entry of entries) {
        const fullPath = path.join(dir, entry);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            getAllHtmlFiles(fullPath, files);
        } else if (entry.endsWith(".html")) {
            files.push(fullPath);
        }
    }

    return files;
}

// Function to fix paths in HTML content
function fixPaths(content, currentPath) {
    // All files are now in root directory as .html files
    // So we can use ./ for everything
    const prefix = "./";

    // Fix CSS links
    content = content.replace(/href="\/css\//g, `href="${prefix}css/`);

    // Fix image sources
    content = content.replace(/src="\/images\//g, `src="${prefix}images/`);

    // Fix favicon links
    content = content.replace(
        /href="\/images\/favicon\//g,
        `href="${prefix}images/favicon/`
    );
    content = content.replace(/href="\/favicon/g, `href="${prefix}favicon`);
    content = content.replace(
        /href="\/apple-touch-icon/g,
        `href="${prefix}apple-touch-icon`
    );
    content = content.replace(
        /href="\/web-app-manifest/g,
        `href="${prefix}web-app-manifest`
    );

    // Fix navigation links to .html files
    content = content.replace(/href="\/"/g, 'href="./index.html"');
    content = content.replace(/href="\/([^"]+)\.html"/g, 'href="./$1.html"');

    return content;
}

console.log("Converting absolute paths to relative paths for static export...");

const siteDir = path.join(__dirname, "_site");
const htmlFiles = getAllHtmlFiles(siteDir);

htmlFiles.forEach((filePath) => {
    const content = fs.readFileSync(filePath, "utf8");
    const relativePath = path.relative(siteDir, filePath);
    const fixedContent = fixPaths(content, relativePath);

    fs.writeFileSync(filePath, fixedContent);
    console.log(`Fixed: ${relativePath}`);
});

console.log(`\nComplete! Fixed ${htmlFiles.length} HTML files.`);
console.log("Your static website is ready in the _site folder!");
console.log("You can now open _site/index.html directly in a browser.");
