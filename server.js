const express = require("express");

const app = express();

const PORT = 3000;

const products = [
    {
        id: 1,
        name: "Laptop",
        price: 55000
    },
    {
        id: 2,
        name: "Smartphone",
        price: 25000
    },
    {
        id: 3,
        name: "Headphones",
        price: 3000
    },
    {
        id: 4,
        name: "Keyboard",
        price: 1500
    }
];

app.get("/", (req, res) => {
    res.json({
        message: "Product API is running successfully through Jenkins CI/CD"
    });
});

app.get("/products", (req, res) => {
    res.json(products);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});