module.exports = app => {
    const { STRING, INTEGER, DATE, ENUM, TEXT } = app.Sequelize;

    const Order = app.model.define('order', {
        id: {
          type: INTEGER(20),
          primaryKey: true,
          autoIncrement: true
        },
        no: {
          type: STRING(100),
          allowNull: false,
          defaultValue: '',
          comment: '订单号',
          unique: true
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
        price:{
          type:INTEGER,
          allowNull: false,
          defaultValue: 0,
          comment: '价格'
        },
        status:{
          type:ENUM,
          values: ['pending', 'success', 'fail'],
          allowNull: false,
          defaultValue: 'pending',
          comment: '支付状态'
        },
        created_time: {
          type:DATE,
          get(){
             return app.formatTime(this.getDataValue('created_time'))
          }
        },
        updated_time: DATE,
      });

    // 关联关系
    // 一个用户可以有多个订单但是一个订单只能有一个用户
    // 所以 order 属于用户
    Order.associate = function (models) {
        // 关联用户
        Order.belongsTo(app.model.User);
    }

    return Order;
};