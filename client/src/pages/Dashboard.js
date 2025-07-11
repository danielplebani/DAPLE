import { useEffect, useState } from 'react';
import api from '../api';

const Dashboard = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    api.get('/items', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setItems(res.data))
    .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 className='m-2'>Dashboard</h2>
      <ul>
        {items.map(item => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
