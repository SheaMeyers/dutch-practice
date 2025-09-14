import './EndModal.css'

type EndModalProps = {
  onClick: () => void;
};

const EndModal = ({ onClick } : EndModalProps) => 
    <div 
        className="modal show EndModal" 
        id="endModal" 
        tabIndex={-1} 
        aria-labelledby="endModalLabel" 
        aria-modal={true}
    >
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
            <div className="modal-header text-center">
                <h5 className="modal-title w-100" id="endModalLabel">HOORAY!!</h5>
            </div>
            <div className="modal-body">
                You have answered all the questions!  <br/>
                Good work and congratulations!
            </div>
            <div className="modal-footer d-flex justify-content-center">
                <button 
                    type="button" 
                    className="btn btn-primary" 
                    data-bs-dismiss="modal"
                    onClick={onClick}
                >
                    Go back to start
                </button>
            </div>
            </div>
        </div>
    </div>

export default EndModal
