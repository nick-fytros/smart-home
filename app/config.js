// application config object
module.exports = {
	applications: [
		{ id: 0, name: 'Magic Blue BLE light bulbs', url: '/blebulbs', imageUrl: '/images/blebulbs.png', description: 'Turn on/off, change and dimm the colors of your Magic Blue BLE light bulbs.' }
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
		},
		bleBulbs: {
			scanAndConnect: '/blebulbs/scan'
		}
	}
};