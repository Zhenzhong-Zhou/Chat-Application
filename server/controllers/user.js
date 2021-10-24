const users = [];

export const addUser = ({id, username, room}) => {
	username = username.trim().toLowerCase();
	room = room.trim().toLowerCase();
	const existingUser = users.find(user => user.room === room && user.username === username);
	if (existingUser) {
		return {error: "User is taken"}
	}
	const user = {id, username, room};
	users.push(user);
	return {user};
};

export const removeUser = (id) => {
	const index = users.findIndex(user => user.id === id);
	if (index !== -1) {
		return users.splice(index, 1)[0];
	}
};

export const getUser = (id) => users.find(user => user.id === id);

export const getUsersInRoom = (room) => users.filter(user => user.room === room);