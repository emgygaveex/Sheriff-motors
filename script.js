const SUPABASE_URL = "https://afduzxdxyeexycjbfcvg.supabase.co";
const SUPABASE_KEY = "sb_publishable_b7ts54m7IR1KWKfjj3HRIw_hTqV_gZw";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

console.log("Sheriff Motors connected to Supabase");
console.log(supabaseClient);

async function loadVehicles() {
    const vehicleList = document.getElementById("vehicle-list");

    const { data, error } = await supabaseClient
        .from("cars")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error loading vehicles:", error.message);
        vehicleList.textContent = "Unable to load vehicles.";
        return;
    }

    vehicleList.innerHTML = "";

    data.forEach(car => {
        const card = document.createElement("div");
        card.className = "vehicle-card";

        if (car.image_urls) {
            const image = document.createElement("img");
            image.src = car.image_urls;
            image.alt = car.name;
            card.appendChild(image);
        }

        const info = document.createElement("div");
        info.className = "vehicle-info";

        const name = document.createElement("h3");
        name.textContent = car.name;

        const details = [
            ["Year", car.year],
            ["Mileage", car.mileage ? Number(car.mileage).toLocaleString() + " km" : null],
            ["Engine", car.engine_capacity],
            ["Fuel", car.fuel_type],
            ["Transmission", car.transmission],
            ["Colour", car.color]
        ];

        info.appendChild(name);

        details.forEach(([label, value]) => {
            if (value) {
                const p = document.createElement("p");
                p.textContent = label + ": " + value;
                info.appendChild(p);
            }
        });

        if (car.description) {
            const description = document.createElement("p");
            description.textContent = car.description;
            info.appendChild(description);
        }

        const price = document.createElement("h3");
        price.textContent = car.price
            ? "KSh " + Number(car.price).toLocaleString()
            : "Price on request";

        info.appendChild(price);

        const status = document.createElement("p");
        status.textContent = car.status || "Available";
        info.appendChild(status);

       card.appendChild(info);

const whatsappButton = document.createElement("a");

const message = `Hello Sheriff Motors, I am interested in the ${car.name}, Year: ${car.year}, Price: KSh ${car.price ? Number(car.price).toLocaleString() : "Price on request"}. Is it still available?`;

whatsappButton.href =
    "https://wa.me/254741127198?text=" +
    encodeURIComponent(message);

whatsappButton.textContent = "Enquire on WhatsApp";
whatsappButton.className = "whatsapp-enquire";
whatsappButton.target = "_blank";
whatsappButton.rel = "noopener noreferrer";

info.appendChild(whatsappButton);

vehicleList.appendChild(card);
    });
}

loadVehicles();