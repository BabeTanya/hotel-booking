export default async function getBooking(id: string, token: string) {  
    const response = await fetch(`http://localhost:5000/api/v1/bookings/${id}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    })
    if (!response.ok) {
      throw new Error('Failed to fetch booking')
    }
    return await response.json();
  }