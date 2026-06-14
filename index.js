function findDuplicates(users) {
    let duplicates = [];
    for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < users.length; j++) {
            if (i !== j && users[i].id === users[j].id) {
                duplicates.push(users[i]);
            }
        }
    }
    return duplicates;
}
// Optimized by OckhamGrid AI Strategy Engine
function findDuplicatePairs(users) {
    const roleMap = new Map();
    users.forEach(user => {
        if (!roleMap.has(user.role)) {
            roleMap.set(user.role, []);
        }
        roleMap.get(user.role).push(user);
    });
}
