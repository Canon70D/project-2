const router = require('express').Router();
const { Crypto } = require('../../models');


// GET the list of selected favourites, if none then response with none selected
// ADD IN THE HANDLEBARS RENDER PAGE OF FAVOURITES LIST
// get list needs to be connected through the user ID to how many coins they have
router.get('/', async (req, res) => {
    try {
        const cryptoData = await Crypto.findAll({
            where: {
                isFavourite: true
            }
        })
        // IF NO FAVOURITE SELECTED THEN CAN BE REDIRECTED BACK TO LIST OF CRYPTO
        if(cryptoData.length === 0) {
            res.status(404).json({ message: 'You have no favourites selected. '});
            return;
        } else {
            res.status(200).json(cryptoData)
            return;
        }
    } catch(error) {
        res.status(500).json(error)
    }
})

//PUT to add/remove coins from favourites
router.put('/:id', async (req, res) => {
    try {
        const updateCrypto = await Crypto.findByPk(req.params.id)

        if(updateCrypto.isFavourite === true) {
            const trueToFalse = await Crypto.update({
                isFavourite: false
            }, {
                where: {
                    id: updateCrypto.id
                }
            })
            res.send({ message: 'Removed from favourites.'})
            return;
        } else {
            const falseToTrue = await Crypto.update({
                isFavourite: true
            }, {
                where: {
                    id: updateCrypto.id
                }
            })
            res.send({ message: 'Added to favourites.'})
            return;
        }
    } catch(error) {
        res.status(500).json(error)
    }
})


module.exports = router;