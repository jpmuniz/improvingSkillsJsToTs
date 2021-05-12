import React, { useRef, useState } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { v4 as uuidv4 } from 'uuid';
import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';


interface ModalAddFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (food: FoodProps) => void;
}

interface FoodProps {
  id: string,
  link: string;
  name: string;
  price: number;
  description: string;
}

export function ModalAddFood({ isOpen, setIsOpen, handleAddFood }: ModalAddFoodProps) {
  const [link, setLink] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0.0);
  const [description, setDescription] = useState('');
  const formRef = useRef<FormHandles>(null);
  async function handleSubmit({ name, link, price, description }: FoodProps) {
    const id = uuidv4();
    handleAddFood({ id, name, link, price, description });
    setIsOpen();
  };



  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" value={link} onChange={(e) => setLink(e.target.value)} />

        <Input name="name" placeholder="Ex: Moda Italiana" value={name} onChange={(e) => setName(e.target.value)} />
        <Input name="price" placeholder="Ex: 19.90" value={price} onChange={(e) => setPrice(Number(e.target.value))} />

        <Input name="description" placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

