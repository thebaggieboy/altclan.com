import React, { useState } from 'react';
import styles from ".//Vouchers.module.css"

const CopyTextButton: React.FC<{ textToCopy: string }> = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    const textArea = document.createElement('textarea');
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    setCopied(true);
  };

  return (
    <div>
      <button onClick={handleCopyClick} className={styles.copyButton}>
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="15" viewBox="0 0 13 15" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 10.625V0.625L11.875 0H3.75L3.125 0.625V3.125H0.625L0 3.75V13.75L0.625 14.375H8.75L9.375 13.75V11.25H11.875L12.5 10.625ZM9.375 10V3.75L8.75 3.125H4.375V1.25H11.25V10H9.375ZM1.25 4.375H8.125V13.125H1.25V4.375Z" fill="black"/>
        </svg>

        <div className={styles.copiedText}>
            {copied ? 'Copied!' : ''}
        </div>
        
      </button>
    </div>
  );
};

export default CopyTextButton;
