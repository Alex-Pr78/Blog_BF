import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { selectUserRole } from '../../selectors';
import { checkAccess } from '../../utils'
import { Error } from '../../error';
import { ERROR, PROP_TYPE } from '../../constants';

export const Content = ({ children, access, serverError = null }) => {
	const userRole = useSelector(selectUserRole);

	const accessError = checkAccess(access,userRole) ? null : ERROR.ACCESS_DENIED;
	const error = accessError || serverError;
	return error ? <Error error={error} /> : children;
}

Content.propTypes = {
	children: PropTypes.node.isRequired,
	access: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
	serverError: PROP_TYPE.ERROR,
};

