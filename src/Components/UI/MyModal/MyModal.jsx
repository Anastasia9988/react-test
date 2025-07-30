import React from "react";
import { Modal } from "antd";

const MyModal = ({ children, visible, setVisible }) => {
    return (
        <Modal
            open={visible}
            onCancel={() => setVisible(false)}
            footer={null}
            centered
            destroyOnClose
        >
            {children}
        </Modal>
    );
};

export default MyModal;
