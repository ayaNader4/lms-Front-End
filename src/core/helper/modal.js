// import * as React from "react";
// import styled from "styled-components";
// import Dialog from "@material-ui/core/Dialog";

// import DialogTitle from "@material-ui/core/DialogTitle";

// const callAll =
//   (...fns) =>
//   (...args) =>
//     fns.forEach((fn) => fn && fn(...args));

// const ModalContext = React.createContext();

// function Modal(props) {
//   const [isOpen, setIsOpen] = React.useState(false);
//   return <ModalContext.Provider value={[isOpen, setIsOpen]} {...props} />;
// }

// function ModalDismissButton({ children: child }) {
//   const [, setIsOpen] = React.useContext(ModalContext);
//   return React.cloneElement(child, {
//     onClick: callAll(() => setIsOpen(false), child.props.onClick),
//   });
// }

// function ModalOpenButton({ children: child }) {
//   const [, setIsOpen] = React.useContext(ModalContext);
//   return React.cloneElement(child, {
//     onClick: callAll(() => setIsOpen(true), child.props.onClick),
//   });
// }

// function ModalContentsBase(props) {
//   const [isOpen, setIsOpen] = React.useContext(ModalContext);
//   return (
//     <Dialog open={isOpen} onClose={() => setIsOpen(false)} {...props}>
//       {props.children}
//     </Dialog>
//   );
// }

// function ModalContents({ title, children, ...props }) {
//   return (
//     <ModalContentsBase {...props}>
//       <div style={{ padding: "20px" }}>
//         <div css={{ display: "flex", justifyContent: "flex-end" }}>
//           <ModalDismissButton>
//             <CloseIcon className="fas fa-times"></CloseIcon>
//           </ModalDismissButton>
//         </div>
//         <DialogTitle>{title}</DialogTitle>
//         {children}  
//       </div>
//     </ModalContentsBase>
//   );
// }

// export { Modal, ModalDismissButton, ModalOpenButton, ModalContents };

// const CloseIcon = styled.i`
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   cursor: pointer;
// `;
