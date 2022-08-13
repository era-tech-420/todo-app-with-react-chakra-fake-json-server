import toast from "react-hot-toast";

export const successNotify = (message) => toast.success(message);

export const failedNotify = (message) => toast.error(message);
