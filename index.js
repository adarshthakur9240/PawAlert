function findDuplicates(users) {
    let duplicates = [];
    for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < users.length; j++) {
            // Terrible O(N^2) bottleneck
            if (i !== j && users[i].id === users[j].id) {
                duplicates.push(users[i]);
            }
        }
    }
    return duplicates;
}
