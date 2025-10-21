// Wait for the form to be submitted before running the calculation
document.getElementById('earn-calculator-form').addEventListener('submit', function(event) {
    // Prevent the default form action (which would reload the page)
    event.preventDefault();

    // --- DATA ---
    // Define the base points earned per dollar for each activity type
    const activityMultipliers = {
        flight: 5,  // e.g., 5 points per dollar
        hotel: 10,  // Partners might offer more points
        car: 8,
        card: 2      // Standard earning rate on credit card
    };

    // Define the bonus multiplier for member status tiers
    const tierMultipliers = {
        blue: 1.0,      // Standard rate, no bonus
        silver: 1.25,   // 25% bonus points
        gold: 1.5       // 50% bonus points
    };

    // --- GET USER INPUT ---
    // Find the relevant HTML elements on the page
    const activity = document.getElementById('activity').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const tier = document.getElementById('tier').value;
    const resultElement = document.getElementById('points-result');

    // --- VALIDATION ---
    // Check if the amount entered is a valid, positive number
    if (isNaN(amount) || amount <= 0) {
        resultElement.textContent = 'Please enter a valid amount';
        return; // Stop the function if input is invalid
    }

    // --- CALCULATION ---
    // 1. Calculate the base points from the amount and activity type
    const basePoints = amount * activityMultipliers[activity];
    // 2. Apply the tier bonus to get the total points
    const totalPoints = basePoints * tierMultipliers[tier];

    // --- DISPLAY RESULT ---
    // Format the number with commas (e.g., 1,250) and display it
    resultElement.textContent = `${Math.round(totalPoints).toLocaleString()} points`;
});

