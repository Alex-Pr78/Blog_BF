import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	selectUserRole,
	selectUserLogin,
} from '../../../../selectors';
import { ROLE } from '../../../../constants';
import { checkAccess } from '../../../../utils';
import { logout } from '../../../../actions';
import { Icon } from '../../../../components';
import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	font-size: 20px;
	font-weight: 600;
`;

const StyledLink = styled(Link)`
	cursor: pointer;
	color: #000;
	font-size: 14px;
	padding: 5px 15px;
	border: 2px solid #000;
	border-radius: 5px;
	transition: 0.2s ease-in-out;

	&:hover {
		background: #000;
		color: #fff;
	}
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);

	const onLogout = () => {
		dispatch(logout());
		sessionStorage.removeItem('userData');
	};

	const isAdmin = checkAccess([ROLE.ADMIN], roleId);

	return (
		<div className={className}>
			<Wrapper>
				{roleId === ROLE.GUEST ? (
					<StyledLink to="/login">Войти</StyledLink>
				) : (
					<>
						<div>{login}</div>
						<div onClick={onLogout}>
							<Icon id="fa-sign-out" margin="0 0 0 25px" />
						</div>
					</>
				)}
			</Wrapper>
			<Wrapper>
				<div onClick={() => navigate(-1)}>
					<Icon id="fa-backward" margin="0 0 0 15px" />
				</div>
				{isAdmin && (
					<>
						<Link to="/post">
							<Icon id="fa-file-text-o" margin="0 0 0 15px" />
						</Link>
						<Link to="/users">
							<Icon id="fa-users" margin="0 0 0 15px" hover="#1a9911" />
						</Link>
					</>
				)}
			</Wrapper>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;
