// This ensures the script runs only after the entire HTML page has been loaded
document.addEventListener('DOMContentLoaded', () => {

    // --- GET HTML ELEMENTS ---
    // Find the elements on the page that we need to work with
    const convertBtn = document.getElementById('convert-btn');
    const destinationSelect = document.getElementById('destination');
    const hotelLink = document.getElementById('hotel-link');
    const flightLink = document.getElementById('flight-link');

    // --- DATA ---
    // A JavaScript object to hold all the data for our destinations.
    // This makes it easy to add new destinations in the future.
    const destinationData = {
        'Thailand': { currency: 'THB', rate: 0.8, name: 'Thailand' },
        'Bali': { currency: 'IDR', rate: 150, name: 'Bali, Indonesia' },
        'Australia': { currency: 'AUD', rate: 0.01, name: 'Australia' },
        'Europe': { currency: 'EUR', rate: 0.005, name: 'Europe' },
        'USA': { currency: 'USD', rate: 0.007, name: 'USA' },
        'UK': { currency: 'GBP', rate: 0.006, name: 'UK' },
        'India': { currency: 'INR', rate: 0.6, name: 'India' },
        'Russia': { currency: 'RUB', rate: 0.7, name: 'Russia' }
    };

    // --- FUNCTIONS ---

    // This function updates the "Book Hotels" and "Find Flights" links
    function updateBookingLinks() {
        const selectedValue = destinationSelect.value;
        const destinationName = destinationData[selectedValue].name;
        // encodeURIComponent ensures names with spaces or commas work correctly in a URL
        const encodedDestination = encodeURIComponent(destinationName);

        // Update hotel link to search on Booking.com
        hotelLink.href = `https://www.booking.com/searchresults.html?ss=${encodedDestination}`;
        
        // Update flight link to search on Google Flights
        flightLink.href = `https://www.google.com/flights?q=Flights+to+${encodedDestination}`;
    }

    // This function calculates the currency discount from points
    function convertPoints() {
        const points = parseFloat(document.getElementById('points-to-use').value);
        const destination = destinationSelect.value;
        const resultElement = document.getElementById('conversion-result');

        // Simple validation
        if (isNaN(points) || points <= 0) {
            resultElement.textContent = 'Please enter a valid number of points';
            return;
        }

        const data = destinationData[destination];
        const discount = points * data.rate;

        // Use the built-in Intl.NumberFormat to display the currency correctly
        // (e.g., with $, €, £, or commas and decimal points in the right places)
        const formattedDiscount = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: data.currency,
        }).format(discount);

        resultElement.textContent = formattedDiscount;
    }

    // --- EVENT LISTENERS ---
    // Tell the browser to run our functions when the user interacts with the page
    convertBtn.addEventListener('click', convertPoints);
    destinationSelect.addEventListener('change', updateBookingLinks);

    // --- INITIALIZATION ---
    // Run this function once when the page first loads to set the initial links correctly
    updateBookingLinks();
});

