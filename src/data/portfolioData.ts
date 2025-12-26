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
    images: string[];
    prompts: PromptData[];
    infoPills: InfoPill[];
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
        name: 'Your Name',
        verified: false,
        images: ['/images/placeholder.png'],
        prompts: [
            {
                question: 'I geek out on',
                answer: 'Add your interests and passions here.',
            },
            {
                question: 'My ideal weekend',
                answer: 'Describe your perfect weekend.',
            },
        ],
        infoPills: [
            { label: 'Your Title' },
            { label: 'Location' },
            { label: 'Skill 1' },
            { label: 'Skill 2' },
        ],
        details: {
            stack: ['Skill 1', 'Skill 2', 'Skill 3'],
        },
    },
    {
        id: '2',
        type: 'project',
        name: 'Project One',
        verified: false,
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
