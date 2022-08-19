(async () => {

    const database = require('./db');
    const User = require('./Models/user');
    
    await database.sync();
})();