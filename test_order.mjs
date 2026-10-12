async function testPayment() {
    try {
        // 1. register
        const regRes = await fetch('http://localhost:4000/api/user/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: "test", email: "test" + Date.now() + "@test.com", password: "password"
            })
        });
        const regData = await regRes.json();
        const token = regData.token;
        console.log("Token:", token);

        // 2. add to cart
        await fetch('http://localhost:4000/api/cart/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'token': token },
            body: JSON.stringify({ itemId: 1 })
        });
        
        // 3. get food
        const foodRes = await fetch('http://localhost:4000/api/food/list');
        const foodData = await foodRes.json();
        const foods = foodData.data;
        
        const item = foods.find(f => f.id === 1);
        if (!item) {
            console.log("No food found at ID 1. Using a mock item.");
        }
        const orderItem = item || { name: 'Mock Food', price: 10.99, id: 1 };
        orderItem.quantity = 1;
        
        // 4. Place order
        const orderData = {
            address: {
                firstName: "A", lastName: "B", email: "a@b.com", street: "123",
                city: "c", state: "d", zipCode: "123", country: "e", phone: "123"
            },
            items: [orderItem],
            amount: orderItem.price + 2,
            userId: ""
        };

        const placeRes = await fetch('http://localhost:4000/api/order/place', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'token': token },
            body: JSON.stringify(orderData)
        });
        const placeData = await placeRes.json();
        console.log("Place Order Output:", placeData);
    } catch (e) {
        console.log("Error Response:", e.message);
    }
}
testPayment();
