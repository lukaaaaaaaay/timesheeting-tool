module.exports = {

	tableName: 'taskCategories',
	tables: ['tasks', 'users'],
	junctionTable: true,
	autoPK: false,
	autoCreatedAt: false,
	autoUpdatedAt: false,

	attributes: {

		tasks: {
			columnName: 'taskId',
			type: 'integer',
			primaryKey: true,
			foreignKey: true,
			references: 'task',
			on: 'id',
			via: 'categories',
			groupBy: 'task'
		},

		categories: {
			columnName: 'categoryId',
			type: 'integer',
			primaryKey: true,
			foreignKey: true,
			references: 'category',
			on: 'id',
			via: 'tasks',
			groupBy: 'category'
		}

	}
}