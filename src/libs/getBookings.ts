export default async function getBookings(token: string) {  
    const response = await fetch('http://localhost:5000/api/v1/bookings', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    })
    if (!response.ok) {
      throw new Error('Failed to fetch bookings')
    }
    return await response.json();
  }