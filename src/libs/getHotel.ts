export default async function getHotel(id: string) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
  
    const response = await fetch(`http://localhost:5000/api/v1/hotels/${id}`, {
      method: 'GET',
      cache: 'no-store',
    })
    if (!response.ok) {
      throw new Error('Failed to fetch hotel')
    }
    return await response.json();
  }