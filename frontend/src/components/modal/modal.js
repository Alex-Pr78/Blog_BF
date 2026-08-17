import { useSelector } from 'react-redux';
import {
	selectModalTitle,
	selectModalonConfirm,
	selectModalonCancel,
	selectModalIsOpen,
} from '../../selectors';
import { Button } from '../button/button';
import styled from 'styled-components';

const ModalContainer = ({ className }) => {
	const title = useSelector(selectModalTitle);
	const isOpen = useSelector(selectModalIsOpen);
	const onConfirm = useSelector(selectModalonConfirm);
	const onCancel = useSelector(selectModalonCancel);

	if(!isOpen) {
		return null;
	}

	return (
		<div className={className}>
			<div className="modal-overlay"></div>
			<div className="modal-window">
				<h3>{title}</h3>
				<div className="wrapper-buttons">
					<Button width="100px" hover={'#b10909'} onClick={onConfirm}>
						Да
					</Button>
					<Button width="100px" onClick={onCancel}>
						Нет
					</Button>
				</div>
			</div>
		</div>
	);
};

export const Modal = styled(ModalContainer)`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 20;

	& .modal-overlay {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: #181c3ae9;
	}

	& .modal-window {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 20px;
		border-radius: 10px;
		height: 150px;
		width: 350px;
		top: 50%;
		margin: auto;
		background-color: #fff;
		transform: translateY(-50%);
		box-shadow: 0 10px 15px 10px rgba(0, 0, 0, 0.41);
	}

	& .wrapper-buttons {
		display: flex;
		flex-direction: row;
		gap: 20px;
	}
`;
