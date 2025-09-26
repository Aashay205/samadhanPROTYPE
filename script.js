// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navBtns = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and sections
            navBtns.forEach(b => b.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Show corresponding section
            const sectionId = btn.dataset.section;
            document.getElementById(sectionId).classList.add('active');
        });
    });

    // Initialize chat bot
    initChatBot();
    
    // Initialize roadmap generator
    initRoadmapGenerator();
    
    // Initialize progress tracker
    initProgressTracker();
});

// Chat Bot Functionality
function initChatBot() {
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatMessages = document.getElementById('chatMessages');

    const responses = {
        'hello': 'Hello! How can I help you with your learning today?',
        'hi': 'Hi there! What would you like to learn about?',
        'help': 'I can help you with study tips, subject questions, and learning strategies. What do you need help with?',
        'math': 'Mathematics is a great subject! Would you like tips on algebra, geometry, calculus, or general math study strategies?',
        'science': 'Science is fascinating! Are you interested in biology, chemistry, physics, or general science concepts?',
        'history': 'History helps us understand the world! What historical period or topic interests you?',
        'programming': 'Programming is an excellent skill! Are you interested in JavaScript, Python, or another language?',
        'javascript': 'JavaScript is perfect for web development! Start with variables, functions, and DOM manipulation.',
        'python': 'Python is great for beginners! Focus on syntax, data structures, and problem-solving.',
        'study tips': 'Here are some study tips: 1) Take regular breaks 2) Use active recall 3) Practice spaced repetition 4) Find a quiet study space 5) Stay organized',
        'motivation': 'Stay motivated by setting small, achievable goals, celebrating progress, and remembering why you started learning!',
        'time management': 'Try the Pomodoro Technique: study for 25 minutes, then take a 5-minute break. Plan your day and prioritize important tasks.',
        'default': 'That\'s an interesting question! While I may not have a specific answer, I encourage you to explore that topic further through research and practice.'
    };

    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = `<p>${text}</p>`;
        
        messageDiv.appendChild(contentDiv);
        chatMessages.appendChild(messageDiv);
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getBotResponse(userInput) {
        const lowercaseInput = userInput.toLowerCase();
        
        for (const key in responses) {
            if (lowercaseInput.includes(key)) {
                return responses[key];
            }
        }
        
        return responses['default'];
    }

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, true);
            
            setTimeout(() => {
                const response = getBotResponse(message);
                addMessage(response);
            }, 500);
            
            chatInput.value = '';
        }
    }

    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// Roadmap Generator Functionality
