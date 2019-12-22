let users = [{ id: 23, username: "pparonson", room: "room1" }];

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
        console.log("Error: ", ret.error);
        return ret;
    }

    // store user
    const user = { id, username, room };
    users = [..._users, user];

    return { ...user };
};

// removeUser

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

let result = addUser(
    { id: 42, username: "ElleBelle ", room: " Room2 " },
    users
);
console.log("result: ", result);
console.log("users2: ", users);
console.log("users.length: ", users.length);
