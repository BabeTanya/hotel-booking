export interface EmailRequest {
  to: string,
  customerName: string;
  hotelName: string;
  bookingDate: string;
  checkoutDate: string;
  bookingId: string;
}

export function sendEmail(emailReq: EmailRequest) {
  const apiEndpoint = '/api/email';
  fetch(apiEndpoint, {
    method: 'POST',
    body: JSON.stringify(emailReq),
  })
    .then((res) => res.json())
    .then((response) => {
      alert(response.message);
    })
    .catch((err) => {
      alert(err);
    });
}