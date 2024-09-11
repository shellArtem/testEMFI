import { useState, useEffect } from 'react';
import './App.css';
import BasicCard from './components/Card/Card';
import formatUnixTimestamp from './formatUnixTimestamp';

function App() {
  const [deals, setDeals] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fetchedDeals, setFetchedDeals] = useState([]);
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [expandedData, setExpandedData] = useState({});

  const fetchDeals = async () => {
    try {
      const response = await fetch(
        'https://1shelldrunk1.amocrm.ru/api/v4/leads',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImVhOWE2M2JmOGU0NjA1ZWRkYmE4OWIwZjUzNWNmYjViYzc5YzFkYWQzZTk1YzQzOTRiNGZkN2U4MmM0MmVkOThhZTdiNGUyNGQ2N2VjODk0In0.eyJhdWQiOiIwMDYwYTlmMi05YjliLTQ1NjYtYWIyMS02ZDNjZGZjNzUwOWUiLCJqdGkiOiJlYTlhNjNiZjhlNDYwNWVkZGJhODliMGY1MzVjZmI1YmM3OWMxZGFkM2U5NWM0Mzk0YjRmZDdlODJjNDJlZDk4YWU3YjRlMjRkNjdlYzg5NCIsImlhdCI6MTcyNjA0MDIwNiwibmJmIjoxNzI2MDQwMjA2LCJleHAiOjE3Mjc2NTQ0MDAsInN1YiI6IjExNTA1MTgyIiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxOTQ0OTA2LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiNjViOGFjMGMtMGE3NS00MWUyLTk2NWQtMGZiOThlZjQ0MGRjIiwiYXBpX2RvbWFpbiI6ImFwaS1iLmFtb2NybS5ydSJ9.LL-v4RxOlPHMZhrQY0p93Qt7pY9xeHAjnEkR-MCAbjfoGUYKCmJLx1i7USXKN-HNGGR8qbM6eL9FJBbsp2tNJz4rmP5K2n5OTOFzyJWWM1SW8u2ZVXQPxDIsC2EhXs-JNu6lFAX02P7TfHjP13QpH6px7spEJQlfJ0uDDBM4IRkowwRhAIWzaLuIDjne2ZIVUSiMRJKWwmFbcDZgHQajKH6Vq7TzoWZSfUxzwtXBV5yIfkWuYkKX8L0HZm3J5qelkDi8ZejOuE2arAMa1BIMEwvqAIk4tHHXRB8cLf25yL6FOweeJUUoth9HZYjGeg0YiZm1HB7ktcHoG8JyAmtVuQ`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      const data = await response.json();
      setFetchedDeals(data._embedded.leads || []);
    } catch (error) {
      console.error('Ошибка при получении сделок:', error);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentIndex < fetchedDeals.length) {
        const nextDeals = fetchedDeals.slice(currentIndex, currentIndex + 3);
        setDeals((prevDeals) => [...prevDeals, ...nextDeals]);
        setCurrentIndex((prevIndex) => prevIndex + 3);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [currentIndex, fetchedDeals]);

  const fetchExpandedData = async (id) => {
    try {
      setLoadingIndex(id);
      const response = await fetch(
        `https://1shelldrunk1.amocrm.ru/api/v4/leads/${id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImVhOWE2M2JmOGU0NjA1ZWRkYmE4OWIwZjUzNWNmYjViYzc5YzFkYWQzZTk1YzQzOTRiNGZkN2U4MmM0MmVkOThhZTdiNGUyNGQ2N2VjODk0In0.eyJhdWQiOiIwMDYwYTlmMi05YjliLTQ1NjYtYWIyMS02ZDNjZGZjNzUwOWUiLCJqdGkiOiJlYTlhNjNiZjhlNDYwNWVkZGJhODliMGY1MzVjZmI1YmM3OWMxZGFkM2U5NWM0Mzk0YjRmZDdlODJjNDJlZDk4YWU3YjRlMjRkNjdlYzg5NCIsImlhdCI6MTcyNjA0MDIwNiwibmJmIjoxNzI2MDQwMjA2LCJleHAiOjE3Mjc2NTQ0MDAsInN1YiI6IjExNTA1MTgyIiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxOTQ0OTA2LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiNjViOGFjMGMtMGE3NS00MWUyLTk2NWQtMGZiOThlZjQ0MGRjIiwiYXBpX2RvbWFpbiI6ImFwaS1iLmFtb2NybS5ydSJ9.LL-v4RxOlPHMZhrQY0p93Qt7pY9xeHAjnEkR-MCAbjfoGUYKCmJLx1i7USXKN-HNGGR8qbM6eL9FJBbsp2tNJz4rmP5K2n5OTOFzyJWWM1SW8u2ZVXQPxDIsC2EhXs-JNu6lFAX02P7TfHjP13QpH6px7spEJQlfJ0uDDBM4IRkowwRhAIWzaLuIDjne2ZIVUSiMRJKWwmFbcDZgHQajKH6Vq7TzoWZSfUxzwtXBV5yIfkWuYkKX8L0HZm3J5qelkDi8ZejOuE2arAMa1BIMEwvqAIk4tHHXRB8cLf25yL6FOweeJUUoth9HZYjGeg0YiZm1HB7ktcHoG8JyAmtVuQ`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      const data = await response.json();

      console.log(data);
      const dueTask =
        data.closest_task_at !== null ? data.closest_task_at : null;
      const statusColor = calculateStatusColor(dueTask);

      setExpandedData({
        id: data.id,
        name: data.name,
        date: dueTask
          ? formatUnixTimestamp(data.closest_task_at)
          : 'Нет задачи',
        status: dueTask ? dueTask.status : 'Нет задачи',
        statusColor,
      });
    } catch (error) {
      console.error('Ошибка при получении развернутых данных:', error);
    } finally {
      setLoadingIndex(null);
    }
  };

  const calculateStatusColor = (task) => {
    if (!task) return 'red';

    const taskDate = new Date(task * 1000);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (taskDate < today) return 'red';
    if (taskDate.toDateString() === today.toDateString()) return 'green';
    if (taskDate > today) return 'yellow';
  };

  const handleCardClick = (deal) => {
    if (loadingIndex !== null && loadingIndex !== deal.id) {
      setExpandedData({});
    }
    if (loadingIndex !== deal.id) {
      fetchExpandedData(deal.id);
    } else {
      setExpandedData({});
    }
  };

  return (
    <>
      <h1>HELLO</h1>
      <div className="container">
        {deals.map((deal) => (
          <div
            key={deal.id}
            onClick={() => handleCardClick(deal)}
            className="card"
          >
            {loadingIndex === deal.id ? (
              <div className="spinner">Загрузка...</div>
            ) : expandedData.id === deal.id ? (
              <div className="expanded-card">
                <h2>{expandedData.name}</h2>
                <p>ID: {expandedData.id}</p>

                <p>Дата: {expandedData.date}</p>
                <div
                  className={`status-circle ${expandedData.statusColor}`}
                ></div>
              </div>
            ) : (
              <BasicCard name={deal.name} price={deal.price} id={deal.id} />
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
