import reactAvatar from '../assets/avatars/images_1.png'
import javaAvatar from '../assets/avatars/images.png'
import pythonAvatar from '../assets/avatars/images(1).png'
import devProjectImage from "../assets/avatars/dev.png";
import shopProjectImage from "../assets/avatars/shop.png";
import paymentProjectImage from "../assets/avatars/payment.png";


export const projects = [
  {
    id: 1,
    key: "DEV",
    name: "DevTrack",
    description: "Project management platform",
    image: devProjectImage,
    issueCount: 5,
  },
  {
    id: 2,
    key: "SHOP",
    name: "ShopSphere",
    description: "E-commerce platform",
    image: shopProjectImage,
    issueCount: 2,
  },
  {
    id: 3,
    key: "PAY",
    name: "PaymentHub",
    description: "Payment processing system",
    image: paymentProjectImage,
    issueCount: 0,
  },
];

export const issues = [
    {
        id: 1,
        projectId: 1,
        key: "DEV-101",
        title: "Fix login page",
        description: "Fix the responsive layout on the login page.",
        type: "BUG",
        status: "IN_PROGRESS",
        priority: "HIGH",
        assignee: {
            id: 1,
            name: "John Doe",
            avatar: javaAvatar
        },
        reporter: {
            id: 2,
            name: "Sara Ahmed",
            avatar: reactAvatar
        },
        labels: ["frontend", "authentication"],
        attachments: []
    },

    {
        id: 2,
        projectId: 1,
        key: "DEV-102",
        title: "Add JWT authentication",
        description: "Implement JWT based authentication.",
        type: "STORY",
        status: "TODO",
        priority: "MEDIUM",
        assignee: {
            id: 2,
            name: "Ali Khan",
            avatar: pythonAvatar
        },
        reporter: {
            id: 1,
            name: "John Doe",
            avatar: javaAvatar
        },
        labels: ["backend", "security"],
        attachments: []
    },

    {
        id: 3,
        projectId: 1,
        key: "DEV-103",
        title: "Redesign dashboard",
        description: "Improve the dashboard layout and user experience.",
        type: "TASK",
        status: "DONE",
        priority: "LOW",
        assignee: {
            id: 3,
            name: "Sara Ahmed",
            avatar: reactAvatar
        },
        reporter: {
            id: 1,
            name: "John Doe",
            avatar: javaAvatar
        },
        labels: ["frontend", "ui"],
        attachments: []
    },

    {
        id: 4,
        projectId: 1,
        key: "DEV-104",
        title: "Fix payment timeout",
        description: "Investigate payment requests timing out.",
        type: "BUG",
        status: "TODO",
        priority: "HIGH",
        assignee: {
            id: 2,
            name: "Ali Khan",
            avatar: pythonAvatar
        },
        reporter: {
            id: 3,
            name: "Sara Ahmed",
            avatar: reactAvatar
        },
        labels: ["backend", "payments"],
        attachments: []
    },

    {
        id: 5,
        projectId: 1,
        key: "DEV-105",
        title: "Add project search",
        description: "Allow users to search projects.",
        type: "STORY",
        status: "IN_PROGRESS",
        priority: "MEDIUM",
        assignee: {
            id: 1,
            name: "John Doe",
            avatar: javaAvatar
        },
        reporter: {
            id: 2,
            name: "Ali Khan",
            avatar: pythonAvatar
        },
        labels: ["frontend", "search"],
        attachments: []
    },
    {
        id: 6,
        projectId: 2,
        key: "SHOP-101",
        title: "Add product search",
        description: "Allow customers to search products.",
        type: "STORY",
        status: "TODO",
        priority: "HIGH",
        assignee: {
            id: 2,
            name: "Ali Khan",
            avatar: pythonAvatar
        },
        reporter: {
            id: 1,
            name: "John Doe",
            avatar: javaAvatar
        },
        labels: ["frontend", "search"],
        attachments: []
    },

    {
        id: 7,
        projectId: 2,
        key: "SHOP-102",
        title: "Fix checkout validation",
        description: "Fix validation errors during checkout.",
        type: "BUG",
        status: "IN_PROGRESS",
        priority: "HIGH",
        assignee: {
            id: 3,
            name: "Sara Ahmed",
            avatar: reactAvatar
        },
        reporter: {
            id: 1,
            name: "John Doe",
            avatar: javaAvatar
        },
        labels: ["checkout", "frontend"],
        attachments: []
    }
];

export const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    role: "Developer",
    avatar: javaAvatar,
  },
  {
    id: 2,
    name: "Ali Khan",
    role: "Developer",
    avatar: pythonAvatar,
  },
  {
    id: 3,
    name: "Sara Ahmed",
    role: "Project Manager",
    avatar: reactAvatar,
  },
];