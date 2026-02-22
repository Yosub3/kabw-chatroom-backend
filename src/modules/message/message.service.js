const { Message } = require("../../../models");

class MessageService {
    async getAll(page = 1, limit = 10, search = "", userId){
        const offset = (page - 1) * limit;
        const whereClause = {};

        if (search) {
            whereClause.message = { [Op.like]: `%${search}%` };
        }

        const {count, rows} = await Message.findAndCountAll({
            where: whereClause,
            order: [['created_at', 'DESC']],
            limit,
            offset
        })

        return {
            data: rows.reverse().map(row => {
                row.user_id === userId ? row.user_id = 1 : row.user_id = -1;
                return row;
            }),
            pagination: {
                total: count,
                page,
                limit,
                totalPages: Math.ceil(count / limit)
            }
        }
    }

    async create(data){
        if(!data){
            throw new BadRequestError('No data provided for update');
        }
        const newMessage = await Message.create(data);
        const messageJson = newMessage.toJSON();
        return {...messageJson, user_id: 1};
    }
}

module.exports = new MessageService();