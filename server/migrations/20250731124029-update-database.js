'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Contacts', 'email');
    await queryInterface.removeColumn('Contacts', 'subject');

    const columnsToAdd = {
      arServicesTitle: { type: Sequelize.STRING(50), allowNull: false, defaultValue: '' },
      enServicesTitle: { type: Sequelize.STRING(50), allowNull: false, defaultValue: '' },
      heServicesTitle: { type: Sequelize.STRING(50), allowNull: false, defaultValue: '' },
      arServicesSubtitle: { type: Sequelize.STRING(50), allowNull: true },
      enServicesSubtitle: { type: Sequelize.STRING(50), allowNull: true },
      heServicesSubtitle: { type: Sequelize.STRING(50), allowNull: true },
      arCustomersTitle: { type: Sequelize.STRING(50), allowNull: false, defaultValue: '' },
      enCustomersTitle: { type: Sequelize.STRING(50), allowNull: false, defaultValue: '' },
      heCustomersTitle: { type: Sequelize.STRING(50), allowNull: false, defaultValue: '' },
      arCustomersSubtitle: { type: Sequelize.STRING(50), allowNull: true },
      enCustomersSubtitle: { type: Sequelize.STRING(50), allowNull: true },
      heCustomersSubtitle: { type: Sequelize.STRING(50), allowNull: true },
      arPackagesTitle: { type: Sequelize.STRING(50), allowNull: false, defaultValue: '' },
      enPackagesTitle: { type: Sequelize.STRING(50), allowNull: false, defaultValue: '' },
      hePackagesTitle: { type: Sequelize.STRING(50), allowNull: false, defaultValue: '' },
      arPackagesSubtitle: { type: Sequelize.STRING(50), allowNull: true },
      enPackagesSubtitle: { type: Sequelize.STRING(50), allowNull: true },
      hePackagesSubtitle: { type: Sequelize.STRING(50), allowNull: true },
      arHeroCustomersTitle: { type: Sequelize.STRING(50), allowNull: true },
      enHeroCustomersTitle: { type: Sequelize.STRING(50), allowNull: true },
      heHeroCustomersTitle: { type: Sequelize.STRING(50), allowNull: true },
      arHeroPackagesTitle: { type: Sequelize.STRING(50), allowNull: true },
      enHeroPackagesTitle: { type: Sequelize.STRING(50), allowNull: true },
      heHeroPackagesTitle: { type: Sequelize.STRING(50), allowNull: true },
      arHeroCustomersSubtitle: { type: Sequelize.STRING(50), allowNull: true },
      enHeroCustomersSubtitle: { type: Sequelize.STRING(50), allowNull: true },
      heHeroCustomersSubtitle: { type: Sequelize.STRING(50), allowNull: true },
      arHeroPackagesSubtitle: { type: Sequelize.STRING(50), allowNull: true },
      enHeroPackagesSubtitle: { type: Sequelize.STRING(50), allowNull: true },
      heHeroPackagesSubtitle: { type: Sequelize.STRING(50), allowNull: true },
    };

    for (const [name, options] of Object.entries(columnsToAdd)) {
      await queryInterface.addColumn('Globals', name, options);
    }

    await queryInterface.removeColumn('Packages', 'type');

    await queryInterface.addColumn('Packages', 'type', {
      type: Sequelize.ENUM('basic', 'premium', 'golden'),
      allowNull: false,
      defaultValue: 'basic'
    });
  },

  down: async (queryInterface, Sequelize) => {
    const columnsToRemove = [
      'arServicesTitle',
      'enServicesTitle',
      'heServicesTitle',
      'arServicesSubtitle',
      'enServicesSubtitle',
      'heServicesSubtitle',
      'arCustomersTitle',
      'enCustomersTitle',
      'heCustomersTitle',
      'arCustomersSubtitle',
      'enCustomersSubtitle',
      'heCustomersSubtitle',
      'arPackagesTitle',
      'enPackagesTitle',
      'hePackagesTitle',
      'arPackagesSubtitle',
      'enPackagesSubtitle',
      'hePackagesSubtitle',
      "arHeroCustomersTitle",
      "enHeroCustomersTitle",
      "heHeroCustomersTitle",
      "arHeroPackagesTitle",
      "enHeroPackagesTitle",
      "heHeroPackagesTitle",
    ];

    for (const name of columnsToRemove) {
      await queryInterface.removeColumn('Globals', name);
    }
  }
};
