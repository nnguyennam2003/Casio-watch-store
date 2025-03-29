const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    try {
        const enums = {
            categories: ["Casio Baby-G", "Casio Edifice", "Casio General", "Casio Gshock", "Vintage", "Luxury", "Couple"],
            genders: ["Men", "Women", "Unisex"],
            movements: ["Digital", "Mechanical"],
        };

        res.json(enums);
    } catch (error) {
        console.error("Error fetching filters:", error);
        res.status(500).json({ message: "Server Error" });
    }
})

module.exports = router;
