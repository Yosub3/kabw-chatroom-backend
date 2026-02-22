const messageService = require("./message.service");

class MessageController {
    async getAll(req, res, next){
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const search = req.query.search || "";
            const messages = await messageService.getAll(page, limit, search, req.userId);
            if(messages.length === 0){
                throw new NotFoundError('No messages found');
            }
            res.json({
                success: true,
                message: 'Messages retrieved successfully',
                data: messages
            });
        }catch (error) {
            next(error);
        }
    }

    async create(req, res, next){
        try {
            const message = await messageService.create({...req.body, user_id: req.userId});
            res.status(201).json({
                success: true,
                message: 'Message created successfully',
                data: message
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new MessageController();