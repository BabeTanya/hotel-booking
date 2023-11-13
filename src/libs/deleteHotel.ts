export default async function deleteHotel(
  id: string,
  token: string,
) {
  const response = await fetch(`http://localhost:5000/api/v1/hotels/${id}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    throw new Error('Failed to delete hotel')
  }
  return await response.json();
}