module.exports = app => {
    const { STRING, INTEGER, DATE, ENUM, TEXT } = app.Sequelize;
    // 直播间礼物情况
    const LiveGift = app.model.define('live_gift', {
        id: {
            type: INTEGER(20),
            primaryKey: true,
            autoIncrement: true
        },
        live_id: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: '直播间id',
            references: {
                model: 'live',
                key: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'restrict', // 更新时操作
        },
        user_id: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: '用户id',
            references: {
                model: 'user',
                key: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'restrict', // 更新时操作
        },
        gift_id: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: '礼物id',
            references: {
                model: 'gift',
                key: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'restrict', // 更新时操作
        },
        created_time: DATE,
        updated_time: DATE,
    });

    // 关联关系
    LiveGift.associate = function (models) {
        // 关联用户
        // 用户对礼物是一对多 一个用户可以送多个礼物
        LiveGift.belongsTo(app.model.User);
        // 关联直播间
        // 一个直播间可以收到多个礼物
        LiveGift.belongsTo(app.model.Live);
        // 关联礼物
        // 一个直播间可以收到多个不同的礼物
        LiveGift.belongsTo(app.model.Gift);
    }

    return LiveGift;
};