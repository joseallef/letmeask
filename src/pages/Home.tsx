import { useHistory } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logImg from '../assets/images/logo.svg';
import googoleIconImg from '../assets/images/google-icon.svg';

import Button from '../components/Button';
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss'

export function Home() {
  const history = useHistory();
  const { user, singInWithGoogle } = useAuth();


  async function handleCreateRoom() {
    // const provider = new firebase.auth.GoogleAuthProvider();

    // auth.signInWithPopup(provider).then(result => {
    //   console.log(result);
    

    // })
    if (!user) {
      await singInWithGoogle();
    }

    history.push('/rooms/new');
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiéncia em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logImg} alt="Letmeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googoleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">
            ou entre em uma sala
          </div>
          <form action="">
            <input
              type="text"
              placeholder="Digite o código da sala"
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