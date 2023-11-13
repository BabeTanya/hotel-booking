export default async function createBooking(
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
    const response = await fetch(`http://localhost:5000/api/v1/hotels/${hotelId}/bookings`, {
      method: 'POST',
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