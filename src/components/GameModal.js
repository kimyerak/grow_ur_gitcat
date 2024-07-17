import React, { useEffect, useRef } from 'react';
import Modal from 'react-modal';
import { getCoinFromGame } from "../api/api_kings";

Modal.setAppElement('#root');

const GameModal = ({ isOpen, onRequestClose }) => {
  const canvasRef = useRef(null);
  const scoreRef = useRef(null);
  const gameRunningRef = useRef(false);

  useEffect(() => {
    if (!isOpen) {
      console.log('Modal is closed');
      return;
    }

    console.log('Modal is open');

    const intervalId = setInterval(() => {
      const canvas = canvasRef.current;
      const scoreElement = scoreRef.current;
      if (!canvas || !scoreElement) {
        console.log('Canvas or score element is not found yet');
        return;
      }

      clearInterval(intervalId);

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.log('Failed to get canvas context');
        return;
      }

      const coinImg = new Image();
      const catImg = new Image();

      // 이미지 경로 설정
      coinImg.src = '/assets/clover.png'; // 코인 이미지 파일 경로
      catImg.src = '/assets/cat4.png'; // 고양이 이미지 파일 경로

      let score = 0;

      const cat = {
        x: canvas.width / 2 - 25,
        y: canvas.height - 60,
        width: 65,
        height: 65,
        speed: 7,
        dx: 0,
      };

      const coin = {
        x: Math.random() * (canvas.width - 30),
        y: 0,
        width: 30,
        height: 30,
        speed: 3,
      };

      function drawCat() {
        ctx.drawImage(catImg, cat.x, cat.y, cat.width, cat.height);
      }

      function drawCoin() {
        ctx.drawImage(coinImg, coin.x, coin.y, coin.width, coin.height);
      }

      function clear() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      function moveCat() {
        cat.x += cat.dx;

        // 경계값 체크
        if (cat.x < 0) cat.x = 0;
        if (cat.x + cat.width > canvas.width) cat.x = canvas.width - cat.width;
      }

      function moveCoin() {
        coin.y += coin.speed;

        // 코인이 바닥에 닿았을 때
        if (coin.y + coin.height > canvas.height) {
          coin.y = 0;
          coin.x = Math.random() * (canvas.width - coin.width);
        }

        // 고양이가 코인을 먹었을 때
        if (
          coin.y + coin.height > cat.y &&
          coin.y < cat.y + cat.height &&
          coin.x + coin.width > cat.x &&
          coin.x < cat.x + cat.width
        ) {
          score += 1;
          scoreElement.textContent = `Score: ${score}`;
          coin.y = 0;
          coin.x = Math.random() * (canvas.width - coin.width);
        }
      }

      function update() {
        if (!gameRunningRef.current) return; // 게임이 멈췄는지 확인
        clear();
        drawCat();
        drawCoin();
        moveCat();
        moveCoin();
        requestAnimationFrame(update);
      }

      function keyDown(e) {
        if (e.key === 'ArrowRight' || e.key === 'Right') {
          cat.dx = cat.speed;
        } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
          cat.dx = -cat.speed;
        }
      }

      function keyUp(e) {
        if (
          e.key === 'ArrowRight' ||
          e.key === 'Right' ||
          e.key === 'ArrowLeft' ||
          e.key === 'Left'
        ) {
          cat.dx = 0;
        }
      }

      document.addEventListener('keydown', keyDown);
      document.addEventListener('keyup', keyUp);

      // 이미지 로딩 함수
      function loadImages(sources, callback) {
        console.log("Loading images");
        let loadedImages = 0;
        const numImages = Object.keys(sources).length;
        const images = {};

        Object.keys(sources).forEach((src) => {
          images[src] = new Image();
          images[src].onload = () => {
            console.log(`${src} loaded`);
            loadedImages += 1;
            if (loadedImages >= numImages) {
              callback(images);
            }
          };
          images[src].src = sources[src];
        });
      }

      function startGame(images) {
        // 이미지가 모두 로드된 후 게임 시작
        score = 0;
        gameRunningRef.current = true; // 게임 실행 상태 설정
        catImg.src = images.cat.src;
        coinImg.src = images.coin.src;
        console.log("Starting game");
        update();
      }

      // 이미지 소스 설정
      const imageSources = {
        coin: '/assets/clover.png',
        cat: '/assets/cat4.png'
      };

      // 이미지를 로드하고 게임 시작
      console.log("Let's load images");
      loadImages(imageSources, startGame);

      const gameDuration = 30000; // 30초
      const timer = setTimeout(() => {
        gameRunningRef.current = false;
        alert(`Game over! Your score is ${score}`);
        getCoinFromGame(localStorage.getItem('username'), score); // 게임 점수에 따라 코인 획득
        onRequestClose(); // 게임 종료 후 모달 닫기

      }, gameDuration);

      return () => {
        // Clean up event listeners on component unmount
        document.removeEventListener('keydown', keyDown);
        document.removeEventListener('keyup', keyUp);
        clearTimeout(timer); // 타이머 클리어
      };
    }, 100); // 100ms 간격으로 체크

    return () => clearInterval(intervalId);
  }, [isOpen, onRequestClose]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Mini Game"
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '80%',
        },
      }}
    >
      <button onClick={onRequestClose}>Close</button>
      <div ref={scoreRef} className="score">Score: 0</div>
      <canvas ref={canvasRef} width="800" height="600"></canvas>
    </Modal>
  );
};

export default GameModal;
