export default async function updateBooking(
  hotelId: string,
  bookingDate: string, 
  checkoutDate: string,
  createAt: string, 
  token: string,
) {
  const data = {
    bookingDate,
    checkoutDate,
    createAt,
  }
  const response = await fetch(`http://localhost:5000/api/v1/bookings/${hotelId}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to create booking')
  }
  return await response.json();
}