import { useState } from 'react';
import copyImg from '../assets/images/copy.svg';

import '../styles/room-code.scss';

type RoomCodeProps = {
  code: string | undefined;
}

export function RoomCode(props: RoomCodeProps) {

  const [copyToClipboard, setCopyToClipboard] = useState<boolean>(false)

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code ? props.code : "");
    setCopyToClipboard(true);
    setTimeout(() => setCopyToClipboard(false), 10000);
  }

  return (
    <button className={`room-code ${copyToClipboard ? 'copy' : ''}`} onClick={copyRoomCodeToClipboard}>
      <div className="copy-code">
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Sala #{props.code}</span>
    </button>
  );
}