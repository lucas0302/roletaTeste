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

const App = () => {
  const rouletteRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const sortearPessoa = () => {
    const itemSorteado = items[Math.floor(Math.random() * items.length)];
    setSelectedItem(itemSorteado);

    // Espere um tempo para a roleta "girar" antes de parar no item sorteado
    setTimeout(() => {
      const itemWidth = 100 + 20; // Largura do item + margem horizontal
      const centerPosition = (rouletteRef.current.offsetWidth / 2) - (itemWidth / 2);
      const scrollToPosition = (itemWidth * items.indexOf(itemSorteado)) - centerPosition;

      setIsSpinning(true);
      rouletteRef.current.scrollTo({ left: scrollToPosition, behavior: 'smooth' });

      setTimeout(() => {
        setIsSpinning(false);
      }, 2000);
    }, 500);
  };

  return (
    <div className="roulette-container">
      <div ref={rouletteRef} className="roulette-wrapper">
        {items.map((item) => (
          <div key={item.id} className={`roulette-item ${selectedItem && selectedItem.id === item.id ? 'selected' : ''}`}>
            <img src={item.img} alt={item.name} />
            <div className="roulette-info">{item.name}</div>
          </div>
        ))}
      </div>
      {selectedItem && <div className="selected-info">Pessoa Sorteada: {selectedItem.name}</div>}
      <br/>
      <button onClick={sortearPessoa} disabled={isSpinning}>Sortear</button>
    </div>
  );
};
export default App;