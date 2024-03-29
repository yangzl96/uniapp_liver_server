module.exports = app => {
    const { STRING, INTEGER, DATE, ENUM, TEXT } = app.Sequelize;

    const Comment = app.model.define('comment', {
        id: {
            type: INTEGER(20),
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: TEXT,
            allowNull: false,
            defaultValue: '',
            comment: '评论内容'
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
        created_time: DATE,
        updated_time: DATE,
    });

    // 关联关系
    Comment.associate = function (models) {
        // 关联发布人
        // 一个用户可以发布多个评论
        Comment.belongsTo(app.model.User);
        // 关联直播间
        // 一个直播间可以有多个评论
        Comment.belongsTo(app.model.Live);
    }

    return Comment;
};