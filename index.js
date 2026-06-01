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