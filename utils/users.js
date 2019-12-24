let users = [
    { id: 23, username: "pparonson", room: "room1" },
    { id: 1, username: "Angela ", room: " Room2 " }
];

// addUser
const addUser = ({ id, username, room }) => {
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
    users = [...users, user];

    return { user: { ...user } };
};

// removeUser
const removeUser = id => {
    const index = users.findIndex(user => user.id === id);
    // mutates original array and returns array containing the deleted elements or undefined
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};

// getUser
const getUser = id => {
    let user = users.find(user => user.id === id);
    if (!user) {
        return { error: "User not found!" };
    } else {
        return user;
    }
};

// getUsersInRoom
const getUsersInRoom = room => {
    const usersInRoom = users.filter(user => user.room === room);
    if (usersInRoom.length < 1) {
        return { error: `No users found in ${room}` };
    } else {
        return usersInRoom;
    }
};

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

let testAddUserNew1 = addUser(
    { id: 42, username: "ElleBelle ", room: " Room2 " },
    users
);
let testAddUserNew2 = addUser(
    { id: 43, username: "Kendra ", room: " Room1 " },
    users
);
let testAddUserNew3 = addUser(
    { id: 44, username: "Brooke ", room: " Room1 " },
    users
);
let testAddUserExisting = addUser(
    { id: 23, username: "pparonson", room: "room1" },
    users
);
let testRemoveUser = removeUser(23);
// let testGetUser = getUser(23, users);
// let testGetUsersInRoom = getUsersInRoom("room5", users);
console.log("testResult: ", testRemoveUser);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
