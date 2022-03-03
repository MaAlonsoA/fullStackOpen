import React from 'react';

export function Notification({ type, message }) {
  return (
    <div>
      <p className={type}>{message}</p>
    </div>
  );
}
