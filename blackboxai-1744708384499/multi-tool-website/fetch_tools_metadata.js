const axios = require('axios');

// GitHub repository details
const GITHUB_REPO = 'https://api.github.com/repos/premcoolOO7/blackboxai-1744864618478/contents';

const tools = [];

// Recursive function to fetch files from GitHub repo path
async function fetchFiles(path = '') {
    try {
        const url = path ? \`\${GITHUB_REPO}/\${path}\` : GITHUB_REPO;
        const response = await axios.get(url);
        const items = response.data;

        for (const item of items) {
            if (item.type === 'file') {
                // Categorize tool based on path
                const category = path.split('/')[0] || 'root';
                tools.push({
                    name: item.name,
                    path: item.path,
                    download_url: item.download_url,
                    size: item.size,
                    last_modified: item.last_modified,
                    category: category
                });
            } else if (item.type === 'dir') {
                await fetchFiles(item.path);
            }
        }
    } catch (error) {
        console.error('Error fetching files:', error.message);
    }
}

// Function to fetch tools metadata from GitHub
async function fetchToolsMetadata() {
    await fetchFiles();
    console.log('Fetched Tools Metadata:', tools);
}

// Execute the function
fetchToolsMetadata();