function initRoadmapGenerator() {
    const generateBtn = document.getElementById('generateRoadmap');
    const subjectSelect = document.getElementById('subjectSelect');
    const levelSelect = document.getElementById('levelSelect');
    const roadmapDisplay = document.getElementById('roadmapDisplay');

    const roadmaps = {
        javascript: {
            beginner: [
                {
                    title: 'HTML & CSS Basics',
                    description: 'Learn the fundamentals of web structure and styling',
                    duration: '2 weeks'
                },
                {
                    title: 'JavaScript Fundamentals',
                    description: 'Variables, data types, functions, and basic syntax',
                    duration: '3 weeks'
                },
                {
                    title: 'DOM Manipulation',
                    description: 'Learn to interact with web page elements',
                    duration: '2 weeks'
                },
                {
                    title: 'Events and Interactivity',
                    description: 'Handle user interactions and create dynamic content',
                    duration: '2 weeks'
                },
                {
                    title: 'First Project',
                    description: 'Build a simple interactive web application',
                    duration: '1 week'
                }
            ],
            intermediate: [
                {
                    title: 'ES6+ Features',
                    description: 'Arrow functions, destructuring, modules, and more',
                    duration: '2 weeks'
                },
                {
                    title: 'Asynchronous JavaScript',
                    description: 'Promises, async/await, and API calls',
                    duration: '3 weeks'
                },
                {
                    title: 'Error Handling',
                    description: 'Try/catch blocks and debugging techniques',
                    duration: '1 week'
                },
                {
                    title: 'Local Storage & JSON',
                    description: 'Data persistence and JSON manipulation',
                    duration: '1 week'
                },
                {
                    title: 'Intermediate Project',
                    description: 'Build a full-featured web application',
                    duration: '2 weeks'
                }
            ],
            advanced: [
                {
                    title: 'Advanced Patterns',
                    description: 'Closures, prototypes, and design patterns',
                    duration: '3 weeks'
                },
                {
                    title: 'Testing & Debugging',
                    description: 'Unit testing, debugging tools, and best practices',
                    duration: '2 weeks'
                },
                {
                    title: 'Performance Optimization',
                    description: 'Code optimization and performance monitoring',
                    duration: '2 weeks'
                },
                {
                    title: 'Advanced Project',
                    description: 'Build a complex, optimized application',
                    duration: '3 weeks'
                }
            ]
        },
        python: {
            beginner: [
                {
                    title: 'Python Basics',
                    description: 'Syntax, variables, and basic data types',
                    duration: '2 weeks'
                },
                {
                    title: 'Control Structures',
                    description: 'If statements, loops, and logical operators',
                    duration: '2 weeks'
                },
                {
                    title: 'Functions and Modules',
                    description: 'Creating reusable code and importing modules',
                    duration: '2 weeks'
                },
                {
                    title: 'Data Structures',
                    description: 'Lists, dictionaries, tuples, and sets',
                    duration: '2 weeks'
                },
                {
                    title: 'First Python Project',
                    description: 'Build a simple command-line application',
                    duration: '1 week'
                }
            ],
            intermediate: [
                {
                    title: 'Object-Oriented Programming',
                    description: 'Classes, objects, inheritance, and polymorphism',
                    duration: '3 weeks'
                },
                {
                    title: 'File Handling',
                    description: 'Reading, writing, and manipulating files',
                    duration: '1 week'
                },
                {
                    title: 'Error Handling',
                    description: 'Exception handling and debugging',
                    duration: '1 week'
                },
                {
                    title: 'Libraries and APIs',
                    description: 'Working with external libraries and web APIs',
                    duration: '2 weeks'
                },
                {
                    title: 'Web Scraping Project',
                    description: 'Build a data collection application',
                    duration: '2 weeks'
                }
            ],
            advanced: [
                {
                    title: 'Advanced Data Structures',
                    description: 'Generators, decorators, and context managers',
                    duration: '2 weeks'
                },
                {
                    title: 'Database Integration',
                    description: 'SQLite, PostgreSQL, and ORMs',
                    duration: '3 weeks'
                },
                {
                    title: 'Testing and Documentation',
                    description: 'Unit testing, docstrings, and best practices',
                    duration: '2 weeks'
                },
                {
                    title: 'Advanced Project',
                    description: 'Build a full-stack Python application',
                    duration: '3 weeks'
                }
            ]
        },
        math: {
            beginner: [
                {
                    title: 'Basic Arithmetic',
                    description: 'Addition, subtraction, multiplication, division',
                    duration: '1 week'
                },
                {
                    title: 'Fractions and Decimals',
                    description: 'Understanding and working with fractions and decimals',
                    duration: '2 weeks'
                },
                {
                    title: 'Basic Geometry',
                    description: 'Shapes, perimeter, and area calculations',
                    duration: '2 weeks'
                },
                {
                    title: 'Introduction to Algebra',
                    description: 'Variables and simple equations',
                    duration: '2 weeks'
                }
            ],
            intermediate: [
                {
                    title: 'Algebraic Equations',
                    description: 'Solving linear and quadratic equations',
                    duration: '3 weeks'
                },
                {
                    title: 'Coordinate Geometry',
                    description: 'Graphing and coordinate systems',
                    duration: '2 weeks'
                },
                {
                    title: 'Trigonometry Basics',
                    description: 'Sin, cos, tan, and basic trigonometric functions',
                    duration: '3 weeks'
                },
                {
                    title: 'Statistics and Probability',
                    description: 'Mean, median, mode, and basic probability',
                    duration: '2 weeks'
                }
            ],
            advanced: [
                {
                    title: 'Calculus Introduction',
                    description: 'Limits, derivatives, and basic integration',
                    duration: '4 weeks'
                },
                {
                    title: 'Advanced Trigonometry',
                    description: 'Complex trigonometric identities and applications',
                    duration: '3 weeks'
                },
                {
                    title: 'Linear Algebra',
                    description: 'Matrices, vectors, and linear transformations',
                    duration: '3 weeks'
                }
            ]
        }
    };

    generateBtn.addEventListener('click', () => {
        const subject = subjectSelect.value;
        const level = levelSelect.value;

        if (!subject || !level) {
            alert('Please select both subject and level');
            return;
        }

        generateRoadmap(subject, level, roadmaps);
    });

    function generateRoadmap(subject, level, roadmaps) {
        roadmapDisplay.innerHTML = '';
        roadmapDisplay.classList.add('show');

        const roadmapData = roadmaps[subject] && roadmaps[subject][level] 
            ? roadmaps[subject][level] 
            : [
                {
                    title: 'Getting Started',
                    description: `Begin your ${subject} journey with foundational concepts`,
                    duration: '2 weeks'
                },
                {
                    title: 'Building Skills',
                    description: 'Practice and develop your understanding',
                    duration: '3 weeks'
                },
                {
                    title: 'Apply Knowledge',
                    description: 'Work on projects to reinforce learning',
                    duration: '2 weeks'
                }
            ];

        roadmapData.forEach((item, index) => {
            const roadmapItem = document.createElement('div');
            roadmapItem.className = 'roadmap-item';
            roadmapItem.innerHTML = `
                <h3>Step ${index + 1}: ${item.title}</h3>
                <p>${item.description}</p>
                <div class="duration">Estimated duration: ${item.duration}</div>
            `;
            roadmapDisplay.appendChild(roadmapItem);
        });
    }
}

