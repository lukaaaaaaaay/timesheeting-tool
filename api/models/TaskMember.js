module.exports = {

	tableName: 'taskMembers',
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
			via: 'users',
			groupBy: 'task'
		},

		users: {
			columnName: 'userId',
			type: 'integer',
			primaryKey: true,
			foreignKey: true,
			references: 'user',
			on: 'id',
			via: 'tasks',
			groupBy: 'user'
		}

	}
};