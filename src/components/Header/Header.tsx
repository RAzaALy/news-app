import React, { useState } from 'react';
import Heading from "../elements/Heading/Heading";
import Button from '../elements/Button/Button';
import Modal from '../elements/Modal/Modal';
import Preferences from '../Preferences/Preferences';

const Header: React.FC = () => {
  const [isOpen , setIsOpen] = useState(false)
  return (
    <div className="header w-full py-4 flex justify-between items-center">
      <Heading text="NEWS AGGREGATOR" />
      <Button text={"Preferences"} onClick={() => setIsOpen(true)} className='px-3'/>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Set Preferences">
        <Preferences onClose={() => setIsOpen(false)} />
      </Modal>
    </div>
  );
}

export default Header;
