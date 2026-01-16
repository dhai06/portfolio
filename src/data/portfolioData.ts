export interface ItemDetails {
    title: string;
    description: string;
    tags?: string[];
    relatedLinks?: { label: string; url: string }[];
    // Customizable media section for the modal
    media?: {
        type: 'images' | 'text' | 'video';
        images?: string[]; // Array of image paths for carousel/gallery
        text?: string; // Custom text content
        videoUrl?: string; // Video embed URL (e.g., Google Drive, YouTube)
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
                description: 'hint: tap the blocks to see more details or press the heart to also like it :)',
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
                answer: '...',
                id: 'about-prompt-4',
                likeSummary: 'Favourite shows and movies',
                details: {
                    title: 'My favourite shows and movies',
                    description: 'I\'ll add 2 tier lists, one for shows and one for movies ... eventually.',
                }
            },
            {
                question: 'A fact about me is that',
                answer: 'I competed at the 2024 Canadian Olmypic Swimming Trials.',
                id: 'about-prompt-5',
                likeSummary: 'Swimming!',
                details: {
                    title: 'Swimming and Coaching',
                    description: 'I started swimming competitively at the age of 7, and have been coaching since grade 8. Throughout high school, I trained 20+ hours per week swimming 8x and going to the gym 3x per week. Currently, I coach swimmers for the Vancouver Pacific Swim Club at UBC. Here\'s the video of me getting my trials cut back in grade 12! (I\'m the one in lane 3 with the black cap and suit)',
                    media: {
                        type: 'video',
                        videoUrl: 'https://drive.google.com/file/d/1btNhtGQ7SLfREAVsPAB07htRokgdLTNe/preview'
                    }
                }
            },
            {
                question: 'I am also ',
                answer: 'A classically trained pianist, and have raised over $6000 for charity through various benefit concerts.',
                id: 'about-prompt-6',
                likeSummary: 'Piano',
                details: {
                    title: 'Piano',
                    description: 'Here are some of my favourite composers for the piano. Through performing at benefit concerts with a group of other pianists, we have been able to raise over $6000 for the Starfish Pack Program, which provides meals to children in need. Watch my performance from the 2024 benefit concert below!',
                    media: {
                        type: 'video',
                        videoUrl: 'https://drive.google.com/file/d/164nSc9EULGev1F2ALzhmVZgJ2VyAY-h4/preview'
                    },
                    tags: ['Chopin', 'Rachmaninoff', 'Liszt', 'Debussy'],
                    relatedLinks: [
                        { label: 'Starfish Pack Program', url: 'https://starfishpack.com/' }
                    ]
                }
            },
            {
                question: 'my favourite football (or soccer) team is ',
                answer: 'Chelsea FC',
                id: 'about-prompt-7',
                likeSummary: 'Chelsea FC',
                details: {
                    title: 'Chelsea FC',
                    description: 'not much else to see :/',
                }
            },
        ],
        infoPills: [
            { label: '' },
        ],
        details: {
        },
    },
    {
        id: '2',
        type: 'project',
        name: 'Project One',
        verified: false,
        // MAIN PAGE CONTENT
        images: [],
        prompts: [],
        infoPills: [],
        details: {
            stack: [],
        },
    },
    {
        id: '3',
        type: 'project',
        name: 'Project Two',
        verified: false,
        // MAIN PAGE CONTENT
        images: [],
        prompts: [],
        infoPills: [],
        details: {
            stack: [],
        },
    },
    {
        id: '4',
        type: 'project',
        name: 'Project Three',
        verified: false,
        // MAIN PAGE CONTENT
        images: [],
        prompts: [],
        infoPills: [],
        details: {
            stack: [],
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
                description: 'blank... for now',
                tags: []
            }
        }],
        prompts: [
            {
                question: 'Reach out if',
                answer: 'blank... for now',
                id: 'contact-prompt-1',
                likeSummary: 'Reach out invitation',
                details: {
                    title: 'Reach Out',
                    description: 'blank... for now',
                    tags: []
                }
            },
        ],
        infoPills: [
        ],
        details: {
        },
    },
];

