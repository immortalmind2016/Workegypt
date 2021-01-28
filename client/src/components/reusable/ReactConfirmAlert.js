import { confirmAlert } from "react-confirm-alert";
const ReactConfirmAlert = ({
  onYes = () => {},
  onNo = () => {},
  title = "Please confirm your action!",
  message = "Are you sure you want to do this?",
}) => {
  return confirmAlert({
    title,
    message,
    buttons: [
      {
        label: "Yes",
        onClick: onYes,
      },
      {
        label: "No",
        onClick: onNo,
      },
    ],
  });
};

export default ReactConfirmAlert;
