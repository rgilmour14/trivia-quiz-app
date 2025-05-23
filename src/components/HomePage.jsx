import React, { useState } from 'react';

export default function HomePage({ userData, setUserData, onSubmit }) {
  const [error, setError] = useState('');

  const categories = [
    { id: 9, name: "General Knowledge" },
    { id: 21, name: "Sports" },
    { id: 15, name: "Video Games" },
    { id: 11, name: "Movies" },
  ];

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, category, difficulty } = userData;
    if (!name || !category || !difficulty) {
      setError('All fields are required.');
      return;
    }
    setError('');
    onSubmit();
  };

  return (
    <div className="container">
      <h1>Trivia App</h1>
      <p>Welcome! Fill out the form below to start your trivia question.</p>
      <form className="info-container" onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
        </label>

        <label>
          Category:
          <select
            name="category"
            value={userData.category}
            onChange={handleChange}
          >
            <option value="">--Select--</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Difficulty:
          <select
            name="difficulty"
            value={userData.difficulty}
            onChange={handleChange}
          >
            <option value="">--Select--</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>

        <button type="submit">Start Quiz</button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}