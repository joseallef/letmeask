import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logImg from '../assets/images/logo.svg';

import '../styles/auth.scss';

import Button from '../components/Button';
import ButtonToggleTheme from '../components/ButtonToggleTheme';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { database } from '../services/firebase';

export function NewRoom() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [newRoom, setNemRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    navigate(`/rooms/${firebaseRoom.key}`);

  }

  return (
    <div id="page-auth" className={theme}>
      <aside className={theme}>
        <a href="/">
          <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        </a>
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiéncia em tempo-real</p>
      </aside>

      <main className={theme}>
        <ButtonToggleTheme />

        <div className="main-content">
          <img src={logImg} alt="Letmeask" />
          <h1>{user?.name}</h1>
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNemRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>Quer entrar em uma sala existente? <Link to="/">clique aqui</Link></p>
        </div>
      </main>
    </div>
  );
}