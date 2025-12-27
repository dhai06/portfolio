export interface PromptData {
    question: string;
    answer: string;
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
    images: string[];
    prompts: PromptData[];
    infoPills: InfoPill[];
    // Details page content (separate from main page)
    detailsContent: {
        images?: string[];        // Images to show on details page
        prompts?: PromptData[];   // Prompts/sections for details page
        infoPills?: InfoPill[];   // Pills to show on details page
    };
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
        images: ['/images/DSCF7233.JPG'],
        prompts: [
            {
                question: 'ignore',
                answer: 'ignore',
            },
            {
                question: 'I\'m currently working on',
                answer: 'An automated project management app that dynamically adjusts timelines based on project dependencies and delays.',
            },
            {
                question: 'My favourite artists',
                answer: 'maybe do a carousel animation below this?',
            },
            {
                question: 'My favourite shows and movies',
                answer: 'another carousel animation?',
            },
            {
                question: 'A fact about me is that',
                answer: 'I competed at the 2024 Canadian Olmypic Swimming Trials.',
            },
        ],
        infoPills: [
            { label: 'Your Title' },
            { label: 'Location' },
            { label: 'Skill 1' },
            { label: 'Skill 2' },
        ],
        // DETAILS PAGE CONTENT (appears after clicking heart)
        detailsContent: {
            images: ['/images/DSCF7233.JPG'],
            prompts: [
                {
                    question: 'About Me',
                    answer: 'Write a detailed bio for the details page here.',
                },
                {
                    question: 'My Journey',
                    answer: 'Describe your background and how you got here.',
                },
            ],
            infoPills: [
                { label: 'Detail Pill 1' },
                { label: 'Detail Pill 2' },
                { label: 'Detail Pill 3' },
            ],
        },
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
        images: ['/images/placeholder.png'],
        prompts: [
            {
                question: 'What it does',
                answer: 'Describe your first project and what problems it solves.',
            },
        ],
        infoPills: [
            { label: 'Technology 1' },
            { label: 'Technology 2' },
        ],
        // DETAILS PAGE CONTENT (appears after clicking heart)
        detailsContent: {
            images: ['/images/placeholder.png'],
            prompts: [
                {
                    question: 'The Problem',
                    answer: 'Describe the problem this project solves in detail.',
                },
                {
                    question: 'The Solution',
                    answer: 'Explain your technical approach and implementation.',
                },
                {
                    question: 'Key Features',
                    answer: 'List the main features and capabilities.',
                },
            ],
        },
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
        images: ['/images/placeholder.png'],
        prompts: [
            {
                question: 'The challenge',
                answer: 'Explain the main challenge or goal of this project.',
            },
        ],
        infoPills: [
            { label: 'Next.js' },
            { label: 'PostgreSQL' },
        ],
        // DETAILS PAGE CONTENT (appears after clicking heart)
        detailsContent: {
            images: ['/images/placeholder.png'],
            prompts: [
                {
                    question: 'Project Overview',
                    answer: 'Detailed description for the details page.',
                },
                {
                    question: 'Technical Details',
                    answer: 'Explain the architecture and technical decisions.',
                },
            ],
        },
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
        images: ['/images/placeholder.png'],
        prompts: [
            {
                question: 'Why I built this',
                answer: 'Share your motivation and what you learned.',
            },
        ],
        infoPills: [
            { label: 'Python' },
            { label: 'FastAPI' },
        ],
        // DETAILS PAGE CONTENT (appears after clicking heart)
        detailsContent: {
            images: ['/images/placeholder.png'],
            prompts: [
                {
                    question: 'The Motivation',
                    answer: 'Why you built this project - details page version.',
                },
                {
                    question: 'What I Learned',
                    answer: 'Key learnings and takeaways from this project.',
                },
            ],
        },
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
        images: ['/images/placeholder.png'],
        prompts: [
            {
                question: 'Reach out if',
                answer: 'You have an exciting opportunity or just want to connect.',
            },
        ],
        infoPills: [
            { label: 'Open to work' },
            { label: 'Available for freelance' },
        ],
        // DETAILS PAGE CONTENT (appears after clicking heart)
        detailsContent: {
            images: ['/images/placeholder.png'],
            prompts: [
                {
                    question: 'Let\'s Connect',
                    answer: 'I\'m always open to discussing new opportunities and ideas.',
                },
            ],
            infoPills: [
                { label: 'Full-time roles' },
                { label: 'Contract work' },
                { label: 'Collaborations' },
            ],
        },
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

