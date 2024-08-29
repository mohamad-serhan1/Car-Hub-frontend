import React, { useEffect } from 'react'

const Payment = ({carId}) => {
    const handleAddPayment = async () => {
        try {
            await axios.patch(`http://localhost:3001/cars/status/${carId}`, { status: 'sold' });
                       
        } catch (err) {
            setError(err.response?.data?.error || "An error occurred");
        }
    };
    return (
        <div>
            <h1>Payment</h1>
            <form onSubmit={handleAddPayment}>
                <label>Card Number:</label>
                <input type="text" name="cardNumber" />
                <br />
                <label>Expiration Date:</label>
                <input type="date" name="expirationDate" />
                <br />
                <label>CVV:</label>
                <input type="password" name="cvv" />
                <br />
                <button type="submit">Pay</button>
            </form>


        </div>
    )

}

export default Payment