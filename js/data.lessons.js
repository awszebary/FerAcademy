const LESSONS = [
  {
    id: "html-101",
    title: "HTML Basics",
    category: "Web Development",
    description: "Learn basic HTML tags in 5 minutes.",
    duration: "5m",
    video: "assets/videos/html_intro.mp4",
    pdf: "assets/pdfs/html_notes.pdf",
    image: "assets/images/img1.jpeg",
    flashcards: [
      { front: "What does HTML stand for?", back: "HyperText Markup Language" },
      { front: "Tag for paragraph?", back: "<p>" },
      { front: "Tag for heading?", back: "<h1> to <h6>" },
      { front: "What is a div element?", back: "A container element for grouping content" }
    ],
    quiz: [
      { q: "Which tag creates a link?", options: ["<a>", "<p>", "<h1>", "<img>"], correctIndex: 0 },
      { q: "Which tag shows an image?", options: ["<img>", "<image>", "<src>", "<pic>"], correctIndex: 0 },
      { q: "What does HTML stand for?", options: ["Hyper Tool Markup Language", "HyperText Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"], correctIndex: 1 }
    ]
  },
  {
    id: "css-101",
    title: "CSS Fundamentals",
    category: "Web Development",
    description: "Master CSS styling and layouts quickly.",
    duration: "7m",
    video: "assets/videos/css_intro.mp4",
    pdf: "assets/pdfs/css_notes.pdf",
    image: "assets/images/img2.jpeg",
    flashcards: [
      { front: "What does CSS stand for?", back: "Cascading Style Sheets" },
      { front: "How to select a class?", back: ".classname" },
      { front: "How to select an ID?", back: "#idname" },
      { front: "What is flexbox?", back: "A layout model for arranging items in rows or columns" }
    ],
    quiz: [
      { q: "Which property changes text color?", options: ["color", "text-color", "font-color", "text"], correctIndex: 0 },
      { q: "How do you select an element with id='main'?", options: ["#main", ".main", "main", "*main"], correctIndex: 0 },
      { q: "Which CSS property controls text size?", options: ["text-size", "font-style", "font-size", "text-style"], correctIndex: 2 }
    ]
  },
  {
    id: "js-101",
    title: "JavaScript Essentials",
    category: "Programming",
    description: "Learn JavaScript basics and DOM manipulation.",
    duration: "10m",
    video: "assets/videos/js_intro.mp4",
    pdf: "assets/pdfs/js_notes.pdf",
    image: "assets/images/img3.jpeg",
    flashcards: [
      { front: "What is a variable?", back: "A container for storing data values" },
      { front: "How to declare a constant?", back: "const variableName = value" },
      { front: "What is the DOM?", back: "Document Object Model - tree representation of HTML" },
      { front: "What is an event listener?", back: "A function that waits for and responds to events" }
    ],
    quiz: [
      { q: "Which keyword declares a variable that can be reassigned?", options: ["const", "let", "var", "both b and c"], correctIndex: 3 },
      { q: "How do you select an element by ID?", options: ["document.getElement('id')", "document.getElementById('id')", "document.querySelector('id')", "document.id('id')"], correctIndex: 1 },
      { q: "What does console.log() do?", options: ["Creates a log file", "Prints to the browser console", "Logs user in", "Creates a variable"], correctIndex: 1 }
    ]
  },
  {
    id: "react-101",
    title: "React Introduction",
    category: "Frameworks",
    description: "Get started with React components and hooks.",
    duration: "12m",
    video: null,
    pdf: "assets/pdfs/react_notes.pdf",
    image: "assets/images/img4.jpeg",
    flashcards: [
      { front: "What is React?", back: "A JavaScript library for building user interfaces" },
      { front: "What is JSX?", back: "JavaScript XML - syntax extension for JavaScript" },
      { front: "What is a component?", back: "Reusable piece of UI" },
      { front: "What is useState?", back: "A React hook for managing state in functional components" }
    ],
    quiz: [
      { q: "What is a React component?", options: ["A function or class that returns JSX", "A CSS file", "A database", "An API"], correctIndex: 0 },
      { q: "Which hook is used for state management?", options: ["useEffect", "useState", "useContext", "useReducer"], correctIndex: 1 },
      { q: "What is the virtual DOM?", options: ["A real DOM", "A lightweight copy of the real DOM", "A database", "A CSS framework"], correctIndex: 1 }
    ]
  },
  {
    id: "python-101",
    title: "Python Basics",
    category: "Programming",
    description: "Start your Python journey with fundamentals.",
    duration: "8m",
    video: "assets/videos/python_intro.mp4",
    pdf: "assets/pdfs/python_notes.pdf",
    image: "assets/images/img5.jpeg",
    flashcards: [
      { front: "How to print in Python?", back: "print('Hello')" },
      { front: "How to create a list?", back: "my_list = []" },
      { front: "What is a function?", back: "Reusable block of code defined with def" },
      { front: "How to comment in Python?", back: "# for single line, ''' ''' for multi-line" }
    ],
    quiz: [
      { q: "Which is the correct way to create a variable?", options: ["int x = 5", "x = 5", "var x = 5", "let x = 5"], correctIndex: 1 },
      { q: "What is the output of: print(type([]))?", options: ["<class 'dict'>", "<class 'list'>", "<class 'tuple'>", "<class 'set'>"], correctIndex: 1 },
      { q: "How do you start a function definition?", options: ["function myFunc():", "def myFunc():", "func myFunc():", "define myFunc():"], correctIndex: 1 }
    ]
  },
  {
    id: "git-101",
    title: "Git Version Control",
    category: "Tools",
    description: "Master Git basics for version control.",
    duration: "6m",
    video: null,
    pdf: "assets/pdfs/git_notes.pdf",
    image: "assets/images/img6.jpeg",
    flashcards: [
      { front: "What is Git?", back: "A distributed version control system" },
      { front: "Command to initialize a repo?", back: "git init" },
      { front: "Command to save changes?", back: "git commit -m 'message'" },
      { front: "Command to create a branch?", back: "git branch branch-name" }
    ],
    quiz: [
      { q: "Which command stages all files?", options: ["git add .", "git commit .", "git push .", "git stage ."], correctIndex: 0 },
      { q: "What does 'git clone' do?", options: ["Creates a new repository", "Copies a remote repository", "Deletes a repository", "Updates a repository"], correctIndex: 1 },
      { q: "Which command shows commit history?", options: ["git history", "git show", "git log", "git commits"], correctIndex: 2 }
    ]
  }
];
