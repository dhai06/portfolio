export interface ItemDetails {
    title: string;
    description: string;
    tags?: string[];
    relatedLinks?: { label: string; url: string }[];
    // Customizable media section for the modal
    media?: {
        type: 'images' | 'text';
        images?: string[]; // Array of image paths for carousel/gallery
        text?: string; // Custom text content
    };
}

export interface ImageItem {
    src: string;
    id: string;
    likeSummary: string;
    details: ItemDetails;
}

export interface PromptData {
    question: string;
    answer: string;
    id?: string;
    likeSummary?: string;
    details?: ItemDetails;
}

export interface InfoPill {
    icon?: string;
    label: string;
}

export interface CardData {
    id: string;
    type: 'about' | 'project' | 'contact';
    name: string;
    verified?: boolean;
    // Main page content
    images: ImageItem[];
    prompts: PromptData[];
    infoPills: InfoPill[];
    // Details page content (separate from main page) - REMOVED
    // Technical details (links, stack, etc.)
    details: {
        stack?: string[];
        github?: string;
        demo?: string;
        email?: string;
        socials?: { label: string; url: string }[];
    };
}

export const portfolioData: CardData[] = [
    {
        id: '1',
        type: 'about',
        name: 'WIP - Daniel Hai - WIP',
        verified: false,
        // MAIN PAGE CONTENT
        images: [{
            src: '/images/DSCF7233.JPG',
            id: 'about-img-1',
            likeSummary: 'My about me',
            details: {
                title: 'My interests',
                description: 'hint: keep hitting the heart on blocks to see more details :)',
                tags: ['Random Projects', 'Formula 1', 'Cooking', 'Swimming', 'Fashion', 'Working Out', 'Playing Piano', 'Discovering Restaurants', 'Mechanical Keyboards', 'Watching TV Shows']
            }
        }],
        prompts: [
            {
                question: 'ignore',
                answer: 'ignore',
                id: 'about-prompt-1',
                likeSummary: 'Intro section',
                details: {
                    title: 'Introduction',
                    description: 'Welcome to my portfolio! I\'m passionate about building innovative solutions.',
                    tags: ['About', 'Introduction']
                }
            },
            {
                question: 'I\'m currently working on',
                answer: 'An automated project management app that dynamically adjusts timelines based on project dependencies and delays.',
                id: 'about-prompt-2',
                likeSummary: 'Current project: automated project management app',
                details: {
                    title: 'Current Project',
                    description: 'Building an intelligent project management system that uses AI to predict delays and automatically reschedule dependent tasks.',
                    tags: ['AI', 'Project Management', 'Automation'],
                    relatedLinks: [{ label: 'View Progress', url: '#' }]
                }
            },
            {
                question: 'My music taste',
                answer: 'maybe do a carousel animation below this?',
                id: 'about-prompt-3',
                likeSummary: 'My music taste',
                details: {
                    title: 'Music Taste',
                    description: 'These are my favourite artists/bands, and my spotify wrapped from the last 4 years.',
                    tags: ['wave to earth', 'keshi', 'Jay Chou', 'yung kai', 'grentperez', 'Eric Chou', 'Crowd Lu', 'Jannabi', 'The Black Skirts', 'Nerd Connection'],
                    // Add your images here - replace with your Spotify wrapped images
                    media: {
                        type: 'images',
                        images: [
                            '/images/spotify-wrapped/IMG_4577.JPG',
                            '/images/spotify-wrapped/IMG_1504.JPG',
                            '/images/spotify-wrapped/IMG_8276.JPG',
                            '/images/spotify-wrapped/IMG_7009.JPG',




                        ]
                    }
                }
            },
            {
                question: 'My favourite shows and movies',
                answer: 'another carousel animation?',
                id: 'about-prompt-4',
                likeSummary: 'Favourite shows and movies',
                details: {
                    title: 'Entertainment',
                    description: 'Love sci-fi, documentaries, and thought-provoking dramas.',
                    tags: ['Movies', 'TV Shows', 'Entertainment']
                }
            },
            {
                question: 'A fact about me is that',
                answer: 'I competed at the 2024 Canadian Olmypic Swimming Trials.',
                id: 'about-prompt-5',
                likeSummary: 'Swimming!',
                details: {
                    title: 'Olympic Trials',
                    description: 'Competed in the 2024 Canadian Olympic Swimming Trials, representing years of dedication to competitive swimming.',
                    tags: ['Swimming', 'Athletics', 'Achievement']
                }
            },
        ],
        infoPills: [
            { label: 'Your Title' },
            { label: 'Location' },
            { label: 'Skill 1' },
            { label: 'Skill 2' },
        ],
        // DETAILS PAGE CONTENT REMOVED
        details: {
            stack: ['Skill 1', 'Skill 2', 'Skill 3'],
        },
    },
    {
        id: '2',
        type: 'project',
        name: 'Project One',
        verified: false,
        // MAIN PAGE CONTENT
        images: [{
            src: '/images/placeholder.png',
            id: 'proj1-img-1',
            likeSummary: 'Project One screenshot',
            details: {
                title: 'Project One',
                description: 'A powerful application that solves real-world problems with elegant code.',
                tags: ['React', 'TypeScript', 'Node.js'],
                relatedLinks: [{ label: 'View Demo', url: 'https://project-one-demo.com' }]
            }
        }],
        prompts: [
            {
                question: 'What it does',
                answer: 'Describe your first project and what problems it solves.',
                id: 'proj1-prompt-1',
                likeSummary: 'Project One: what it does',
                details: {
                    title: 'Project Overview',
                    description: 'This project tackles common pain points with innovative solutions.',
                    tags: ['Overview', 'Features']
                }
            },
        ],
        infoPills: [
            { label: 'Technology 1' },
            { label: 'Technology 2' },
        ],
        // DETAILS PAGE CONTENT REMOVED
        details: {
            stack: ['React', 'TypeScript', 'Node.js'],
            github: 'https://github.com/yourusername/project-one',
            demo: 'https://project-one-demo.com',
        },
    },
    {
        id: '3',
        type: 'project',
        name: 'Project Two',
        verified: false,
        // MAIN PAGE CONTENT
        images: [{
            src: '/images/placeholder.png',
            id: 'proj2-img-1',
            likeSummary: 'Project Two screenshot',
            details: {
                title: 'Project Two',
                description: 'A full-stack application showcasing modern web development practices.',
                tags: ['Next.js', 'PostgreSQL', 'Tailwind'],
                relatedLinks: [{ label: 'View Demo', url: 'https://project-two-demo.com' }]
            }
        }],
        prompts: [
            {
                question: 'The challenge',
                answer: 'Explain the main challenge or goal of this project.',
                id: 'proj2-prompt-1',
                likeSummary: 'Project Two: the challenge',
                details: {
                    title: 'The Challenge',
                    description: 'This project solved complex technical challenges with creative solutions.',
                    tags: ['Challenge', 'Problem Solving']
                }
            },
        ],
        infoPills: [
            { label: 'Next.js' },
            { label: 'PostgreSQL' },
        ],
        // DETAILS PAGE CONTENT REMOVED
        details: {
            stack: ['Next.js', 'PostgreSQL', 'Tailwind'],
            github: 'https://github.com/yourusername/project-two',
            demo: 'https://project-two-demo.com',
        },
    },
    {
        id: '4',
        type: 'project',
        name: 'Project Three',
        verified: false,
        // MAIN PAGE CONTENT
        images: [{
            src: '/images/placeholder.png',
            id: 'proj3-img-1',
            likeSummary: 'Project Three screenshot',
            details: {
                title: 'Project Three',
                description: 'A Python-based backend service demonstrating API design excellence.',
                tags: ['Python', 'FastAPI', 'Docker'],
                relatedLinks: [{ label: 'View Demo', url: 'https://project-three-demo.com' }]
            }
        }],
        prompts: [
            {
                question: 'Why I built this',
                answer: 'Share your motivation and what you learned.',
                id: 'proj3-prompt-1',
                likeSummary: 'Project Three: motivation',
                details: {
                    title: 'Motivation',
                    description: 'Built to explore new technologies and push my development skills further.',
                    tags: ['Learning', 'Growth']
                }
            },
        ],
        infoPills: [
            { label: 'Python' },
            { label: 'FastAPI' },
        ],
        // DETAILS PAGE CONTENT REMOVED
        details: {
            stack: ['Python', 'FastAPI', 'Docker'],
            github: 'https://github.com/yourusername/project-three',
            demo: 'https://project-three-demo.com',
        },
    },
    {
        id: '5',
        type: 'contact',
        name: 'Get In Touch',
        verified: false,
        // MAIN PAGE CONTENT
        images: [{
            src: '/images/placeholder.png',
            id: 'contact-img-1',
            likeSummary: 'Contact photo',
            details: {
                title: 'Contact',
                description: 'Ready to connect and discuss opportunities.',
                tags: ['Contact', 'Networking']
            }
        }],
        prompts: [
            {
                question: 'Reach out if',
                answer: 'You have an exciting opportunity or just want to connect.',
                id: 'contact-prompt-1',
                likeSummary: 'Reach out invitation',
                details: {
                    title: 'Reach Out',
                    description: 'Always excited to discuss new projects, opportunities, or just to connect with fellow developers.',
                    tags: ['Contact', 'Opportunities']
                }
            },
        ],
        infoPills: [
            { label: 'Open to work' },
            { label: 'Available for freelance' },
        ],
        // DETAILS PAGE CONTENT REMOVED
        details: {
            email: 'your.email@example.com',
            socials: [
                { label: 'Twitter', url: 'https://twitter.com/yourusername' },
                { label: 'LinkedIn', url: 'https://linkedin.com/in/yourusername' },
                { label: 'GitHub', url: 'https://github.com/yourusername' },
            ],
        },
    },
];

