import { movieImages, skillImages, artistImages } from '@/lib/imagePreloader';
import type { Interest, Skill, Movie, Artist, CardData, ImageItem, PromptItem, InfoPill, ItemDetails, PairedBlock, FeedBlock } from './types';

// Re-export types for backward compatibility
export type { ItemDetails, ImageItem, InfoPill, CardData, PairedBlock, FeedBlock };
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
        name: 'Daniel Hai',
        blocks: [
            // Intro paired block - image left, intro content right
            {
                kind: 'paired',
                layout: 'image-left',
                id: 'about-intro',
                likeSummary: 'My about me',
                details: {
                    title: 'My interests',
                    description: 'hint: tap the blocks to see more details or press the heart to also like it :)',
                    tags: ['Random Projects', 'Formula 1', 'Cooking', 'Swimming', 'Fashion', 'Working Out', 'Playing Piano', 'Discovering Restaurants', 'Mechanical Keyboards', 'Watching TV Shows']
                },
                image: {
                    kind: 'image',
                    src: '/images/DSCF7233.JPG',
                },
                prompt: {
                    kind: 'prompt',
                    question: 'ignore',
                    answer: 'ignore',
                    contentType: 'intro',
                }
            },
            // Remaining prompts as standalone blocks
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
    },
    {
        id: '2',
        type: 'project',
        name: 'Formula UBC',
        blocks: [
            // Example: paired block with image left, prompt right
            {
                kind: 'paired',
                layout: 'image-left',
                id: 'fubc-overview',
                likeSummary: 'Formula UBC overview',
                image: {
                    kind: 'image',
                    src: '/images/projects/fubc/fubcmain.JPG',
                },
                prompt: {
                    kind: 'prompt',
                    question: 'I am currently working on ',
                    answer: 'Data aquisition across various systems on the car, as well as developing the website (very much in progress). Tap this block to learn more about Formula UBC!',
                    contentType: 'text',
                },
                details: {
                    title: 'Formula UBC',
                    description: 'Formula UBC is a Formula SAE team at the University of British Columbia. We are a team of about 80 students, and we design and build a formula style race car from scratch every year to bring to competition in May of every year at Michigan International Speedway. Check out our website or Instagram to learn more!',
                    relatedLinks:[{ label: 'Website', url: 'https://www.formulaubc.com/'}, { label: 'Instagram', url: 'https://www.instagram.com/formula.ubc/'}]
            },
        },
            // Example: paired block with prompt left, image right (alternating)
            {
                kind: 'paired',
                layout: 'image-right',
                id: 'fubc-daq',
                likeSummary: 'Data Acquisition System',
                image: {
                    kind: 'image',
                    src: '/images/projects/fubc/smol.png',
                    objectFit: 'contain',
                },
                prompt: {
                    kind: 'prompt',
                    question: 'Some elec work',
                    answer: 'This board is a small part of a data acquisition system I am working on, which will obtain data to validate rear wing downforce, and record loads on the A-arms',
                    contentType: 'text',
                },
                details: {
                    title: 'Data Aquisition System',
                    description: 'This board is a small part of a data acquisition system I am working on, which will obtain data to validate rear wing downforce, and record loads on the A-arms',
                    media: {
                        type: 'images', 
                        images: ['/images/projects/fubc/smol5.png','/images/projects/fubc/smol4.png', '/images/projects/fubc/smol2.png', '/images/projects/fubc/smol3.png'],
                    },
                    tags: ['Altium', 'Embedded C'],
                }
            },
            {
                kind: 'paired', 
                layout: 'image-left',   
                id: 'fubc-fw',
                likeSummary: 'Front Wing Design',
                image: {
                    kind: 'image',
                    src: '/images/projects/fubc/fw1.png',
                    objectFit: 'cover',
                },
                prompt: {
                    kind: 'prompt',
                    question: 'On the aero side',
                    answer: 'During my first year with the team, I worked on the front wing design, and we were able to achieve a 1.8x increase in front wing downforce!',
                    contentType: 'text',
                },
                details: {
                    title: 'Front Wing Design',
                    description: 'Our goals were to maximize downforce, follow ruels and regulations, and ensure our front wing didn\'t scrape the gronud (like it did in the 23/24 season). We designed the parts in SolidWorks, simulated it in STAR-CCM+ with the entire car in a 40 million cell CFD simulation, and finally manufactured the entire carbon fiber wing ourselves.',
                    media: {
                        type: 'images', 
                        images: ['/images/projects/fubc/fw2.png','/images/projects/fubc/fw4.jpg','/images/projects/fubc/manu1.jpg', '/images/projects/fubc/fw3.png'],
                    },
                    tags: ['SolidWorks', 'STAR-CCM+', 'CFD', 'Carbon Fiber'],
                },
            },
            {
                kind: 'paired', 
                layout: 'image-right',   
                id: 'fubc-manu',
                likeSummary: 'Manufacturing...',
                image: {
                    kind: 'image',
                    src: '/images/projects/fubc/manu.jpg',
                    objectFit: 'cover',
                    objectPosition: 'center 100%',
                },
                prompt: {
                    kind: 'prompt',
                    question: 'Manufacturing...',
                    answer: 'There\'s carbon fiber in my veins... ',
                    contentType: 'text',
                },
                details: {
                    title: 'Manufacturing',
                    description: 'As you can probably imagine, it takes a lot of work to make carbon fiber parts. It starts with CNC machining the mould from MDF (wood fiber boards), laying up the carbon fiber sheets, curing the part, and finally sanding (and sometimes a bit of resin) to touch up the part before it\'s read to go on the car.',
                    media:{
                        type: 'images', 
                        images: ['/images/projects/fubc/manu2.PNG', 'images/projects/fubc/manu1.jpg'],
                    },
                    tags: ['CNC Machining', 'Carbon Fiber'],
                }
            }
        ],
    },
    {
        id: '3',
        type: 'project',
        name: 'Personal Projects',
        blocks: [
            {
                kind: 'paired',
                layout: 'image-left',
                id: 'kbd',
                likeSummary: 'My custom mechanical keyboard',
                image: {
                    kind: 'image',
                    src: '/images/projects/personal/kbd/3d_top.png',
                    objectFit: 'contain',
                },
                prompt: {
                    kind: 'prompt',
                    question: 'A very expensive hobby',
                    answer: 'This mechanical keyboard was designed completely from scratch, including the PCB and firmware',
                    contentType: 'text',
                },
                details: {
                    title: 'Custom Mechanical Keyboard',
                    description: 'My obsession with keyboards started sometime in high school from playing video games, and since then I\'ve build 2 other keyboards, and designed this custom one. It\'s a 75% keyboard with a small OLED display, a MACRO column, USB-C connection, and a scroll wheel. This board is STM32 based, uses I2C to communicate with the OLED, interrupts to process encoder inputs, and a polling rate of 1kHz. Checkout the GitHub below!',
                    media:{
                        type: 'images', 
                        images: ['/images/projects/personal/kbd/3d_bot.png', '/images/projects/personal/kbd/bot_pcb.png','/images/projects/personal/kbd/top_pcb.png','/images/projects/personal/kbd/matrix.png','/images/projects/personal/kbd/root.png'],
                    },
                    tags: ['CNC Machining', 'Carbon Fiber'],
                    relatedLinks:[{ label: 'GitHub', url: 'https://github.com/dhai06/kbd_firmware'}],
                }
            },
            {
                kind: 'paired',
                layout: 'image-right',
                id: 'mango',
                likeSummary: 'Mango: Gesture Controlled Minecraft',
                image: {
                    kind: 'image',
                    src: '/images/placeholder.png',
                },
                prompt: {
                    kind: 'prompt',
                    question: 'Key features',
                    answer: 'Feature description goes here...',
                    contentType: 'text',
                },
                details: {  
                    title: 'Mango: Gesture Controlled Minecraft',
                        description: 'Mango is a full body gesture controlled Minecraft controller that uses only a webcam to track the player\'s real world actions and translate them into in-game inputs. It was built in 24 hours and won 1st place at HelloHacks 2025! By using various gesture detection functions, normalizing all measurements, and using a simple state manager, we were able to achieve a high degree of accuracy in gesture recognition. Now you can play minecraft by just moving your body! Check out our Devpost and Github below, and make sure to watch the promo vid.',
                        media: {
                        type: 'images',
                        images: ['/images/projects/personal/mango/mango1.png', '/images/projects/personal/mango/mango2.png', '/images/projects/personal/mango/mango3.png'],
                    },
                    tags: ['OpenCV', 'MediaPipe', 'Minecraft'],
                    relatedLinks:[{ label: 'GitHub', url: 'https://github.com/minjunminji/minecraftCVcontroller'},{label: 'Devpost', url: 'https://devpost.com/software/mango-full-body-gesture-control-for-any-game'}, {label: 'Promo Video', url: 'https://drive.google.com/file/d/1s0_MoA5PT2xQSSJlm68Q3fTFOwgnqBa2/view'}],
                }
                
            },
        ],
    },
   

    {
        id: '5',
        type: 'contact',
        name: 'Get In Touch',
        blocks: [
            {
                kind: 'paired',
                layout: 'image-left',
                id: 'contact-intro',
                likeSummary: 'Reach out invitation',
                details: {
                    title: 'Contact',
                    description: 'blank... for now',
                    tags: []
                },
                image: {
                    kind: 'image',
                    src: '/images/placeholder.png',
                },
                prompt: {
                    kind: 'prompt',
                    question: 'Reach out if',
                    answer: 'blank... for now',
                    contentType: 'text',
                }
            },
        ],
    },
];
