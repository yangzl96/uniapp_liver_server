'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE, ENUM, TEXT } = Sequelize;
    return queryInterface.createTable('user', {
      id: {
        type: INTEGER(20),
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: STRING(30),
        allowNull: false,
        defaultValue: '',
        comment: '用户名',
        unique: true
      },
      password: {
        type: STRING,
        allowNull: false,
        defaultValue: '',
        comment: "密码"
      },
      avatar: {
        type: STRING,
        allowNull: true,
        defaultValue: '',
        comment: '头像'
      },
      sex: {
        type: ENUM,
        values: ['男', '女', '保密'],
        allowNull: false,
        defaultValue: '男'
      },
      coin: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '金币'
      },
      created_time: DATE,
      updated_time: DATE,
      deleted_time: DATE,
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('users');
  },
};
