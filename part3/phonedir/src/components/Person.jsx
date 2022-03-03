import React from 'react';

export function Person({
  name, phoneNumber, id, handleDelete,
}) {
  return (
    <div className="person">
      {name}
      :
      {phoneNumber}
      <button type="button" onClick={() => handleDelete(id, name)}>Delete</button>
    </div>
  );
}
