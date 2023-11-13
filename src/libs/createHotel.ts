export default async function createHotel(
  name: string, 
  address: string,
  district: string, 
  province: string, 
  postalcode: string,
  tel: string,
  picture: string,
  token: string,
) {
  const data = {
    name,
    address,
    district,
    province,
    postalcode,
    tel,
    picture,
  }
  const response = await fetch('http://localhost:5000/api/v1/hotels', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to create hotel')
  }
  return await response.json();
}