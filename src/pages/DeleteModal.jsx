import React, { useState } from "react";
import "../css/delete_modal.css";
import { Button } from 'primereact/button';


const DeleteModal = ({ active, setActive, onConfirm }) => {
  
  if (!active) return null;

  return (
    <div className="delete-modal-style"  onClick={() => setActive(false)}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="div-text">
        <span className="text">Вы хотите удалить запись?</span>
        </div>
        <div className="div-buttons">
        <Button className="button-yes" onClick={onConfirm}>Да</Button>
        <Button className="button-no" onClick={() => setActive(false)}>Нет</Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
