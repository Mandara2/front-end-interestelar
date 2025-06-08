import React from 'react'

interface BackButtonProps {
  text: string
  onClick: () => void
}

const BackButton: React.FC<BackButtonProps> = ({ text, onClick }) => {
  return (
    <button className="back-button" onClick={onClick}>
      ← {text}
    </button>
  )
}

export default BackButton;
