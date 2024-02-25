import React, { useRef, useState } from 'react';
import './css/App.css';
import pedroImage from './images/pedro.jpg';
import lucasImage from './images/lucas.jpg';
import hugoImage from './images/hugo.jpg';
import anaImage from './images/ana.jpg';
import antonioImage from './images/antonio.jpg';
import juliaImage from './images/julia.jpg';
import marcosImage from './images/marcos.jpg';
import mariaImage from './images/maria.jpg';
import victorImage from './images/victor.jpg';

const items = [
  { id: 1, name: 'Pedro', img: pedroImage },
  { id: 2, name: 'Lucas', img: lucasImage },
  { id: 3, name: 'Hugo', img: hugoImage },
  { id: 4, name: 'Ana', img: anaImage },
  { id: 5, name: 'Antônio', img: antonioImage },
  { id: 6, name: 'Julia', img: juliaImage },
  { id: 7, name: 'Marcos', img: marcosImage },
  { id: 8, name: 'Maria', img: mariaImage },
  { id: 9, name: 'Victor', img: victorImage },

];

const duplicatedItems = [...items, ...items];

const App = () => {
  const rouletteRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const sortearPessoa = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const itemSorteado = items[Math.floor(Math.random() * items.length)];
    setSelectedItem(itemSorteado);
    // Calcule o índice do item no array duplicado, escolhendo a segunda ocorrência para a animação
    const itemIndex = items.length + items.indexOf(itemSorteado);

    const spinTime = 3000; // 3 segundos de rotação
    const itemWidth = rouletteRef.current.firstChild.offsetWidth;
    const itemMargin = 10;
    const scrollToCenter = (itemWidth + itemMargin * 2) * itemIndex + (itemWidth / 2) - (rouletteRef.current.offsetWidth / 2);

    rouletteRef.current.style.transition = 'transform 0s';
    rouletteRef.current.style.transform = 'translateX(0px)';

    setTimeout(() => {
      rouletteRef.current.style.transition = `transform ${spinTime}ms ease-out`;
      rouletteRef.current.style.transform = `translateX(-${scrollToCenter}px)`;
    }, 0);

    setTimeout(() => {
      // Resetar a posição da roleta de forma imperceptível após a animação
      rouletteRef.current.style.transition = 'none';
      rouletteRef.current.style.transform = `translateX(-${(itemWidth + itemMargin * 2) * items.indexOf(itemSorteado) + (itemWidth / 2) - (rouletteRef.current.offsetWidth / 2)}px)`;

      setIsSpinning(false);
    }, spinTime);
  };

  return (
    <div className="roulette-container">
      <div ref={rouletteRef} className="roulette-wrapper">
        {duplicatedItems.map((item, index) => (
          <div key={index} className={`roulette-item ${selectedItem && selectedItem.id === item.id ? 'selected' : ''}`}>
            <img src={item.img} alt={item.name} />
            <div className="roulette-info">{item.name}</div>
          </div>
        ))}
      </div>
      <br />
      <button onClick={sortearPessoa} disabled={isSpinning}>Sortear</button>
    </div>
  );
};
export default App;