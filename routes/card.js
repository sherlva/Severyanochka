const express = require("express");
const router = express.Router();
const Card = require('../model/Mongo')
router.get("/:id", async (req, res) => {
    const card = await Card.findById(req.params.id)

    res.render('card.hbs', {
        title: 'Card',
        card
    })

});



module.exports = router;
