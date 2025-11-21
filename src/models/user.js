// src/models/user.js
import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      // bảo mật
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      twoFactorEnabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      twoFactorSecret: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      backupCodes: {
        type: DataTypes.JSON, // nếu DB ko hỗ trợ JSON, dùng DataTypes.TEXT và lưu stringify
        allowNull: true,
      },
      resetToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      resetTokenExpiry: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      lastLogin: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      lastLoginIP: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user',
      },
    },
    {
      tableName: 'Users',
      timestamps: true, // createdAt, updatedAt tự động
      underscored: false,
      defaultScope: {
        attributes: { exclude: ['password', 'twoFactorSecret', 'resetToken'] },
      },
      scopes: {
        withSecrets: { attributes: { } }, // dùng .scope('withSecrets') khi cần password
      },
    }
  );

  // Instance method: so sánh password
  User.prototype.comparePassword = async function (candidatePassword) {
    if (!this.password) return false;
    return bcrypt.compare(candidatePassword, this.password);
  };

  // Hooks: hash password trước create/update
  User.beforeCreate(async (user) => {
    if (user.password) {
      const hash = await bcrypt.hash(user.password, 10);
      user.password = hash;
    }
  });

  User.beforeUpdate(async (user) => {
    // nếu password thay đổi thì hash
    if (user.changed('password')) {
      const hash = await bcrypt.hash(user.password, 10);
      user.password = hash;
    }
  });

  // Example association placeholder (nếu có)
  User.associate = function (models) {
    if (models.Booking) User.hasMany(models.Booking, { foreignKey: 'userId' });
  };

  return User;
};
