const emitToUser = ({ io, userId, event, data = null }) => {
  io?.to(userId).emit(event, data);
};

const emitToUsers = ({ io, userIds = [], event, data = null }) => {
  userIds.forEach((id) => {
    io?.to(id).emit(event, data);
  });
};

export const emit = {
  to_user: emitToUser,
  to_users: emitToUsers,
};
