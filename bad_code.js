// Intentionally bad O(N^2) code to trigger OckhamGrid AI
function findDuplicates(users) {
    let duplicates = [];
    for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < users.length; j++) {
            // Terrible nested loop bottleneck
            if (i !== j && users[i].id === users[j].id) {
                duplicates.push(users[i]);
            }
        }
    }
    return duplicates;
}
