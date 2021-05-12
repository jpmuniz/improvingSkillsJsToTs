import React, { useState, useEffect } from 'react';

import { Header } from '../../components/Header';
import api from '../../services/api';
import { Food } from '../../components/Food';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

interface FoodProps {
  available: boolean;
  description: string;
  id: string;
  image: string;
  name: string;
  price: number;
  link: string;
}

type FoodPropsOmit = Omit<FoodProps, "available" | "image">;

export function Dashboard() {
  const [foods, setFoods] = useState<FoodProps[]>([]);
  const [editingFood, setEditingFood] = useState<FoodPropsOmit>();
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false)

  useEffect(() => {
    async function getFoods() {
      const response = await api.get('/foods');
      setFoods(response.data);
    }
    getFoods()
  }, [])

  async function handleAddFood(food: FoodPropsOmit) {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });
      setFoods([...foods, response.data])
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(food: FoodPropsOmit) {
    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood && editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood(id: String) {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);
    setFoods(foodsFiltered);
  }

  function toggleModal() {
    setModalOpen(modalOpen === true ? false : true);
  }

  function handleEditFood(food: FoodPropsOmit) {
    setEditingFood(food)
    setEditModalOpen(true);
  }
  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleModal}
        editingFood={handleEditFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={() => handleDeleteFood(food.id)}
              handleEditFood={() => handleEditFood(food)}
            />

          ))}
      </FoodsContainer>
    </>
  );

};

