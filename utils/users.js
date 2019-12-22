let users = [
    { id: 23, username: "pparonson", room: "room1" },
    { id: 1, username: "Angela ", room: " Room2 " }
];

// addUser
const addUser = ({ id, username, room }, _users) => {
    const cleanedData = cleanData(username, room);
    username = cleanedData.username;
    room = cleanedData.room;

    if (!username || !room) {
        return {
            error: "Username and room are required"
        };
    }

    const ret = validateUser(username, room, users);
    if (ret.error) {
        return ret;
    }

    // store user
    const user = { id, username, room };
    users = [..._users, user];

    return { ...user };
};

// removeUser
const removeUser = (id, _users) => {
    users = _users.filter(user => {
        return user.id !== id;
    });
};

// getUser

// getUsersInRoom

// helper fns
function cleanData(username, room) {
    username = username ? username.trim().toLowerCase() : "";
    room = room ? room.trim().toLowerCase() : "";
    return { username, room };
}

// check for existing user and validate username
function validateUser(username, room, users) {
    const existingUser = users.find(user => {
        return user.room === room && user.username === username;
    });

    if (existingUser) {
        return {
            error: `username: ${username} already exists in room: ${room}`
        };
    } else {
        return {};
    }
}

// let testAddUserNew = addUser(
//     { id: 42, username: "ElleBelle ", room: " Room2 " },
//     users
// );
// let testAddUserExisting = addUser(
//     { id: 23, username: "pparonson", room: "room1" },
//     users
// );
let testRemoveUser = removeUser(23, users);
console.log("testResult: ", users);
