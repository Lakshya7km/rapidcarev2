const router = require('express').Router();
const auth = require('../middleware/auth');
const BloodBank = require('../models/BloodBank');

router.get('/', async (req, res) => {
    try {
        const { hospitalId } = req.query;
        res.json(await BloodBank.find(hospitalId ? { hospitalId } : {}));
    } catch (e) { res.status(500).json({ message: e.message }); }
});

<<<<<<< HEAD
// Upsert by blood type (used by reception BloodBankSection)
router.post('/upsert', async (req, res) => {
    try {
        const { hospitalId, bloodType, units } = req.body;
        let b = await BloodBank.findOne({ hospitalId, bloodType });
        if (b) { b.units = units; await b.save(); }
        else { b = await new BloodBank({ hospitalId, bloodType, units }).save(); }
=======
// Upsert by blood group (used by reception BloodBankSection)
router.post('/upsert', async (req, res) => {
    try {
        const { hospitalId, bloodGroup, units } = req.body;
        let b = await BloodBank.findOne({ hospitalId, bloodGroup });
        if (b) { b.units = units; await b.save(); }
        else { b = await new BloodBank({ hospitalId, bloodGroup, units }).save(); }
>>>>>>> 249ac1ed861c4486288be8b5560101ae79ca1d7c
        res.json(b);
    } catch (e) { res.status(500).json({ message: e.message }); }
});

router.post('/', auth(['hospital']), async (req, res) => {
    try {
        const { hospitalId, bloodType } = req.body;
        let b = await BloodBank.findOne({ hospitalId, bloodType });
        if (b) { Object.assign(b, req.body); await b.save(); }
        else { b = await new BloodBank(req.body).save(); }
        res.json(b);
    } catch (e) { res.status(500).json({ message: e.message }); }
});

router.put('/:id', auth(['hospital']), async (req, res) => {
    try {
        const b = await BloodBank.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(b);
    } catch (e) { res.status(500).json({ message: e.message }); }
});

module.exports = router;
