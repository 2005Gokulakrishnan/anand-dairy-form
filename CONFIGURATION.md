# Business configuration

Edit `config.js` after receiving confirmed information from the business owner.

| Field | Required owner input |
|---|---|
| `whatsappNumber` | WhatsApp number in international format, digits only (India: 91 + 10-digit number) |
| `phoneNumber` | Verified public contact number |
| `email` | Verified business email |
| `address` | Full verified postal address |
| `googleMapsUrl` | Exact Google Business Profile share link / directions URL |
| `confirmedDeliveryAreas` | Only neighbourhoods actually served |

Also replace demonstration product names, pack sizes, images and prices in `app.js` with the approved catalogue. Remove the demo catalogue notice only after all product details are verified. Add real, permissioned business photography and verified customer reviews only.

## Google Maps

The current button opens a Google Maps search query, not an exact verified pin. Replace `googleMapsUrl` with the owner's verified Google Maps share URL. No Maps API key is needed for this link-based implementation. If an interactive map embed is later required, obtain the exact place URL and configure a Maps embed/API key securely.
