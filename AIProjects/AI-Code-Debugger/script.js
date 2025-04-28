// Initialize Gemini API
const GEMINI_API_KEY = 'Your_API_KEY';

// Initialize highlight.js
document.addEventListener('DOMContentLoaded', () => {
    hljs.highlightAll();
});

function formatCode() {
    const codeInput = document.getElementById('codeInput');
    const language = document.getElementById('language').value;
    const code = codeInput.value;
    
    // Basic formatting (you can enhance this with a proper formatter)
    const formattedCode = code
        .replace(/\t/g, '    ') // Convert tabs to spaces
        .replace(/\n\s*\n\s*\n/g, '\n\n') // Remove multiple empty lines
        .trim();
    
    codeInput.value = formattedCode;
}

async function analyzeCode() {
    const code = document.getElementById('codeInput').value;
    const language = document.getElementById('language').value;
    
    if (!code.trim()) {
        showError('Please enter some code to analyze');
        return;
    }

    const prompt = `Analyze the following ${language} code and provide a detailed explanation of its functionality, structure, and potential improvements:

    ${code}

    Please provide:
    1. Code Overview
    2. Main Components/Functions
    3. Data Flow
    4. Potential Improvements
    5. Best Practices Used
    6. Areas for Enhancement

    Format the response in a clear, structured way without using markdown formatting.`;

    await processCode(prompt, 'Analysis Results');
}

async function findBugs() {
    const code = document.getElementById('codeInput').value;
    const language = document.getElementById('language').value;
    
    if (!code.trim()) {
        showError('Please enter some code to analyze for bugs');
        return;
    }

    const prompt = `Find potential bugs, errors, and issues in the following ${language} code:

    ${code}

    Please provide:
    1. List of Potential Bugs
    2. Error Explanations
    3. Line Numbers (if applicable)
    4. Suggested Fixes
    5. Prevention Tips
    6. Testing Recommendations

    Format the response in a clear, structured way without using markdown formatting.`;

    await processCode(prompt, 'Bug Analysis');
}

async function optimizeCode() {
    const code = document.getElementById('codeInput').value;
    const language = document.getElementById('language').value;
    
    if (!code.trim()) {
        showError('Please enter some code to optimize');
        return;
    }

    const prompt = `Optimize the following ${language} code for better performance, readability, and maintainability:

    ${code}

    Please provide:
    1. Current Code Analysis
    2. Optimization Suggestions
    3. Performance Improvements
    4. Code Style Enhancements
    5. Best Practices Implementation
    6. Optimized Code Example

    Format the response in a clear, structured way without using markdown formatting.`;

    await processCode(prompt, 'Optimization Results');
}

async function processCode(prompt, title) {
    const loading = document.getElementById('loading');
    const results = document.getElementById('results');
    
    loading.style.display = 'block';
    results.innerHTML = '';

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            let content = data.candidates[0].content.parts[0].text;
            
            // Clean up the response
            content = content
                .replace(/\*\*/g, '') // Remove bold markdown
                .replace(/\*/g, '')   // Remove italic markdown
                .replace(/\n\n/g, '<br><br>') // Preserve paragraph breaks
                .replace(/\n/g, '<br>'); // Convert single line breaks to HTML

            // Add section styling
            content = content
                .replace(/1\./g, '<h3 class="section-title">')
                .replace(/2\./g, '</h3><h3 class="section-title">')
                .replace(/3\./g, '</h3><h3 class="section-title">')
                .replace(/4\./g, '</h3><h3 class="section-title">')
                .replace(/5\./g, '</h3><h3 class="section-title">')
                .replace(/6\./g, '</h3><h3 class="section-title">');

            results.innerHTML = `<div class="analysis-results">${content}</div>`;
        } else {
            throw new Error("Invalid response format from Gemini API");
        }
    } catch (error) {
        showError(`Error: ${error.message}<br>Please try again later.`);
        console.error("Error details:", error);
    } finally {
        loading.style.display = 'none';
    }
}

function showError(message) {
    const results = document.getElementById('results');
    results.innerHTML = `<div class="error">${message}</div>`;
}

function clearResults() {
    document.getElementById('results').innerHTML = '';
} 