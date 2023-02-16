import "./style.scss";
import React, { useState } from "react";
import linkDataService from "../../services/link.services";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

interface Props {
  id: string;
  title: string;
  url: string;
}

const LatteCard: React.FC<Props> = ({ id, title, url }) => {
  const [editing, setEditing] = useState(false);
  const [newUrl, setNewUrl] = useState(url);
  const [newTitle, setNewTitle] = useState(title);


  const handleDelete = async () => {
    if (window.confirm("Tem certeza que deseja excluir este link?")) {
      await linkDataService.deleteLink(id);
      window.location.reload();
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    await linkDataService.updateLink(id, { title: newTitle, url: newUrl });
    setEditing(false);
    window.location.reload();
  };

  return (
    <div className="card">
      {editing ? (
        <div className="cardBody">
          <input
            type="text"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
          />
          <button id="saveEditButton" onClick={handleSave}>Salvar</button>
        </div>
      ) : (
        <div className="cardBody">
          <h2>{title}</h2>
        </div>
      )}
      <div className="cardFooter">
      <button id="goToSite" onClick={() => window.open(url)}>Vá para o site</button>
        {editing ? null : (
          <button id="editButton" onClick={handleEdit}>
            <FaEdit />
          </button>
        )}
        <button id="deleteButton" onClick={handleDelete}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default LatteCard;
