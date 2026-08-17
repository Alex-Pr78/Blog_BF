import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Navigate } from 'react-router-dom';
import { useResetForm } from '../../hooks';
import { Input, Button, H2 } from '../../components';
import { setUser } from '../../actions';
import { selectUserRole } from '../../selectors';
import { AuthFormError } from '../../error';
import { ROLE } from '../../constants';
import styled from 'styled-components';
import { request } from '../../utils/request';

const regFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин')
		.matches(
			/^\w+$/,
			'Логин может содержать только латинские буквы, цифры и символы подчеркивания',
		)
		.min(4, 'Неверный формат логина. Минимум 4 символа')
		.max(10, 'Неверный формат логина. Максимум 10 символов'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(
			/^[\w#_%]+$/,
			'Неверный формат пароля. Допустимы только латинские буквы, цифры и символы подчеркивания, #, _ и %',
		)
		.min(6, 'Длина пароля должна быть не менее 6 символов')
		.max(30, 'Длина пароля должна быть не более 30 символов'),
	passcheck: yup
		.string()
		.required('Заполните пароль')
		.oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
});

const RegistrationContainer = ({ className }) => {
	const [serverError, setServerError] = useState(null);
	const roleId = useSelector(selectUserRole);
	const dispatch = useDispatch();

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(regFormSchema),
	});

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		request('/api/register', 'POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка: ${error} !`);
				return;
			}
			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
		});
	};

	const formError =
		errors?.login?.message || errors?.password?.message || errors?.passcheck?.message;

	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<H2>Регистрация</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Логин..."
					{...register('login', { onChange: () => setServerError(null) })}
				/>
				<Input
					type="password"
					placeholder="Пароль..."
					{...register('password', { onChange: () => setServerError(null) })}
				/>
				<Input
					type="password"
					placeholder="Проверка пароля..."
					{...register('passcheck', { onChange: () => setServerError(null) })}
				/>
				<Button type="submit" width="200px" disabled={!!formError}>
					Зарегистрироваться
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
			</form>
		</div>
	);
};

export const Registration = styled(RegistrationContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 100vh;
	margin-top: 30px;

	& > form {
		display: flex;
		width: 260px;
		flex-direction: column;
		gap: 10px;
	}
`;
