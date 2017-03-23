// application config object
module.exports = {
	applications: [
		{ id: 0, name: 'BLE Lamps', url: '/blelamps', imageUrl: '/images/blelamps.png', description: 'Turn on/off, change and dimm the colors of your BLE lamps.' }
	],
	availableRoles: ['admin', 'user'],
	routes: {
		admin: {
			user:{
				update: '/admin/user/update',
				delete: '/admin/user/delete'
			},
			token:{
				generate: '/admin/token/generate',
				delete: '/admin/token/delete'
			}
		}
	}
};