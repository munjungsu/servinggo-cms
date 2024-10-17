import { Button, Dialog, Typography } from "@mui/material";
interface DialogProps {
  open: boolean,
  title: string,
  content: string,
  action: ()=>void,
  onClose: ()=>void,
}
export const AlertDialog = ({ open, title, content, action, onClose: handleClose }: DialogProps) => {
  const handleConfirmClick = () => {
    action();
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: `${712 / 19.2}vw`,
          maxWidth: `${712 / 19.2}vw`,
          padding: `${28 / 10.8}vh ${28 / 19.2}vw`,
          paddingLeft: `${40 / 19.2}vw`,
          borderRadius: `${16 / 19.2}vw`,
          color: "white",
          background: "#323237",
          "& > .title": {
            fontSize: `${32 / 19.2}vw`,
            fontWeight: 700,
            marginBottom: `${28 / 10.8}vh`,
          },
          "& > .content": {
            fontSize: `${28 / 19.2}vw`,
            marginBottom: `${52 / 10.8}vh`,
            whiteSpace: "pre",
          },
          "& > .actions": {
            display: "flex",
            gap: `${16 / 19.2}vw`,
            justifyContent: "flex-end",
            "& > button": {
              width: `${120 / 19.2}vw`,
              height: `${60 / 10.8}vh`,
              borderRadius: `${12 / 19.2}vw`,
              fontSize: `${28 / 19.2}vw`,
            },
            "& > .cancelButton": {
              background: "linear-gradient(#FFFFFF, #E0E0E0)",
            },
            "& > .confirmButton": {
              color: "white",
              background: "linear-gradient(#4987F8, #5668F9)",
            },
          },
        },
      }}
    >
      <Typography className="title">{title}</Typography>
      <div className="content">{content}</div>
      <div className="actions">
        <Button className="cancelButton" onClick={handleClose}>
          취소
        </Button>
        <Button className="confirmButton" onClick={handleConfirmClick}>
          확인
        </Button>
      </div>
    </Dialog>
  );
};
