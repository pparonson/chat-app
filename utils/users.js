let users = [];

// addUser
const addUser = ({ id, username, room }) => {
    // clean the data
    username = username ? username.trim().toLowerCase() : "";
    room = room ? room.trim().toLowerCase() : "";

    if (!username || !room) {
        return {
            error: "Username and room are required"
        };
    }
    console.log(`id: ${id}, username: ${username}, room: ${room}`);

    // check for existing user
    const existingUser = users.find(user => {
        return user.room === room && user.username === username;
    });

    // validate username
    if (existingUser) {
        return {
            error: `username: ${username} already exists in room: ${room}`
        };
    }

    // store user
    const user = { id, username, room };

    users = [...users, user];

    return { user };
};

// removeUser

// getUser

// getUsersInRoom

addUser({ id: 42, username: "ellebelle", room: "room1" });
