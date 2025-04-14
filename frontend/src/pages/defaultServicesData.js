import pcarousel5 from '../assets/pcarousel5.webp'
import pcarousel2 from '../assets/pcarousel2.webp'
import bodymassagepg from '../assets/bodymassagepg.webp'


export const defaultServices = [
    {
        id: 1,
        name: "Hair Curling",
        description: "Professional hair styling services for all hair types and preferences.",
        image: pcarousel5,
        options: [
            { id: 101, name: "Women's Haircut", price: 65 },
            { id: 102, name: "Men's Haircut", price: 45 },
            { id: 103, name: "Color & Highlights", price: 120 },
            { id: 104, name: "Blowout & Styling", price: 55 },
        ]
    },
    {
        id: 2,
        name: "Facial Massage",
        description: "Rejuvenating facial treatments to refresh and revitalize your skin.",
        image: pcarousel2,
        options: [
            { id: 201, name: "Classic Facial", price: 80 },
            { id: 202, name: "Anti-Aging Treatment", price: 110 },
            { id: 203, name: "Hydrating Facial", price: 95 },
            { id: 204, name: "Deep Cleansing", price: 85 },
        ]
    },
    {
        id: 3,
        name: "Body Massage",
        description: "Therapeutic massage treatments to relieve stress and tension.",
        image: bodymassagepg,
        options: [
            { id: 301, name: "Swedish Massage (60 min)", price: 90 },
            { id: 302, name: "Deep Tissue (60 min)", price: 110 },
            { id: 303, name: "Hot Stone Massage", price: 130 },
            { id: 304, name: "Aromatherapy Massage", price: 100 },
        ]
    }
];

