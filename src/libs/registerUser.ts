export default async function registerUser(name: string, email: string, tel: string, password: string, role: string) {
  const data = {
    name,
    email,
    tel,
    password,
    role,
  }
  const response = await fetch('http://localhost:5000/api/v1/auth/register', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to create user')
  }
  return await response.json();
}