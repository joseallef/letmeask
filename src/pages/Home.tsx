import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import googoleIconImg from '../assets/images/google-icon.svg';
import illustrationImg from '../assets/images/illustration.svg';

import logImg from '../assets/images/logo.svg';

import { database } from '../services/firebase';

import Button from '../components/Button';
import { useAuth } from '../hooks/useAuth';

import ButtonToggleTheme from '../components/ButtonToggleTheme';
import { Modal } from '../components/Modal';
import { useTheme } from '../hooks/useTheme';
import '../styles/auth.scss';

export function Home() {
  const { theme } = useTheme();

  const navigate = useNavigate();
  const { user, singInWithGoogle } = useAuth();

  const [roomCode, setRoomCode] = useState('');
  const [contentModal, setContentModal] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);

  async function handleCreateRoom() {
    if (!user) {
      await singInWithGoogle();
    }

    navigate('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();


    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      setContentModal('Room does not exists');
      setOpenModal(true);
      return;
    }

    if (roomRef.val().endedAt) {
      setContentModal('RRoom already closed');
      setOpenModal(true);
      return;
    }

    navigate(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth" className={theme}>

      {openModal && (
        <Modal
          title='Aviso'
          text={contentModal}
          setOpenModal={setOpenModal}
        />
      )}

      <aside className={theme}>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiéncia em tempo-real</p>
      </aside>


      <main className={theme}>
        <ButtonToggleTheme />

        <div className="main-content">
          <img src={logImg} alt="Letmeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googoleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">
            ou entre em uma sala
          </div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}