import "./style.scss";

type IPropModal = {
  title: string;
  text: string;
  setOpenModal: (value: boolean) => void;
}

export function Modal({ title, text, setOpenModal }: IPropModal) {

  const toggleOpenModal = () => {
    setOpenModal(false);
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-close" onClick={toggleOpenModal}>
            X
          </div>
          <h4 className="modal-title">
            {title}
          </h4>
        </div>

        <div className="modal-body">
          {text}
        </div>
      </div>
    </div>
  )

}