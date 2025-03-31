

export const defaultPackages = [
    {
        id: 1,
        name: "Hair Styling",
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


const packages2 = [
    {
        id: 1,
        name: "Normal Package",
        description: "Basic treatment options for those who want essential services.",
        price: "₹2500",
        color: "blue",
        features: [
            "EyeBrow",
            "Upperlip",
            "Hand massage",
            "Normal Wax (Full Hand)",
            "Face bleach",
            "Facial (Twacha / KYC)",
            
        ]
    },
    {
        id: 2,
        name: "Medium Package",
        description: "Enhanced services with more options and premium products.",
        price: "₹3500",
        color: "green",
        features: [
           "EyeBrow",
            "Upperlip",
            "Dry Manicure",
            "Wax (Full hand)",
            "Head Message (Oil)",
            "D-tan",
            "Facial (O3)",
        ],
        isPopular: true
    },
    {
        id: 3,
        name: "High Package",
        description: "Luxury treatment with extensive options and top-tier products.",
        price: "₹6000",
        color: "purple",
        features: [
           "EyeBrow",
            "Upperlip",
            "Dry Manicure",
            "Hair Trimming",
            "Head Message (Oil)",
            "D-tan (half hand & leg)",
            "D-tan (face)",
            "Facial (hydra)",
        ]
    },
    {
        id: 4,
        name: "Bridal Package",
        description: "Complete bridal service with everything needed for your special day.",
        price: "₹7500",
        color: "pink",
        features: [
            "EyeBrow",
            "Upperlip (Ricewax)",
            "Forehead (Ricewax)",
            "Hair Trimming",
            "Head Message (Oil)",
            "D-tan (half hand & leg)",
            "Face Bleach (O3)",
            "Facial (casmara / blossom / kanpeki)",

        ]
    }
];
