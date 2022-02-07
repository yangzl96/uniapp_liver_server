module.exports = app => {
  const { STRING, INTEGER, DATE, ENUM, TEXT } = app.Sequelize;

  // 直播间观看情况
  const LiveUser = app.model.define('live_user', {
    id: {
      type: INTEGER(20),
      primaryKey: true,
      autoIncrement: true
    },
    // 哪个直播间
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
    // 哪个用户
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
  LiveUser.associate = function (models) {
    // 关联用户
    // 这个直播间可以对应多个用户观看
    LiveUser.belongsTo(app.model.User);
    // 关联直播间可以被多个用户观看也就是存在多个观看记录
    LiveUser.belongsTo(app.model.Live);
  }

  return LiveUser;
};