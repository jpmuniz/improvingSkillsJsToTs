import React, { useState, useEffect } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container } from './styles';
import api from '../../services/api';

interface FoodProps {
  food: {
    available: boolean,
    description: string,
    id: string,
    image: string,
    name: string,
    price: number
  },
  handleDelete: (id: String) => void,
  handleEditFood: (food: FoodPropsOmit) => void,
}

type FoodPropsOmit = Omit<FoodProps["food"], "available" | "image">;

export function Food({ handleEditFood, handleDelete, food }: FoodProps) {

  const [isAvailable, setIsAvailable] = useState(false);


  useEffect(() => {
    const { available } = food;
    setIsAvailable(available)
  }, [food])

  async function toggleAvailable() {
    const isAvailable = food.available === true ? false : true;

    await api.put(`/foods/${food.id}`, {
      ...food,
      available: isAvailable,
    });
    setIsAvailable(isAvailable);
  }

  async function setEditingFood(food: FoodPropsOmit) {
    handleEditFood(food);
  }

  return (
    <Container available={isAvailable}>
      <header>
        <img src={food.image} alt={food.name} />
      </header>
      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(food.price)}
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={() => setEditingFood(food)}
            data-testid={`edit-food-${food}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(food.id)}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={toggleAvailable}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container >
  );

};
