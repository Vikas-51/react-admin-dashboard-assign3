import React, { useState } from 'react';

const initialColumns = {
  todo: {
    id: 'todo',
    title: 'To Do',
    cards: [
      { id: 'task1', title: 'Design mockup', description: 'Create a UI mockup for the dashboard' },
      { id: 'task2', title: 'Set up database', description: 'Initialize MongoDB for the app' },
      { id: 'task5', title: 'Marketing Plan', description: 'Draft Q3 digital marketing strategy' },
      { id: 'task6', title: 'Client Feedback Review', description: 'Read and summarize recent client feedback' },
      { id: 'task7', title: 'Security Audit', description: 'Schedule a security audit for backend' },
      { id: 'task12', title: 'Legal Compliance Check', description: 'Review latest compliance requirements' },
      { id: 'task13', title: 'New Feature Research', description: 'Explore trending features in competitor apps' },
    ],
  },
  inprogress: {
    id: 'inprogress',
    title: 'In Progress',
    cards: [
      { id: 'task3', title: 'React components', description: 'Develop main React components' },
      { id: 'task8', title: 'API Integration', description: 'Integrate REST APIs into frontend' },
      { id: 'task9', title: 'Hiring Process', description: 'Screen resumes for frontend developer' },
      { id: 'task14', title: 'CI/CD Pipeline', description: 'Set up GitHub Actions for deployment' },
      { id: 'task15', title: 'Product Video', description: 'Editing promotional product launch video' },
    ],
  },
  done: {
    id: 'done',
    title: 'Done',
    cards: [
      { id: 'task4', title: 'Project setup', description: 'Initialized project with React and tools' },
      { id: 'task10', title: 'Team Meeting', description: 'Held weekly planning and alignment meeting' },
      { id: 'task11', title: 'Product Roadmap', description: 'Finalized roadmap for next quarter' },
      { id: 'task16', title: 'Logo Redesign', description: 'Delivered final version of new company logo' },
    ],
  },
  qa: {
    id: 'qa',
    title: 'QA & Testing',
    cards: [
      { id: 'task17', title: 'Unit Tests', description: 'Write unit tests for user module' },
      { id: 'task18', title: 'Bug Reproduction', description: 'Reproduce login bug reported by user' },
    ],
  },
  devops: {
    id: 'devops',
    title: 'DevOps',
    cards: [
      { id: 'task19', title: 'Server Monitoring', description: 'Configure alerts for high CPU usage' },
      { id: 'task20', title: 'Docker Setup', description: 'Containerize backend services' },
    ],
  },
  design: {
    id: 'design',
    title: 'Design',
    cards: [
      { id: 'task21', title: 'Landing Page UI', description: 'Design hero section for new landing page' },
      { id: 'task22', title: 'Icon Set', description: 'Create consistent icon set for app' },
    ],
  },
};


const Kanban = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [dragged, setDragged] = useState(null);

  const onDragStart = (e, cardId, colId) => {
    setDragged({ cardId, colId });
    e.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = (e) => e.preventDefault();

  const onDrop = (e, colId) => {
    e.preventDefault();
    if (!dragged || dragged.colId === colId) return;

    const sourceCol = { ...columns[dragged.colId] };
    const targetCol = { ...columns[colId] };
    const cardIndex = sourceCol.cards.findIndex((c) => c.id === dragged.cardId);
    if (cardIndex < 0) return; // Make sure the card exists

    const card = sourceCol.cards[cardIndex];

    sourceCol.cards = sourceCol.cards.filter((c) => c.id !== dragged.cardId);
    targetCol.cards = [...targetCol.cards, card];

    setColumns((prev) => ({
      ...prev,
      [dragged.colId]: sourceCol,
      [colId]: targetCol,
    }));
    setDragged(null);
  };

  return (
    <section className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg" aria-label="Kanban board">
      <h2 className="text-2xl font-bold text-purple-600 dark:text-teal-400 mb-6">Kanban Board</h2>
      <div className="flex gap-6 overflow-x-auto py-2">
        {Object.values(columns).map((col) => (
          <section
            key={col.id}
            className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 min-w-[280px] max-h-[500px] overflow-y-auto shadow-md"
            aria-label={col.title}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, col.id)}
          >
            <h3 className="text-teal-500 text-xl font-semibold mb-4 select-none">{col.title}</h3>
            {col.cards.length === 0 && <p className="text-gray-400 dark:text-gray-500">No tasks</p>}
            {col.cards.map((card) => (
              <article
                key={card.id}
                className="bg-white dark:bg-gray-700 rounded-md p-4 mb-4 shadow cursor-grab select-none hover:shadow-lg transition-transform duration-150"
                tabIndex={0}
                draggable
                onDragStart={(e) => onDragStart(e, card.id, col.id)}
                aria-grabbed="false"
              >
                <h4 className="font-bold text-lg mb-2">{card.title}</h4>
                <p className="text-gray-700 dark:text-gray-300">{card.description}</p>
              </article>
            ))}
          </section>
        ))}
      </div>
    </section>
  );
};

export default Kanban;