// Progress Tracker Functionality
function initProgressTracker() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const tasksContainer = document.getElementById('tasksContainer');
    const totalTasksSpan = document.getElementById('totalTasks');
    const completedTasksSpan = document.getElementById('completedTasks');
    const progressPercentageSpan = document.getElementById('progressPercentage');

    let tasks = JSON.parse(localStorage.getItem('edupath-tasks') || '[]');

    function saveTasks() {
        localStorage.setItem('edupath-tasks', JSON.stringify(tasks));
    }

    function updateStats() {
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.completed).length;
        const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

        totalTasksSpan.textContent = totalTasks;
        completedTasksSpan.textContent = completedTasks;
        progressPercentageSpan.textContent = percentage + '%';
    }

    function renderTasks() {
        tasksContainer.innerHTML = '';

        if (tasks.length === 0) {
            tasksContainer.innerHTML = '<p style="text-align: center; color: #64748b; padding: 2rem;">No learning goals added yet. Start by adding your first goal above!</p>';
            return;
        }

        tasks.forEach((task, index) => {
            const taskElement = document.createElement('div');
            taskElement.className = `task-item ${task.completed ? 'completed' : ''}`;
            
            taskElement.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} data-index="${index}">
                <span class="task-text">${task.text}</span>
                <button class="delete-task" data-index="${index}">Delete</button>
            `;

            tasksContainer.appendChild(taskElement);
        });

        // Add event listeners to checkboxes and delete buttons
        document.querySelectorAll('.task-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const index = parseInt(e.target.dataset.index);
                tasks[index].completed = e.target.checked;
                saveTasks();
                updateStats();
                renderTasks();
            });
        });

        document.querySelectorAll('.delete-task').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                tasks.splice(index, 1);
                saveTasks();
                updateStats();
                renderTasks();
            });
        });
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({
                text: taskText,
                completed: false,
                createdAt: new Date().toISOString()
            });
            saveTasks();
            updateStats();
            renderTasks();
            taskInput.value = '';
        }
    }

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Initialize
    updateStats();
    renderTasks();
}