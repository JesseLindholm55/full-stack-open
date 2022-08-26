const notification = "";

const notificationReducer = (state = notification, action) => {
  switch (action.type) {
    case "CHANGE_NOTIFICATION":
      const newNotification = action.payload;
      return newNotification;

    default:
      return notification;
  }
};

export default notificationReducer;
