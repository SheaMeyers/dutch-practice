
import './Modal.css'
import { ComponentType } from 'react';

type chooseActivityModalProps = {
    LinksList: ComponentType<{}>;
    onClick: () => void;
};

const ChooseActivityModal = ({ LinksList, onClick }: chooseActivityModalProps) => 
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
                    <LinksList />
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

export default ChooseActivityModal
