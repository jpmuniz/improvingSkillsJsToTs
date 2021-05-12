import React, { useState, useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { v4 as uuidv4 } from 'uuid';
import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';

interface ModalEditFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  editingFood: (food: FoodProps) => void;
  handleUpdateFood: (food: FoodProps) => void
}

interface FoodProps {
  id: string,
  link: string;
  name: string;
  price: number;
  description: string;
}

export function ModalEditFood({ isOpen, setIsOpen, editingFood, handleUpdateFood }: ModalEditFoodProps) {
  const [link, setLink] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const formRef = useRef<FormHandles>(null);

  async function handleSubmit({ link, name, price, description }: FoodProps) {
    const id = uuidv4();
    handleUpdateFood({ id, link, name, price, description });
    setIsOpen();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" value={link} onChange={(e) => setLink(e.target.value)} />

        <Input name="name" placeholder="Ex: Moda Italiana" value={name} onChange={(e) => setName(e.target.value)} />
        <Input name="price" placeholder="Ex: 19.90" value={price} onChange={(e) => setPrice(Number(e.target.value))} />

        <Input name="description" placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );

};
