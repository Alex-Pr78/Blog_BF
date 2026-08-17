import { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '../../../components';
import styled from 'styled-components';
import { PROP_TYPE } from '../../../constants';
import { request } from '../../../utils/request';

const UserRowContainer = ({
	className,
	id,
	login,
	registeredAt,
	roleId: userRoleId,
	roles,
	onUserRemove,
}) => {
	const [initialRoleId, setInitialRoleId] = useState(userRoleId);
	const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);

	const onRowChange = ({ target }) => {
		setSelectedRoleId(Number(target.value));
	};

	const onRoleSave = (userId, newUserRoleId) => {
		request(`/api/user/${userId}`, 'PATCH', { roleId: newUserRoleId }).then(() => {
			setInitialRoleId(newUserRoleId);
		});
	};

	const isSaveButtonDisabled = selectedRoleId === initialRoleId;

	return (
		<div className={className}>
			<div className="user-data">
				<div className="login-column">{login}</div>
				<div className="registered-at-column">{registeredAt}</div>
				<div className="role-column">
					<select
						className="role-select"
						value={selectedRoleId}
						onChange={onRowChange}
					>
						{roles.map(({ id: roleId, name: roleName }) => (
							<option key={roleId} value={roleId}>
								{roleName}
							</option>
						))}
					</select>
					<Icon
						id="fa-floppy-o"
						margin="0 0 0 15px"
						disabled={isSaveButtonDisabled}
						onClick={() => onRoleSave(id, selectedRoleId)}
					/>
				</div>
			</div>
			<Icon id="fa-trash-o" margin="0 0 0 15px" onClick={onUserRemove} hover="#b54518" />
		</div>
	);
};

export const UserRow = styled(UserRowContainer)`
	display: flex;
	width: 600px;
	flex-direction: row;
	align-items: center;

	& .user-data {
		display: flex;
		flex-direction: row;
		align-items: center;
		border: 2px solid #000;
		border-radius: 5px;
		margin: 10px 0;
		padding: 10px;
	}

	& .login-column {
		width: 168px;
		padding: 0 10px;
		font-size: 20px;
		font-weight: 500;
		color: #2864a0;
	}

	& .registered-at-column {
		width: 198px;
	}

	& .role-column {
		display: flex;
		align-items: center;
	}

	& .role-select {
		font-size: 18px;
		padding: 10px;
		cursor: pointer;
	}
`;

UserRow.propTypes = {
	id: PropTypes.string.isRequired,
	login: PropTypes.string.isRequired,
	registeredAt: PropTypes.string.isRequired,
	roleId: PROP_TYPE.ROLE.isRequired,
	roles: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
	onUserRemove: PropTypes.func.isRequired,
}
