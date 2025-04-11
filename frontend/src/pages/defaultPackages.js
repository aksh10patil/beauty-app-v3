// defaultPackages.js
export const defaultPackages = [
    {
        id: 1,
        name: "Normal Package",
        description: "Basic treatment options for those who want essential services.",
        price: 2500,
        image: "/api/placeholder/400/300",
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
        price: 3500,
        image: "/api/placeholder/400/300",
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
        price: 6000,
        image: "/api/placeholder/400/300",
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
        price: 7500,
        image: "/api/placeholder/400/300",
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

export default defaultPackages;