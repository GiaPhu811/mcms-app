import React from 'react';
import { AesirXDam } from '@kakahuy113/aesirx-dam-app';
import '@kakahuy113/aesirx-dam-app/dist/index.css';
import '@kakahuy113/aesirx-dam-app/dist/index.css.map';
import Modal from 'components/Modal';

function ModalDAMComponent({ show, onHide, onSelect }) {
  return (
    <Modal
      dialogClassName={'modal-fullscreen modal_digital_assets position-fixed start-0'}
      show={show}
      onHide={onHide}
      body={<AesirXDam onSelect={onSelect} />}
    />
  );
}

export default ModalDAMComponent;
