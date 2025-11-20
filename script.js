document.getElementById('generateBtn').addEventListener('click', generateListing);

function generateListing() {
    const itemType = document.getElementById('itemType').value;
    const itemLength = document.getElementById('itemLength').value;
    const handleMaterial = document.getElementById('handleMaterial').value;
    const bladeMaterial = document.getElementById('bladeMaterial').value;
    const shopName = document.getElementById('shopName').value;
    const outputDiv = document.getElementById('output');

    // Simple validation (Check if fields are empty)
    if (!itemLength || !handleMaterial || !bladeMaterial || !shopName) {
        outputDiv.innerHTML = '<p style="color: red;">🛑 Error: Please fill in all the details (Length, Materials, Shop Name).</p>';
        return;
    }

    outputDiv.innerHTML = '<p>⏳ AI is working... Creating policy-safe listing...</p>';

    // Data ko server-side endpoint /generate ko bhejte hain (yeh backend mein jayega)
    fetch('/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // Saara input data JSON format mein bhej rahe hain
        body: JSON.stringify({ itemType, itemLength, handleMaterial, bladeMaterial, shopName })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            outputDiv.innerHTML = `<p style="color: red;">❌ AI Error: ${data.error}</p>`;
        } else {
            // Server se mila hua SEO result yahan dikhayenge
            outputDiv.innerHTML = `
                <h3>✅ Listing Successfully Generated!</h3>
                <pre>${data.listing}</pre>
            `;
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
        outputDiv.innerHTML = `<p style="color: red;">⚠️ Network Error. Server se connection nahi ho paya.</p>`;
    });
}
