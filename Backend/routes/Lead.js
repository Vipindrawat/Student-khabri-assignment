import express from 'express'
const router = express.Router();
import Lead from '../Model/LeadModel.js'


router.get('/getLead', async (req, res) => {
    try {
        let query = {};

        if (req.query.search) {
            query.$or = [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
                { company: { $regex: req.query.search, $options: "i" } },
            ];
        }

        if (req.query.status) {
            query.status = req.query.status;
        }

        if (req.query.source) {
            query.source = req.query.source;
        }

        const sortBy = req.query.sortBy || "createdAt";
        const order = req.query.order === "asc" ? 1 : -1;

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const leads = await Lead.find(query)
            .sort({ [sortBy]: order })
            .skip(skip)
            .limit(limit);

        const total = await Lead.countDocuments(query);

        res.status(200).json({
            success: true,
            count: leads.length,
            total,
            page,
            totalPages: Math.ceil(total / limit),
            leads,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "internal server error",
            message: error.message,
        });
    }
});


router.get('/analytics', async (req, res) => {

    try {
        const totalLeads = await Lead.countDocuments();

        const convertedLeads = await Lead.countDocuments({
            status: "Converted",
        });

        const leadsByStage = await Lead.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                },
            },
        ]);

        res.json({
            totalLeads,
            convertedLeads,
            leadsByStage,
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }


});

export default router;