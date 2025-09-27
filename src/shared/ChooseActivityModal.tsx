
import { Link, useLocation } from 'react-router-dom';
import './Modal.css'

type chooseActivityModalProps = {
    onClick: () => void;
};

const ChooseActivityModal = ({ onClick }: chooseActivityModalProps) => {
    const location = useLocation()
    return (
        <div
            className="modal show Modal"
            id="chooseActivityModal"
            tabIndex={-1}
            aria-labelledby="chooseActivityModalLabel"
            aria-modal={true}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header text-center">
                        <h5 className="modal-title w-100" id="chooseActivityModalLabel">Activities</h5>
                    </div>
                    <div className="modal-body">
                        <ul className="nav flex-column">
                            <li className={`nav-item mb-2 ${location.pathname === '/' ? 'fw-bold' : ''}`}>
                                <Link className="nav-link" to="/" onClick={onClick}>Prepositions</Link>
                            </li>
                            <li className={`nav-item mb-2 ${location.pathname === '/de-het' ? 'fw-bold' : ''}`}>
                                <Link className="nav-link" to="/de-het" onClick={onClick}>De/Het</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="modal-footer d-flex justify-content-center">
                        <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={onClick}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChooseActivityModal
