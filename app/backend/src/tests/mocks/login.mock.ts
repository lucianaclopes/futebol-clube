const validAdmin = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: 'secret_admin',
}

const adminWithoutEmail = {
  email: '',
  password:'secret_admin'
}

const adminWithoutPassword = {
  email: 'admin@admin.com',
  password: '',
}

const invalidAdmin = {
  email: 'wrongemail@.com',
  password: 'wrongpassword',
}

const validUser = {
  id: 2,
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: 'secret_user',
}

const invalidUser = {
  email: 'correctemail@email.com',
  password: 'pas',
}

  const userNotFound = {
  email: 'email_que_nao_existe@example.com',
  password: 'senha_qualquer',
};

 const incorrectPassword = {
  email: 'email_do_usuario@example.com',
  password: 'senha_incorreta',
};

const userWithWrongPassword = {
  id: 1,
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: 'secret_user_wrong',
}
const adminRegistered = {...validAdmin, password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'};
const validLoginBody = { email: 'admin@admin.com', password: 'secret_admin' };
const validTokenWithBearer = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTcxMzMxNTg4NiwiZXhwIjoxNzEzOTIwNjg2fQ.V_AJ9GxHXYJ1VOeTPgUdKBXebEaMojyrXW2jJd86rlQ"

export { validAdmin, invalidAdmin, validUser, invalidUser, adminWithoutEmail, 
  adminWithoutPassword, userNotFound, incorrectPassword, adminRegistered, validLoginBody, 
  userWithWrongPassword, validTokenWithBearer};