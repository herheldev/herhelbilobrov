'use client';
import { useState, useEffect , useTransition} from 'react';


export default function ProggresAdminBar () {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [isPending, startTransition] = useTransition();
  
    useEffect(() => {
      let timer;
  
      if (isPending) {
        setIsVisible(true);
        setProgress(10); // Початковий прогрес
  
        timer = setInterval(() => {
          setProgress((prev) => Math.min(prev + Math.random() * 20, 90)); // Плавний прогрес
        }, 200);
      } else {
        setProgress(100); // Завершуємо завантаження
        setTimeout(() => {
          setIsVisible(false);
          setProgress(0); // Скидаємо прогрес
        }, 300);
      }
  console.log("sdfsdf");
  
      return () => clearInterval(timer);
    }, [isPending]);
  
console.log(isPending);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '3px',
        backgroundColor: '#29d',
        zIndex: 9999,
        width: `${progress}%`,
        opacity: isVisible ? 1 : 0,
        transition: 'width 0.2s ease-out, opacity 0.3s ease-out',
      }}
    ></div>
  );
};

