import React, { useState } from 'react';
import './App.css';

const titleList = [
  { count: 0, title: '連打初心者' },
  { count: 10, title: '連打中級者' },
  { count: 50, title: '連打の達人' },
  { count: 100, title: '超連打王' },
  { count: 500, title: '神の指先' },
  { count: 1000, title: '連打の神話' },
];

function App() {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState(titleList[0].title);
  const [clickTimes, setClickTimes] = useState([]);
  const [isExploding, setIsExploding] = useState(false);

  const handleClick = () => {
    const now = Date.now();
    const newClickTimes = [...clickTimes, now].filter(t => now - t <= 1000);
    setClickTimes(newClickTimes);

    if (newClickTimes.length < 5) {
      triggerExplosion();
    }

    const newCount = count + 1;
    setCount(newCount);

    const matched = titleList
      .slice()
      .reverse()
      .find(t => newCount >= t.count);

    if (matched) {
      setTitle(matched.title);
    }
  };

  const triggerExplosion = () => {
    if (!isExploding) {
      setIsExploding(true);
      setTimeout(() => setIsExploding(false), 1000); // 1秒で解除
    }
  };

  const nextTitle = titleList.find(t => t.count > count);

  return (
    <div className={`container ${isExploding ? 'explosion' : ''}`}>
      <h1 className="title">{title}</h1>
      <p className="count">現在の連打数：{count}</p>
      {nextTitle && (
        <p className="next">
          次の称号「{nextTitle.title}」まで：{nextTitle.count - count}回
        </p>
      )}
      <button className="button" onClick={handleClick}>
        連打する！
      </button>
      {isExploding && <p className="boom-text">💥 爆発しました！💥</p>}
    </div>
  );
}

export default App;
