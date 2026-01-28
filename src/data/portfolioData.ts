import { movieImages, skillImages, artistImages } from '@/lib/imagePreloader';
import type { Interest, Skill, Movie, Artist, CardData, ImageItem, PromptItem, InfoPill, ItemDetails } from './types';

// Re-export types for backward compatibility
export type { ItemDetails, ImageItem, InfoPill, CardData };
export type { PromptItem as PromptData };

// Centralized interests data
export const interests: Interest[] = [
    { name: 'Formula 1', emoji: '🏎️' },
    { name: 'Cooking', emoji: '🍳' },
    { name: 'Fashion', emoji: '👕' },
    { name: 'Working Out', emoji: '🏋️' },
    { name: 'Playing Piano', emoji: '🎹' },
    { name: 'Discovering Restaurants', emoji: '🍽️' },
    { name: 'Mechanical Keyboards', emoji: '⌨️' },
    { name: 'Watching TV Shows', emoji: '📺' },
    { name: 'Random Projects', emoji: '🛠️' },
];

// Centralized skills data
export const skills: Skill[] = [
    { name: 'C++', icon: skillImages[0] },
    { name: 'C', icon: skillImages[1] },
    { name: 'Python', icon: skillImages[2] },
    { name: 'SolidWorks', icon: skillImages[3] },
    { name: 'GitHub', icon: skillImages[4] },
    { name: 'Excel', icon: skillImages[5] },
    { name: 'SystemVerilog', icon: skillImages[6] },
    { name: 'MATLAB', icon: skillImages[7] },
    { name: 'Altium', icon: skillImages[8] },
    { name: 'AutoCAD', icon: skillImages[9] },
    { name: 'TypeScript', icon: skillImages[10] },
    { name: 'React', icon: skillImages[11] },
    { name: 'Next.js', icon: skillImages[12] },
    { name: 'RISC-V', icon: skillImages[13] },
    { name: 'Jira', icon: skillImages[14] },
];

// Centralized movies/shows data
export const movies: Movie[] = [
    { title: "Howl's Moving Castle", poster: movieImages[0] },
    { title: 'Movie Poster 1', poster: movieImages[1] },
    { title: 'Movie Poster 2', poster: movieImages[2] },
    { title: 'Movie Poster 3', poster: movieImages[3] },
    { title: 'Our Beloved Summer', poster: movieImages[4] },
    { title: 'Show Poster', poster: movieImages[5] },
    { title: 'When Life Gives You Tangerines', poster: movieImages[6] },
    { title: 'Fresh Off The Boat', poster: movieImages[7] },
    { title: 'Show Poster 2', poster: movieImages[8] },
    { title: 'Movie Poster 4', poster: movieImages[9] },
];

// Centralized artists data
export const artists: Artist[] = [
    { name: 'wave to earth', image: artistImages[0] },
    { name: 'keshi', image: artistImages[1] },
    { name: 'Jay Chou', image: artistImages[2] },
    { name: 'The Black Skirts', image: artistImages[3] },
    { name: 'Eric Chou', image: artistImages[4] },
    { name: 'Crowd Lu', image: artistImages[5] },
    { name: 'Jannabi', image: artistImages[6] },
    { name: 'grentperez', image: artistImages[7] },
    { name: 'yung kai', image: artistImages[8] },
    { name: 'Nerd Connection', image: artistImages[9] },
    { name: 'Lauv', image: artistImages[10] },
];

// Portfolio data
export const portfolioData: CardData[] = [
    {
        id: '1',
        type: 'about',
        name: 'WIP - Daniel Hai - WIP',
        verified: false,
        images: [{
            kind: 'image',
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
                kind: 'prompt',
                question: 'ignore',
                answer: 'ignore',
                id: 'about-prompt-1',
                likeSummary: 'Intro section',
                contentType: 'intro',
                details: {
                    title: 'Introduction',
                    description: 'Welcome to my portfolio! I\'m passionate about building innovative solutions.',
                    tags: ['About', 'Introduction']
                }
            },
            {
                kind: 'prompt',
                question: 'I\'m currently working on',
                answer: 'An automated project management app that dynamically adjusts timelines based on project dependencies and delays.',
                id: 'about-prompt-2',
                likeSummary: 'Current project: automated project management app',
                contentType: 'text',
                details: {
                    title: 'Current Project',
                    description: 'Building an intelligent project management system that uses AI to predict delays and automatically reschedule dependent tasks.',
                    tags: ['AI', 'Project Management', 'Automation'],
                    relatedLinks: [{ label: 'View Progress', url: '#' }]
                }
            },
            {
                kind: 'prompt',
                question: 'My skills and technologies',
                answer: '...',
                id: 'about-prompt-skills',
                likeSummary: 'Technical skills',
                contentType: 'skills',
                details: {
                    title: 'Skills & Technologies',
                    description: 'A collection of programming languages, tools, and technologies I work with.',
                    tags: ['C++', 'C', 'Python', 'TypeScript', 'React', 'Next.js', 'MATLAB', 'SystemVerilog', 'Altium', 'SolidWorks', 'AutoCAD', 'Git', 'Docker', 'Excel', 'Jira']
                }
            },
            {
                kind: 'prompt',
                question: 'My music taste',
                answer: 'maybe do a carousel animation below this?',
                id: 'about-prompt-3',
                likeSummary: 'My music taste',
                contentType: 'artist',
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
                kind: 'prompt',
                question: 'My favourite shows and movies',
                answer: '...',
                id: 'about-prompt-4',
                likeSummary: 'Favourite shows and movies',
                contentType: 'movie',
                details: {
                    title: 'My favourite shows and movies',
                    description: 'I\'ll add 2 tier lists, one for shows and one for movies ... eventually.',
                }
            },
            {
                kind: 'prompt',
                question: 'A fact about me is that',
                answer: 'I competed at the 2024 Canadian Olmypic Swimming Trials.',
                id: 'about-prompt-5',
                likeSummary: 'Swimming!',
                contentType: 'text',
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
                kind: 'prompt',
                question: 'I am also ',
                answer: 'A classically trained pianist, and have raised over $6000 for charity through various benefit concerts.',
                id: 'about-prompt-6',
                likeSummary: 'Piano',
                contentType: 'text',
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
                kind: 'prompt',
                question: 'my favourite football (or soccer) team is ',
                answer: 'Chelsea FC',
                id: 'about-prompt-7',
                likeSummary: 'Chelsea FC',
                contentType: 'text',
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
        images: [{
            kind: 'image',
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
                kind: 'prompt',
                question: 'Reach out if',
                answer: 'blank... for now',
                id: 'contact-prompt-1',
                likeSummary: 'Reach out invitation',
                contentType: 'text',
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
