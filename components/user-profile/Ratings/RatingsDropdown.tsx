/* eslint-disable react-hooks/rules-of-hooks */
// @ts-nocheck

import React, { useState } from 'react';
import styles from ".//Ratings.module.css"

interface DropdownProps {
  initialContent: string;
  additionalContent: string;
}

const ShowMoreDropdown: React.FC<DropdownProps> = ({ initialContent, additionalContent }) => {
  const [showAdditionalContent, setShowAdditionalContent] = useState(false);

    const toggleContent = () => {
        setShowAdditionalContent(!showAdditionalContent);
    };


    interface CheckboxItem {
        id: number;
        label: string;
    }
    
    const initialCheckboxes: CheckboxItem[] = [
        { id: 1, label: 'Yes' },
        { id: 2, label: 'No' },
    ];

    const [checkboxes, setCheckboxes] = useState<CheckboxItem[]>(initialCheckboxes);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const handleCheckboxChange = (id: number) => {
        setSelectedId(id);
    };
  

return (
    <div>
      <div>
        {showAdditionalContent ? additionalContent : initialContent}
      </div>
      <button onClick={toggleContent}>
        {showAdditionalContent ? '' : ''}
      </button>

      <div className={styles.rateContainer}>
          <h1 className={styles.header}>
            How would you rate this product?
          </h1>

            <p className={styles.subtext}>
                Did you like this product?
            </p>

            <div>
                {checkboxes.map((checkbox) => (
                    <label key={checkbox.id} className={styles.container}>
                        <input
                            type="checkbox"
                            checked={selectedId === checkbox.id}
                            onChange={() => handleCheckboxChange(checkbox.id)}
                        />
                        {checkbox.label}
                        <span className={styles.checkmark}></span>
                    </label>
                    
                ))}
            </div>

            <p className={styles.subtext}>
                If yes, what did you like about this product? 
            </p>

            <textarea name="" id="" cols="20" rows="5" className={styles.textarea}></textarea>

            <p className={styles.subtext}>
                If no, what did you like about this product? 
            </p>

            <textarea name="" id="" cols="20" rows="5" className={styles.textarea}></textarea>

            <p className={styles.subtext}>
                Could it be better?
            </p>

            <textarea name="" id="" cols="20" rows="5" className={styles.textarea}></textarea>
      </div>
    </div>
  );
};

export default ShowMoreDropdown;