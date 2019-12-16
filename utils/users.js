let users = [];

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
    console.log(`id: ${id}, username: ${username}, room: ${room}`);

    const ret = validateUser(username, room);
    if (ret.error) {
        return ret;
    }

    // store user
    const user = { id, username, room };

    users = [...users, user];

    return { user };
};

// removeUser

// getUser

// getUsersInRoom

// helper fns
// clean the data
function cleanData(username, room) {
    username = username ? username.trim().toLowerCase() : "";
    room = room ? room.trim().toLowerCase() : "";
    return { username, room };
}

// check for existing user
// validate username
function validateUser(username, room) {
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

addUser({ id: 42, username: "ellebelle", room: "room1" });
